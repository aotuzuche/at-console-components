/* eslint-disable prefer-template,react/destructuring-assignment */
import React from 'react'
import { clearConsoleToken } from 'auto-libs'
import { Layout } from 'antd'
import Icon from '@ant-design/compatible/lib/icon'
// @ts-ignore
import cn from 'classnames'

interface IProps {
  breakpoint: boolean
  collapsed: boolean
  onCollapse: (collapsed: boolean, breakpoint: boolean) => void
}

interface IState {
  hello: string
  collapsed: boolean
  triggerIcon: string
  loginName: string
}

class HeaderView extends React.PureComponent<IProps, IState> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.collapsed !== prevState.collapsed) {
      return {
        ...prevState,
        triggerIcon: nextProps.collapsed ? 'fold' : 'unfold',
      }
    }
    return null
  }

  userInfo: any = null

  constructor(props: IProps) {
    super(props)

    this.state = {
      hello: '',
      collapsed: false,
      triggerIcon: 'unfold',
      loginName: '',
    }
  }

  componentDidMount() {
    try {
      this.userInfo = localStorage.auto_system_userData
        ? JSON.parse(localStorage.auto_system_userData)
        : {}
    } catch (e) {
      this.userInfo = {}
    }

    const loginName = this.userInfo.loginName ? this.userInfo.loginName : ''
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

    this.setState({
      hello,
      loginName,
    })
  }

  // 点击ICon菜单收起或者展开
  onTrigger = () => {
    const { breakpoint, onCollapse, collapsed } = this.props
    onCollapse && onCollapse(!collapsed, breakpoint)
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
    const className = cn('at-header-bar', {
      breakpoint,
    })
    return (
      <Layout.Header className={className}>
        {breakpoint && (
          <div className="at-header-logo">
            <img src="https://cdn.atzuche.com/static/images/icon-logo-green.png" alt="logo" />
          </div>
        )}
        <Icon type={'menu-' + state.triggerIcon} onClick={this.onTrigger} className="at-trigger" />
        <div className="at-userInfo">
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
