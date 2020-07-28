import React, { FC } from 'react'
import { LeftCircleOutlined } from '@ant-design/icons'

const Border: FC<{
  onClick: () => void
  collapsed: boolean
}> = ({ onClick, collapsed }) => {
  return (
    <div className="at-cc-aside-border" onClick={onClick}>
      <div className="at-cc-aside-border-handle">
        <LeftCircleOutlined
          className="at-cc-aside-border-handle-icon"
          rotate={collapsed ? -180 : 0}
        />
      </div>
    </div>
  )
}

export default Border
