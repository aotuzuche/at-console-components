import React from 'react'
import { Input, Form, Col, Row, Spin, Button, Icon, Divider, message } from 'antd'

/**
 *
 *
 * @class ATSearchBar
 * 基于 https://ant.design/components/form-cn/ 二次封装
 * @extends {React.Component}
 *
 * @param {column[]} columns 数据结构
 * @param {string} column.title 标题
 * @param {string} column.key 传给后台的 key，一般对应着搜索参数
 * @param {(fields) => React.ReactNode} column.render 自定义渲染（默认是 Input）,参数是当前搜索栏所有的数据集合
 * @param {number} column.span 分栏，默认是 6，Grid 基于 24 栅格，所以默认是每行 4 个
 * @param {number} column.initialItemCount 展示的数量，默认是 8，可展示两行
 * 其余参数见 https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-%E5%8F%82%E6%95%B0
 *
 * @param {(data) => Promise} onSearch 搜索函数，参数是输入的集合，返回 Promise 可以展示 Loading
 * @param {() => Promise} onReset 重置函数，返回 Promise 可以展示 Loading
 */
@Form.create()
class ATSearchBar extends React.Component {
  static defaultProps = {
    initialItemCount: 8,
  }

  state = {
    down: false,
    loading: false,
  }

  onSubmit = async e => {
    e.preventDefault()
    try {
      this.setState({
        loading: true,
      })

      const { form, onSearch } = this.props

      const values = await form.validateFieldsAndScroll()
      await onSearch(values)
    } catch (error) {
      message.error(error.msg)
    } finally {
      this.setState({
        loading: false,
      })
    }
  }

  onReset = async e => {
    try {
      this.setState({
        loading: true,
      })
      const { onReset, form } = this.props
      onReset && (await onReset())
      await form.resetFields()
    } catch (error) {
      console.error('ATSearch:onReset-error', error)
    } finally {
      this.setState({
        loading: false,
      })
    }
  }

  toggleUpDown = e => {
    this.setState({
      down: !this.state.down,
    })
  }

  transformColumns = () => {
    const { columns, initialItemCount } = this.props
    const { down } = this.state

    if (!columns || !columns.length) {
      return null
    }
    let cols = []

    cols = columns.map(column => {
      const { title, render, key, span, ...options } = column
      const { getFieldDecorator, getFieldsValue } = this.props.form

      // Render 默认为输入框
      const Component = render ? render(getFieldsValue()) : <Input placeholder={`请输入${title}`} />

      return (
        <Col span={span || 6} key={key}>
          <Form.Item label={title}>{getFieldDecorator(key, options)(Component)}</Form.Item>
        </Col>
      )
    })

    // 超出 initialItemCount 数量的隐藏
    if (!down) {
      cols = cols.slice(0, initialItemCount)
    }

    return cols
  }

  renderSubmit() {
    const { columns, initialItemCount } = this.props

    return (
      <Row type="flex" justify="end" gutter={12}>
        <Col>
          <Button type="primary" htmlType="submit" icon="search">
            搜索
          </Button>
        </Col>
        <Col>
          <Button type="default" onClick={this.onReset}>
            重置
          </Button>
        </Col>
        {columns.length > initialItemCount && (
          <Col>
            <Button onClick={this.toggleUpDown} type="link">
              {this.state.down ? '收起 ' : '展开 '}
              {this.state.down ? (
                <Icon type="up" style={{ fontSize: 12 }} />
              ) : (
                <Icon type="down" style={{ fontSize: 12 }} />
              )}
            </Button>
          </Col>
        )}
      </Row>
    )
  }

  render() {
    return (
      <Spin spinning={this.state.loading}>
        <Form onSubmit={this.onSubmit}>
          <Row gutter={24}>{this.transformColumns()}</Row>
          {this.renderSubmit()}
        </Form>
        <Divider dashed />
      </Spin>
    )
  }
}

export default ATSearchBar
