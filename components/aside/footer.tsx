import React, { FC, useMemo, useContext } from 'react'
import { Popconfirm, Tooltip, Space } from 'antd'
import {
  PoweroffOutlined,
  AppstoreOutlined,
  LeftCircleOutlined,
} from '@ant-design/icons'
import { toConsoleLogin } from 'auto-libs'
import getLoginInfo from '../utils/getLoginInfo'
import WrapperContext from '../wrapper/wrapperContext'

const Footer: FC<{
  collapsed: boolean
}> = ({ collapsed }) => {
  const { loginName = 'unknow' } = useMemo(getLoginInfo, [])
  const { setCollapsed } = useContext(WrapperContext)
  return (
    <div className="at-cc-aside-footer">
      <div className="at-cc-aside-footer-body">
        {!collapsed && (
          <Tooltip title={loginName} placement="right">
            <span className="at-cc-aside-footer-avatar">
              {loginName.substr(-2)}
            </span>
          </Tooltip>
        )}
        <Space size="middle">
          {!collapsed && (
            <Popconfirm
              title="确认要回到主页么？"
              onConfirm={() => {
                window.location.href = '/system'
              }}
            >
              <AppstoreOutlined className="at-cc-aside-footer-icon" />
            </Popconfirm>
          )}
          {!collapsed && (
            <Popconfirm title="确认要注销么？" onConfirm={toConsoleLogin}>
              <PoweroffOutlined className="at-cc-aside-footer-icon" />
            </Popconfirm>
          )}
          <Tooltip title={collapsed ? '展开' : '收起'}>
            <LeftCircleOutlined
              className="at-cc-aside-footer-icon"
              rotate={collapsed ? -180 : 0}
              onClick={() => {
                setCollapsed((value) => !value)
              }}
            />
          </Tooltip>
        </Space>
      </div>
    </div>
  )
}

export default Footer
