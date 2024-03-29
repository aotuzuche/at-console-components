import { FormItemProps } from '..'
import { Store } from 'antd/lib/form/interface'
import { Form } from 'at-console-components'
import React from 'react'

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
        new Promise(resolve => {
          setTimeout(() => {
            // eslint-disable-next-line no-console
            console.log('BaseDemo', values)
            resolve(values)
          }, 1000)
        })
      }
    />
  )
}
