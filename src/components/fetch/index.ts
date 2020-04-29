import React from 'react'
import { Message } from 'antd'
import { httpConsole } from 'auto-libs'
import qs from 'qs'

// 放缓存的容器
const cache = {}

/**
 * 用于加载数据
 * api 接口地址，默认get，可改用 post:url的方式切换请求方式
 * data 请求需要携带的数据
 * render 接口请求完渲染的组件，给两个参数，1. 接口返回的数据 2. loading状态
 * cache 是否要缓存，如果要，下次命中缓存时不发起请求
 *
 * 技巧：有时候会需要在该组件不变动的情况下二次请求数据，比如城市选择的第二三级，它并不会卸载再
 * 重新加载，而是动态的传入api和data去做不同请求，可以给它加一个key，key根据请求给不同值，它
 * 值一变该组件也会卸载原先并新加载一个同样的组件，便做到了再次请求的工作
 */
class Fetch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: null,
      loading: false,
    }
  }

  componentDidMount() {
    this.startFetch()
  }

  startFetch = e => {
    const key = this.props.api + '?' + qs.stringify(this.props.data)

    if (this.props.cache && cache[key]) {
      this.setState({
        dataSource: cache[key],
      })
    } else {
      this.fetchData()
    }
  }

  // 请求数据
  fetchData = async e => {
    try {
      this.setState({
        loading: true,
      })

      // 处理接口与请求方式
      let api = this.props.api
      let method = 'get'
      if (api.indexOf(':') !== -1) {
        const v = api.split(':')
        api = v[1]
        method = v[0]
      }

      // 处理数据
      const data = this.props.data

      // 整合请求参数
      const request = {
        method: method,
        url: api,
      }
      if (method.toLowerCase() === 'get') {
        request.params = data
      } else {
        request.data = data
      }

      // 请求数据
      const res = await httpConsole.request(request)

      // 数据存入，重渲
      this.setState({
        dataSource: res,
      })

      if (this.props.cache) {
        const key = this.props.api + '?' + qs.stringify(this.props.data)
        cache[key] = res
      }

      // 如果有回调狗子，执行它
      if (this.props.afterFetch) {
        this.props.afterFetch(res)
      }
    } catch (e) {
      Message.error(e.msg)
    } finally {
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    if (this.props.render) {
      const Component = this.props.render(this.state.dataSource, this.state.dataSource !== null)

      const props = { ...this.props }
      delete props.render
      delete props.cache
      delete props.api
      delete props.data

      if (Component) {
        return React.cloneElement(Component, props)
      }
      return null
    }
    return null
  }
}

export default Fetch
