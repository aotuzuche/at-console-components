import './style'
import React from 'react'
import { Layout } from 'antd'
import ResponsiveObserve from 'antd/lib/_util/responsiveObserve'
import Aside from '../../components/aside'
import AtFooter from '../../components/footer'
import AtHeader from '../../components/header'
import Routes from '../../router'

const { Content } = Layout

interface IState {
  collapsed: boolean
  loading: boolean
  fixedAside: boolean
  screens: any
}

class PageDemo extends React.PureComponent<any, IState> {
  mediascreen: any = null

  constructor(props: any) {
    super(props)

    this.state = {
      collapsed: false,
      loading: false,
      fixedAside: false,
      screens: {
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        xxl: true,
      },
    }
  }

  componentDidMount() {
    this.mediascreen = ResponsiveObserve.subscribe(screens => {
      this.setState({
        screens,
      })
    })
  }

  componentWillUnmount() {
    ResponsiveObserve.unsubscribe(this.mediascreen)
  }

  // 菜单点击回调
  onMenuHandle = (path: string) => {
    console.log(this.props)
    this.props.history.push(path)
    // this.updateBreadcrumb(path)
  }

  // 侧边栏回调
  onCollapse = (e: boolean, breakpoint?: boolean) => {
    this.setState({
      collapsed: e,
      fixedAside: !!breakpoint && !e,
    })
  }

  onAsideMaskerClick = (collapsed: boolean, fixedAside: boolean) => {
    this.setState({
      collapsed,
      fixedAside,
    })
  }

  onBtnClick = async () => {
    await new Promise(res => setTimeout(res, 3000))
  }

  render() {
    const { collapsed, screens, fixedAside } = this.state
    return (
      <Layout className="page-index">
        <Aside
          list={[
            {
              id: 406,
              name: '首页',
              icon: 'car',
              url: '/',
              pid: 0,
              systemId: 35,
            },
            {
              id: 415,
              name: '列表',
              icon: 'car',
              url: '/list',
              pid: 0,
              systemId: 35,
            },
          ]}
          title="demo"
          onMenuHandle={this.onMenuHandle}
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          defaultMenu={window.location.pathname}
          screens={screens}
          fixedAside={fixedAside}
          onMaskerClick={this.onAsideMaskerClick}
        />
        <Layout>
          <AtHeader breakpoint={!screens.md} collapsed={collapsed} onCollapse={this.onCollapse} />
          <Content style={{ padding: '20px' }}>
            <Routes />
          </Content>
          <AtFooter />
        </Layout>
      </Layout>
    )
  }
}

export default PageDemo
