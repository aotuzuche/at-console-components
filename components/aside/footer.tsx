import React, { FC, useMemo, useContext } from 'react'
import { Popconfirm } from 'antd'
import {
  PoweroffOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
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
        {collapsed && (
          <div
            className="at-cc-aside-footer-open"
            onClick={() => {
              setCollapsed((value) => !value)
            }}
          >
            <DoubleRightOutlined className="at-cc-aside-footer-icon" />
          </div>
        )}

        {!collapsed && (
          <>
            <div className="at-cc-aside-footer-img" />
            <div className="at-cc-aside-footer-info">
              <h2>{loginName}</h2>

              <div className="at-cc-aside-footer-btns">
                <Popconfirm title="确认要注销么？" onConfirm={toConsoleLogin}>
                  <div className="at-cc-aside-footer-btn at-cc-aside-footer-logout">
                    <PoweroffOutlined className="at-cc-aside-footer-icon" />
                  </div>
                </Popconfirm>

                <div
                  className="at-cc-aside-footer-btn at-cc-aside-footer-collapsed"
                  onClick={() => {
                    setCollapsed((value) => !value)
                  }}
                >
                  <DoubleLeftOutlined className="at-cc-aside-footer-icon" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Footer
