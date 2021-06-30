import ModalTable from '..'
import { Button } from 'antd'
import { TableColumnsType } from 'at-console-components/lib/table'
import React, { useState } from 'react'

interface User {
  key: number
  name: string
  age: number
  birthday: string
  hobby: string
  grade: string
}

export default function ModalFormDemo() {
  const [isShow, setShow] = useState(false)

  const columns: TableColumnsType<User>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      desensitize: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
    },
    {
      title: '爱好',
      dataIndex: 'hobby',
    },
    {
      title: '年级',
      dataIndex: 'grade',
    },
  ]

  const data: User[] = [
    {
      key: 0,
      name: 'Jack',
      age: 12,
      birthday: '2010-10',
      hobby: '篮球',
      grade: '初一',
    },
    {
      key: 1,
      name: 'Bob',
      age: 18,
      birthday: '2011-10',
      hobby: '跳舞',
      grade: '初二',
    },
  ]

  const onSetShow = () => {
    setShow(value => !value)
  }
  return (
    <>
      <Button onClick={onSetShow}>Show Modal</Button>
      <ModalTable
        title="Modal Table Demo"
        tableProps={{
          columns,
          onSearch: () => ({ data }),
        }}
        visible={isShow}
        onCancel={onSetShow}
      />
    </>
  )
}
