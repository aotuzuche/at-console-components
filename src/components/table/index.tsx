import React from 'react'
import _ from 'lodash'
import { httpConsole } from 'auto-libs'
import { Table, message } from 'antd'
import qs from 'qs'
import ignore from '../utils/ignoreProps'
import './style'

/**
 * @class ATTable
 * 基于 https://ant.design/components/table-cn/ 二次封装，支持下面的参数
 * @extends {React.Component}
 *
 * @param {column[]} columns 数据结构
 * @param {string} column.data  '标题,key'
 * @param {() => React.ReactNode} column.render 自定义渲染
 * @param {() => React.ReactNode} column.renderConsole 自定义渲染（操作栏）
 * 其余参数 https://ant.design/components/table-cn/#Column
 *
 * @param {string} listName @default list 接口返回携带数据的 key
 * @param {number} initialPageNum @default 1 默认第几页
 * @param {number} pageSize @default 10 分页大小
 * @param {string} pageSizeName @default pageSize 接口返回携带分页大小的 key
 * @param {string} pageNumName @default pageNum 接口返回当前页的 key
 * @param {string} totalName @default total 接口返回总页大小的 key
 * @param {() => void} afterFetch 接口完成的回调
 * @param {object} keywords 接口携带的额外参数
 * @param {string} api api地址，如果需要改变请求方式(默认get请求)的话，参数为 'patch:url' 或'post:url'等
 * @param {(ATTable) => void} ref table 实例
 * @param {boolean} disableReplaceUrl 默认情况下分页信息会带到 Url 上，如果不想可以使用这个参数禁用，比如 Modal 里面有个 Table，会和外面的 Table 冲突
 *
 * @public {(keywords) => Promise} search keywords 是搜索栏选择的参数
 * @public {() => Promise} refresh 返回一个Promise 刷新，保留当前面及搜索参数
 * @public {(keywords) => Promise} pageTo 返回一个Promise 翻到指定页面
 * @public {(keywords) => Promise} loading 显示 loading
 * @public {(keywords) => Promise} unloading 隐藏 loading
 */
class ATTable extends React.Component {
  state = {
    loading: true,
    dataSource: [],
  }

  constructor(props) {
    super(props)

    // 开始初始化
    const { initialPageNum, pageSize, pageSizeName, pageNumName, listName, totalName } = props

    // 当前页
    this.skip = this._search[pageNumName] || initialPageNum || 1
    // 当前页大小
    this.limit = pageSize || 10
    // 总数
    this.count = 0

    // 初始化参数名称
    this.pageSizeName = pageSizeName || 'pageSize'
    this.pageNumName = pageNumName || 'pageNo'
    this.listName = listName || 'list'
    this.totalName = totalName || 'total'
  }

  componentDidMount() {
    this.fetchData()
  }

  // loading
  loading = () => {
    this.setState({
      loading: true,
    })
  }

  // unLoading
  unloading = () => {
    this.setState({
      loading: false,
    })
  }

  // 搜索
  search = (keywords = {}) => {
    // eslint-disable-next-line no-undefined
    keywords = _.pickBy(keywords, v => v !== undefined && v !== '')

    keywords = _.mapValues(keywords, v => {
      if (v._isAMomentObject) {
        return v.valueOf()
      }
      return v
    })

    this.keywords = keywords
    return this.pageTo(1)
  }

  // 刷新
  refresh = () => {
    return this.fetchData()
  }

  // 翻到指定页面
  pageTo = num => {
    this.skip = num
    this.count = 0
    this.repalceUrlWithPageNum()
    return this.fetchData()
  }

  // 请求数据
  fetchData = async () => {
    try {
      this.loading()

      const { api, afterFetch } = this.props
      let url = api
      let method = 'get'
      // 支持 post:api
      if (api.indexOf(':') !== -1) {
        const v = api.split(':')
        url = v[1]
        method = v[0]
      }

      // 处理接口参数
      const data = {
        [this.pageSizeName]: this.limit,
        [this.pageNumName]: this.skip,
        ...this.keywords,
      }

      // 整合请求参数
      const request = {
        method,
        url,
      }
      if (method.toLowerCase() === 'get') {
        request.params = data
      } else {
        request.data = data
      }

      // 请求数据
      let result = await httpConsole.request(request)

      // 如果请求到数据是个妈逼的null，但那帮傻缺又返回接口调用成功时
      if (!result || !result[this.listName] || !result[this.listName].length) {
        result = {
          [this.pageNumName]: this.skip,
          [this.pageSizeName]: this.limit,
          [this.totalName]: 0,
          [this.listName]: [],
        }
      }

      // 将页信息存入
      // this.skip = result[this.pageNumName]
      // this.limit = result[this.pageSizeName]
      this.count = result[this.totalName]

      // 数据存入，重渲
      this.setState({
        dataSource: result[this.listName],
      })

      // 如果有回调狗子，执行它
      if (afterFetch) {
        afterFetch(result)
      }
    } catch (e) {
      console.error('ATTable(fetchData)-error', e)
      message.error(e.msg || '系统错误')
    } finally {
      this.unloading()
    }
  }

  // 翻页
  onChange = e => {
    this.limit = e.pageSize
    this.skip = e.current
    this.repalceUrlWithPageNum()
    this.fetchData()
  }

  // 分页信息存到 Url 上
  repalceUrlWithPageNum = () => {
    const { disableReplaceUrl } = this.props

    if (disableReplaceUrl) {
      return
    }
    window.history.replaceState(
      null,
      '',
      `?${qs.stringify({
        [this.pageNumName]: this.skip,
      })}`,
    )
  }

  transformColumns = () => {
    const { columns } = this.props

    if (!columns || !columns.length) {
      return []
    }

    return columns.map(column => {
      const { data, render, renderConsole, ...otherData } = column
      const customData = data.split(',').map(res => res.trim())

      // renderConsole 如果有则认为是操作栏，自动加上 `fixed: right` 属性
      const consoleDefualt = renderConsole
        ? {
            fixed: 'right',
          }
        : {}

      return {
        ...consoleDefualt,
        title: customData[0],
        dataIndex: customData[1],
        align: 'center',
        render: (text, record, index) => {
          const textData = text !== void 0 && text !== null ? text : '-'
          if (render) return render(textData, record, index)
          if (renderConsole) return renderConsole(record, index)
          return textData
        },
        ...otherData,
      }
    })
  }

  get _search() {
    return window.location.search ? qs.parse(window.location.search.replace(/^\?/, '')) : {}
  }

  render() {
    // 过滤封装组件的props，剩下的给table组件
    const tableProps = ignore(this.props, [
      'columns',
      'listName',
      'initialPageNum',
      'pageSize',
      'pageSizeName',
      'pageNumName',
      'totalName',
      'afterFetch',
      'keywords',
      'api',
      'ref',
      'disableReplaceUrl',
    ])

    return (
      <Table
        dataSource={this.state.dataSource}
        columns={this.transformColumns()}
        onChange={this.onChange}
        loading={this.state.loading}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true }}
        pagination={{
          defaultCurrent: 1,
          current: ~~this.skip,
          pageSize: ~~this.limit,
          total: ~~this.count,
        }}
        rowKey="id"
        {...tableProps}
      />
    )
  }
}

export default ATTable
