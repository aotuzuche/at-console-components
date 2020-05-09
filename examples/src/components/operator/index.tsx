import React from 'react'
import './style.scss'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'

/**
 * 对操作栏的二次封装
 *
 * 用法
 * <Operator>
 *   <span>操作1</span>
 *   <span>操作2</span>
 *   <span>操作3</span>
 * </Operator>
 *
 * 1. 字体颜色（可点击）
 * 2. 间隔
 * 3. 超过三个操作进行折叠
 *
 * @param {*} props
 * @returns
 */
function Operator({ len = 2, ...props }) {
  const { children } = props

  let composition: any = [].concat(children)

  if (composition.length > len) {
    const overlay = (
      <Menu>
        {composition.slice(len - 1).map((child: any, index: number) => {
          // 把子元素的 onClick 提上来，防止 inline 元素触发体验差
          const childClick = child?.props?.onClick

          return (
            <Menu.Item onClick={childClick} key={index}>
              {React.cloneElement(child, {
                onClick: () => {},
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

  return <div className="at-operator">{composition}</div>
}

export default Operator
