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
      type: 'subTitle',
    },
    {
      name: 'name',
      label: '姓名',
    },
    {
      name: 'sex',
      label: '性别',
    },
    {
      label: '其他',
      type: 'subTitle',
    },
    {
      name: 'website',
      label: '个人主页',
    },
  ]

  return (
    <Form
      items={baseItems}
      form={form}
      title="表单标题"
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
