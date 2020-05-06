import './style'
import React from 'react'
import { Layout } from 'antd'
import ResponsiveObserve from 'antd/lib/_util/responsiveObserve'
import Aside from '../../../../src/components/aside'
import AtButton from '../../../../src/components/button'
import AtFooter from '../../../../src/components/footer'

interface IState {
  collapsed: boolean
  loading: boolean
  fixedAside: boolean
  screens: any
}

export default class PageDemo extends React.PureComponent<any, IState> {
  mediascreen = null

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
    console.log(1)
    this.props.history.push(path)
    // this.updateBreadcrumb(path)
  }

  // 侧边栏回调
  onCollapse = (e: boolean) => {
    this.setState({
      collapsed: e,
      // fixedAside: breakpoint && !e,
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
          defaultMenu={this.props.location.pathname}
          screens={screens}
          fixedAside={fixedAside}
          onMaskerClick={this.onAsideMaskerClick}
        />
        <Layout>
          <AtButton
            size="small"
            style={{ width: '100px' }}
            ghost={true}
            type="primary"
            onClick={this.onBtnClick}
          >
            1234
          </AtButton>
          <AtFooter />
        </Layout>
      </Layout>
    )
  }
}
