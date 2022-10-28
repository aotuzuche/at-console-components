import { Button, DatePicker, Switch } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { Form } from 'at-console-components'
import React from 'react'

const { useForm } = Form

export default function BaseDemo() {
  const [form] = useForm()
  const baseItems = [
    {
      name: 'name',
      label: '姓名',
      required: true,
    },
    {
      name: 'age',
      label: '年龄',
    },
    { name: 'birthday', label: '出生年月', render: () => <DatePicker /> },
    { name: 'hasJob', label: '已就业', render: () => <Switch /> },
  ]

  return (
    <Form
      items={baseItems}
      form={form}
      // eslint-disable-next-line no-console
      onFinish={(values: Store) =>
        new Promise(resolve => {
          setTimeout(() => {
            // eslint-disable-next-line no-console
            console.log('BaseDemo', values)
            resolve(values)
          }, 1000)
        })
      }
    >
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}
