import React from 'react'
interface IProps {
  history: any
}

import { Input, Form, Button, message, Spin } from 'antd'
import { httpConsole, setConsoleToken } from 'auto-libs'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 12 },
}

interface IProps {
  history: any
}

interface IState {
  loading: boolean
}

class View extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      loading: false,
    }
  }

  onSubmit = async (values: any) => {
    try {
      this.setState({
        loading: true,
      })
      const { username, password } = values

      const res: any = await httpConsole({
        url: '/casService/login',
        method: 'POST',
        data: {
          username,
          password,
        },
      })

      const { token, ...userInfo } = res

      setConsoleToken(token)
      localStorage['_app_console_userinfo_'] = JSON.stringify(userInfo)

      // 兼容老的
      localStorage['auto_system_token'] = token // 兼容老的项目token
      localStorage['auto_system_userData'] = JSON.stringify(userInfo)

      this.props.history.replace('/')
      window.location.reload()
    } catch (e) {
      message.error(e.message || '系统异常')
    } finally {
      this.setState({
        loading: false,
      })
    }
  }
  render() {
    const { loading } = this.state
    return (
      <div className="devlogin-page">
        {loading && (
          <div className="devlogin-page-loading">
            <Spin />
          </div>
        )}
        <Form
          {...layout}
          className="devlogin-form"
          initialValues={{ remember: true }}
          onFinish={this.onSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default View
