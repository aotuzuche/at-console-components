import React from 'react'
import { Operator, Table } from 'at-console-components'

export default function OperatorBase() {
  const dataSource = [
    { name: '小明', age: 15 },
    { name: '小红', age: 15 },
  ]
  const tableColumn = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: '操作',
      dataIndex: 'operator',
      render: () => (
        <Operator len={3}>
          <a>新增</a>
          <a>编辑</a>
          <a>删除</a>
          <a>跳转</a>
        </Operator>
      ),
    },
  ]
  return <Table columns={tableColumn} onSearch={dataSource} />
}
