import { Form } from 'at-console-components'
import moment from 'moment'
import React from 'react'

export default function ViewModeDemo() {
  const viewModeItems = [
    { name: 'name', label: '姓名', desensitize: 'name' },
    { name: 'age', label: '年龄' },
    {
      name: 'birthday',
      label: '出生年月',
      renderView: (date: moment.Moment) => date?.format('YYYY-MM-DD HH:mm:ss'),
    },
    { name: 'mobile', label: '电话', desensitize: 'mobile' },
    {
      name: 'hasJob',
      label: '已就业',
      renderView: (value: number) => (value ? '是' : '否'),
    },
  ]

  return (
    <Form
      items={viewModeItems}
      initialValues={() =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve({
              name: '张三八',
              age: 8,
              mobile: '13800138000',
              birthday: moment(),
              hasJob: 1,
            })
          }, 3000)
        })
      }
      isView
    />
  )
}
