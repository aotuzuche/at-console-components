import { Button, DatePicker, Switch } from 'antd'
import { DrawerForm } from 'at-console-components'
import React, { useState } from 'react'

export default function DrawerFormDemo() {
  const [isShow, setShow] = useState(false)

  const baseItems = [
    { name: 'name', label: '姓名', required: true },
    {
      name: 'age',
      label: '年龄',
      rules: [{ required: true, message: '请输入年龄' }],
    },
    { name: 'birthday', label: '出生年月', render: () => <DatePicker /> },
    { name: 'hasJob', label: '已就业', render: () => <Switch /> },
  ]

  const onSetShow = () => {
    setShow(value => !value)
  }
  return (
    <>
      <Button onClick={onSetShow}>Show Drawer</Button>
      <DrawerForm
        title="Drawer Form Demo"
        width={600}
        onClose={onSetShow}
        onCancel={onSetShow}
        onOk={() =>
          new Promise(resolve => {
            resolve(void 0)
          })
        }
        formProps={{
          items: baseItems,
          // eslint-disable-next-line no-promise-executor-return
          onFinish: () => new Promise(resolve => setTimeout(resolve, 2000)),
        }}
        visible={isShow}
      />
    </>
  )
}
