import React, { FC, useMemo } from 'react'
import { Popconfirm, Tooltip, Space } from 'antd'
import { PoweroffOutlined, AppstoreOutlined } from '@ant-design/icons'
import { toConsoleLogin } from 'auto-libs'
import getLoginInfo from '../utils/getLoginInfo'

const Footer: FC<{
  collapsed: boolean
}> = ({ collapsed }) => {
  const { loginName = 'unknow' } = useMemo(getLoginInfo, [])
  return (
    <div className="at-cc-aside-footer">
      <div className="at-cc-aside-footer-body">
        <Tooltip title={loginName} placement="right">
          <span className="at-cc-aside-footer-avatar">
            {loginName.substr(-2)}
          </span>
        </Tooltip>
        {!collapsed && (
          <Space size="middle">
            <Popconfirm
              title="确认要回到主页么？"
              onConfirm={() => {
                window.location.href = '/system'
              }}
            >
              <AppstoreOutlined className="at-cc-aside-footer-icon" />
            </Popconfirm>
            <Popconfirm title="确认要注销么？" onConfirm={toConsoleLogin}>
              <PoweroffOutlined className="at-cc-aside-footer-icon" />
            </Popconfirm>
          </Space>
        )}
      </div>
    </div>
  )
}

export default Footer
