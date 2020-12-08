import React from 'react'
import { Form } from 'at-console-components'
import { Store } from 'antd/lib/form/interface'
import { FormItemProps } from '..'

const { useForm } = Form

export default function BaseDemo() {
  const [form] = useForm()
  const baseItems: FormItemProps[] = [
    {
      label: '介绍',
      type: 'divider',
    },
    {
      name: 'name',
      label: '姓名',
    },
  ]

  return (
    <Form
      items={baseItems}
      form={form}
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
    />
  )
}
