import './style.scss'
import React from 'react'
import cn from 'classname'
import { Layout, Menu, Icon, message } from 'antd'
import { findMenuInfo, findMenuPathIds } from '../../utils/menuHandles'
import { isFalse } from '../../utils/arraryHelp'

const { Sider } = Layout
const { SubMenu } = Menu

class AsideView extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { defaultMenu, list } = nextProps
    if (list && (defaultMenu !== prevState.defaultMenu || list !== prevState.list)) {
      const currentMenu = findMenuInfo(defaultMenu, list, 'url')

      let selectedKeys = list[0] ? [list[0].id.toString()] : []
      let openKeys = []

      // 如果找到当前菜单，定位当前菜单，然后展开相关的菜单
      if (currentMenu) {
        let url = currentMenu.url
        const ids = findMenuPathIds(url, list)
        let find = false
        openKeys = ids.reverse().map(id => {
          const menu = findMenuInfo(id, list)
          if (!find && !isFalse(menu.icon)) {
            selectedKeys = [menu.id.toString()]
            find = true
          }
          return id.toString()
        })
      }

      return {
        list,
        defaultMenu,
        openKeys: openKeys,
        selectedKeys: selectedKeys,
      }
    }

    // 否则，对于state不进行任何操作
    return null
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedKeys: [],
      openKeys: [],
      list: null,
      defaultMenu: null,
    }

    this.maskerRef = React.createRef()
  }

  componentDidMount() {
    this.maskerRef.current.addEventListener(
      'touchmove',
      e => {
        e.preventDefault()
      },
      { passive: false },
    )
  }

  onAsideMaskerClick = () => {
    const { onMaskerClick } = this.props
    onMaskerClick && onMaskerClick(true, false)
  }

  // 菜单点击事件
  onMenuHandle = e => {
    try {
      const _current = findMenuInfo(e.key, this.state.list)
      if (_current) {
        this.props.onMenuHandle(_current.url)
      }
    } catch (e) {
      message.error(e.msg || '系统异常')
    }
  }

  // 菜单选中
  onMenuSelect = e => {
    const selectedKeys = e.selectedKeys
    this.setState({
      selectedKeys,
    })
  }

  // 自动监测收起或者关闭菜单
  onCollapse = collapsed => {
    this.props.onCollapse(collapsed)
  }

  // 递归菜单
  recursionMenu = obj => {
    if (!(obj instanceof Array)) {
      return null
    }
    return obj.map(item => {
      // 判断是否有子菜单
      let hasSub = false
      if (item.children instanceof Array) {
        // 如果所有的子菜单都是隐藏形式的话
        // 就认为该菜单没有子菜单
        hasSub = item.children.some(res => !isFalse(res.icon))
      }

      if (hasSub) {
        return (
          <SubMenu
            key={item.id}
            title={
              <span>
                {item.icon ? <Icon type={item.icon} /> : <Icon type="folder" />}
                <span>{item.name}</span>
              </span>
            }
          >
            {this.recursionMenu(item.children)}
          </SubMenu>
        )
      }

      // 不显示隐藏形式的菜单
      if (isFalse(item.icon)) {
        return null
      }

      return (
        <Menu.Item key={item.id}>
          {item.icon ? <Icon type={item.icon} /> : <Icon type="file" />}
          <span>{item.name}</span>
        </Menu.Item>
      )
    })
  }

  render() {
    const { breakpoint = 'lg', collapsed, screens, fixedAside } = this.props
    const { list } = this.state
    const siderClassName = cn('auto-sider-wrapper', {
      breakpoint: !screens.md,
      fixedAside: !screens.md && fixedAside,
    })
    return (
      <div className={siderClassName}>
        <div
          className="auto-sider-wrapper-masker"
          onClick={this.onAsideMaskerClick}
          ref={this.maskerRef}
        />
        <Sider
          className="auto-sider"
          width="256"
          collapsedWidth="80"
          breakpoint={breakpoint}
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="auto-logo">
            <img src="//carphoto.aotuzuche.com/web/images/webSystem/icon_logo.png" alt="logo" />
            <h1>{this.props.title}</h1>
          </div>
          <Menu
            openKeys={this.state.openKeys}
            selectedKeys={this.state.selectedKeys}
            mode="inline"
            theme="dark"
            onClick={this.onMenuHandle}
            onSelect={this.onMenuSelect}
            onOpenChange={e => {
              this.setState({
                openKeys: e,
              })
            }}
          >
            {this.recursionMenu(list)}
          </Menu>
        </Sider>
      </div>
    )
  }
}

export default AsideView
