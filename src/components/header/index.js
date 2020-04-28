import './style'
import React from 'react'
import { clearConsoleToken } from 'auto-libs'
import { Layout, Icon } from 'antd'
import cn from 'classname'

class HeaderView extends React.PureComponent {
  constructor(props) {
    super(props)

    try {
      this.userInfo = localStorage['auto_system_userData']
        ? JSON.parse(localStorage['auto_system_userData'])
        : {}
    } catch (e) {
      this.userInfo = {}
    }

    const name = this.userInfo.loginName ? this.userInfo.loginName : ''
    const now = new Date()
    const hour = now.getHours()
    let hello = ''

    // 0:00 ~ 5:59
    if (hour > 0 && hour < 6) {
      hello = '凌晨好：'
    }
    // 6:00 ~ 10:59
    else if (hour >= 6 && hour < 11) {
      hello = '上午好：'
    }
    // 11:00 ~ 12:59
    else if (hour >= 11 && hour < 13) {
      hello = '中午好：'
    }
    // 13:00 ~ 17:59
    else if (hour >= 13 && hour < 18) {
      hello = '下午好：'
    }
    // 16:00 ~ 23:59
    else {
      hello = '晚上好：'
    }

    this.state = {
      triggerIcon: 'unfold',
      loginName: name,
      hello,
    }
  }

  UNSAFE_componentWillUpdate(props) {
    if (this.props.collapsed !== props.collapsed) {
      // eslint-disable-next-line react/no-will-update-set-state
      this.setState({
        triggerIcon: props.collapsed ? 'fold' : 'unfold',
      })
    }
  }

  // 点击ICon菜单收起或者展开
  onTrigger = () => {
    const { breakpoint } = this.props
    this.props.onCollapse && this.props.onCollapse(!this.props.collapsed, breakpoint)
  }

  onGoMain = () => {
    history.replaceState(null, '', '/system')
    location.reload()
  }

  onLogout = () => {
    clearConsoleToken()
    history.replaceState(null, '', '/system/login')
    location.reload()
  }

  render() {
    const { state, props } = this
    const { breakpoint } = props
    const className = cn('auto-header-bar', {
      breakpoint: breakpoint,
    })
    return (
      <Layout.Header className={className}>
        {breakpoint && (
          <div className="auto-header-logo">
            <img src="https://cdn.atzuche.com/static/images/icon-logo-green.png" alt="logo" />
          </div>
        )}
        <Icon
          type={'menu-' + state.triggerIcon}
          onClick={this.onTrigger}
          className="auto-trigger"
        />
        <div className="auto-userInfo">
          <p>
            {this.state.hello}
            <strong>{this.state.loginName}</strong>
          </p>
          <p>
            <a onClick={this.onGoMain}>
              <Icon type="appstore-o" />
              返回入口
            </a>
            <a onClick={this.onLogout}>
              <Icon type="poweroff" />
              退出登录
            </a>
          </p>
        </div>
      </Layout.Header>
    )
  }
}

export default HeaderView
