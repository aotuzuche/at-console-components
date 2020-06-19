import React, { FC, ReactNode } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Space } from 'antd'
import toArray from 'rc-util/lib/Children/toArray'

export interface OperatorProps {
  len?: number
}

const Operator: FC<OperatorProps> = (props) => {
  const { len = 2, children } = props

  let composition: ReactNode[] = toArray(children)

  if (composition.length > len) {
    const overlay = (
      <Menu>
        {composition.slice(len - 1).map((child: any, index: number) => {
          // 把子元素的 onClick 提上来，防止 inline 元素触发体验差
          const childClick = child?.props?.onClick

          return (
            // eslint-disable-next-line react/no-array-index-key
            <Menu.Item onClick={childClick} key={index}>
              {React.cloneElement(child, {
                onClick: null,
              })}
            </Menu.Item>
          )
        })}
      </Menu>
    )

    composition = [
      composition.slice(0, len - 1),
      <Dropdown overlay={overlay} key="at-operator-dropdown">
        <span>
          更多 <DownOutlined />
        </span>
      </Dropdown>,
    ]
  }

  return <Space>{composition}</Space>
}

export default Operator
