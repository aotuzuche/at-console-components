import { Drawer } from 'antd'
import { DrawerProps } from 'antd/lib/drawer'
import React from 'react'
import Table, { TableProps } from '../table'
import useWindowSize from '../table/useWindowSize'

export interface DrawerTablePorps<RecordType> extends DrawerProps {
  tableProps: TableProps<RecordType>
}

// eslint-disable-next-line @typescript-eslint/ban-types
export default function DrawerTable<RecordType extends object>({
  tableProps,
  ...props
}: DrawerTablePorps<RecordType>) {
  const { height } = useWindowSize()
  return (
    <Drawer
      footer={null}
      destroyOnClose
      {...props}
      bodyStyle={{
        maxHeight: height,
        overflow: 'auto',
      }}
    >
      <Table<RecordType>
        scroll={{ y: height - 200 - (tableProps?.showTools ? 50 : 0) }}
        {...tableProps}
      />
    </Drawer>
  )
}
