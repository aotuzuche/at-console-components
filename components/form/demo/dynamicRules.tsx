import React from 'react'
import { Button, Select } from 'antd'
import { Form, FormItemProps } from 'at-console-components'
import { Store } from 'antd/lib/form/interface'

export default function DynamicRules() {
  const baseItems: FormItemProps[] = [
    {
      name: 'name',
      label: '姓名',
      render: () => (
        <Select>
          <Select.Option value="bob">Bob</Select.Option>
          <Select.Option value="darry">Darry</Select.Option>
        </Select>
      ),
    },
    {
      name: 'age',
      label: '年龄',
      rules: (v, { name }) => (name === 'bob' ? [{ required: true }] : []),
    },
  ]

  return (
    <Form
      items={baseItems}
      // eslint-disable-next-line no-console
      onFinish={(values: Store) =>
        new Promise((resolve) =>
          setTimeout(() => {
            // eslint-disable-next-line no-console
            console.log('BaseDemo', values)
            resolve(values)
          }, 1000)
        )
      }
    >
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}
