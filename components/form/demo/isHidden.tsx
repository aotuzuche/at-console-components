import React from 'react'
import { Button, Select } from 'antd'
import { Form } from 'at-console-components'
import { StoreValue, Store } from 'antd/lib/form/interface'
import { FormItemProps } from '..'

export default function IsHiddenDemo() {
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
      suffix: '姓名为 bob 时隐藏',
      isHidden: (value: StoreValue, values: Store) => values.name === 'bob',
    },
  ]

  return (
    <Form
      items={baseItems}
      // eslint-disable-next-line no-console
      onFinish={(values: Store) => console.log('IsHiddenDemo', values)}
    >
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}
