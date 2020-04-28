import React from 'react'
import { Spin, Row, Col, Form, Button, Message, Input, Icon } from 'antd'
import { httpConsole } from 'auto-libs'
import './style'
import classnames from 'classnames'

/**
 * 参数
 * newForm 值为boolean，表示是新表单还是修改原表单
 * columns 数据骨架Object
 * columns.title 显示的标题
 * columns.key 字段名称
 * columns.value 字段的值（function），若没有，在newForm=false时默认从接口相应的字段中获取
 * columns.render 渲染组件，默认为Input组件，返回两个参数，1. 所有columns组件当前字段，2. 接口数据（newForm为false才会有）
 * columns.span 单独设置宽度，左边栏占了6，所以理论上span最大可用的是18（共24）
 * columns.initialValue 默认值
 * apiList 接口列表Object
 * apiList.read 获取数据的接口地址，在newForm=false时会调用该接口
 * apiList.create 创建保存时会调用，即newForm=true时
 * apiList.update 修改保存时会调用，即newForm=false时
 * labelSpan 标题栏的宽度，默认6
 * wrapperSpan 主体栏的宽度，默认8
 * checkForm 表单提交时的验证方法，需返回一个promise实例，resolve需要传提交的数据，reject传递报错信息文字
 * afterFetch 获取数据之后，仅在newForm为false时会发生
 * afterSubmit 表单提交成功之后的回调方法，会将提交的返回数据作为参数带上
 */

@Form.create()
class AutoForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
    }

    this.keys = {}
  }

  componentDidMount() {
    // 如果保存类型是更新，需要先拉取数据
    if (!this.props.newForm) {
      this.fetchData()
    }
  }

  // 请求数据
  fetchData = async e => {
    try {
      // 判断参数
      let apiList = this.props.apiList
      if (!apiList || !apiList.read) {
        return
      }

      this.setState({
        loading: true,
      })

      // 处理接口与请求方式
      let api = apiList.read
      let method = 'get'
      if (api.indexOf(':') !== -1) {
        const v = api.split(':')
        api = v[1]
        method = v[0]
      }

      // 处理数据
      const data = {}

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

      // 全部存入
      this.dataSource = res

      // 按内容需要捆绑form的数据
      const values = {}
      this.props.columns &&
        this.props.columns.forEach(res => {
          if (typeof res.value === 'function') {
            values[res.key] = res.value(this.dataSource)
          } else {
            const value = this.dataSource[res.key]
            if (value !== null && typeof value !== 'undefined') {
              values[res.key] = value
            }
          }
        })

      this.keys = values
      this.props.form.setFieldsValue(values)

      // 如果有回调狗子，执行它
      if (this.props.afterFetch) {
        this.props.afterFetch(res)
      }
    } catch (e) {
      console.error(e)
      Message.error(e.msg)
    } finally {
      this.setState({
        loading: false,
      })
    }
  }

  // 提交
  onSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      try {
        if (err) {
          throw new Error('系统错误')
        }
        this.setState({
          loading: true,
        })

        if (this.props.checkForm) {
          const res = await this.props.checkForm(values, this.dataSource, this.props.newForm)
          if (res) {
            this.asyncSubmit(res)
          } else {
            this.asyncSubmit(values)
          }
        } else {
          this.asyncSubmit(values)
        }
      } catch (e) {
        console.error(e)
        if (typeof e === 'string') {
          Message.error(e)
        } else {
          Message.error(e.msg || e.message)
        }
      } finally {
        this.setState({
          loading: false,
        })
      }
    })
  }

  // 提交请求
  asyncSubmit = async data => {
    try {
      this.setState({
        loading: true,
      })

      // 处理提交的接口
      let api = this.props.newForm ? this.props.apiList.create : this.props.apiList.update
      let method = 'post'
      if (api.indexOf(':') !== -1) {
        const v = api.split(':')
        api = v[1]
        method = v[0]
      }

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

      // 后续处理
      Message.success('提交成功')

      // 回调
      if (this.props.afterSubmit) {
        this.props.afterSubmit(res)
      }
    } catch (e) {
      console.error(e)
      Message.error(e.msg)
    } finally {
      this.setState({
        loading: false,
      })
    }
  }

  // 返回
  onBackClick = e => {
    window.history.back()
    e.preventDefault()
  }

  createItem = ({ title, render, initialValue, key, span }, layout) => {
    if (!key) {
      return null
    }

    const { getFieldDecorator, getFieldsValue } = this.props.form

    // render默认为input输入框
    if (!render) {
      render = e => <Input placeholder={`请输入${title}`} />
    }

    // 初始化值
    let val = {}
    if (typeof initialValue !== 'undefined') {
      val = {
        initialValue,
      }
    }

    // 得到组件
    const comp = render(getFieldsValue(), this.dataSource)

    if (!comp) {
      return null
    }

    const _layout = {
      labelCol: { ...layout.labelCol },
      wrapperCol: { ...layout.wrapperCol },
    }

    if (span) {
      _layout.wrapperCol.sm = span
    }

    return (
      <Form.Item
        {..._layout}
        label={title || ' '}
        key={key}
        className={`form-item__${key}`}
        colon={!!title}
      >
        {getFieldDecorator(key, val)(comp)}
      </Form.Item>
    )
  }

  renderSubmit() {
    const labelSpan = this.props.labelSpan || 6
    const wrapperSpan = this.props.wrapperSpan ? this.props.wrapperSpan : 8
    const layout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: labelSpan },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: wrapperSpan },
      },
    }

    return (
      <Form.Item {...layout} label="submit" className="auto-form__submit-btns">
        <Button type="primary" htmlType="submit" size="large">
          {!this.state.loading ? <Icon type="save" /> : <Icon type="loading" />}
          保存
        </Button>
        <Button type="default" onClick={this.onBackClick} size="large">
          返回
        </Button>
      </Form.Item>
    )
  }

  render() {
    const cols = []

    // 布局
    const labelSpan = this.props.labelSpan || 6
    const wrapperSpan = this.props.wrapperSpan ? this.props.wrapperSpan : 8

    const layout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: labelSpan },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: wrapperSpan },
      },
    }

    if (this.props.columns && this.props.columns.length) {
      for (let i = 0; i < this.props.columns.length; i++) {
        const it = this.props.columns[i]
        let item = null
        if (!it.key && it.render) {
          item = it.render()
        } else {
          item = this.createItem(it, layout)
        }
        if (item) {
          cols.push(item)
        }
      }
    }

    const css = classnames('auto-form', this.props.className)

    return (
      <div className={css}>
        <h1 className="auto-form__title">
          {this.props.newForm ? (
            <span>
              <Icon type="file-add" />
              &nbsp;&nbsp;新增
            </span>
          ) : (
            <span>
              <Icon type="edit" />
              &nbsp;&nbsp;编辑
            </span>
          )}
        </h1>
        <Spin spinning={this.state.loading}>
          <Row>
            <Col span={24}>
              <Form onSubmit={this.onSubmit}>
                {cols}
                {this.renderSubmit()}
              </Form>
            </Col>
          </Row>
        </Spin>
      </div>
    )
  }
}

export default AutoForm
