import { Popconfirm } from 'antd'
import React, { FC, useContext, useMemo } from 'react'
import getLoginInfo from '../utils/getLoginInfo'
import { toConsoleLogin } from '../utils/token'
import WrapperContext from '../wrapper/wrapperContext'
import {
  PoweroffOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'

const Footer: FC<{
  collapsed: boolean
}> = ({ collapsed }) => {
  const { loginName = 'unknow' } = useMemo(getLoginInfo, [])
  const { setCollapsed, logOut, backHome, showHome } = useContext(WrapperContext)

  return (
    <div className="at-cc-aside-footer">
      <div className="at-cc-aside-footer-body">
        {collapsed && (
          <div
            className="at-cc-aside-footer-open"
            onClick={() => {
              setCollapsed(value => !value)
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
                <Popconfirm title="确认要注销么？" onConfirm={logOut || toConsoleLogin}>
                  <div className="at-cc-aside-footer-btn at-cc-aside-footer-logout">
                    <PoweroffOutlined className="at-cc-aside-footer-icon" />
                  </div>
                </Popconfirm>
                {showHome && (
                  <Popconfirm
                    title="确认要回到主页么？"
                    onConfirm={
                      backHome ||
                      (() => {
                        window.location.href = '/system'
                      })
                    }
                  >
                    <div className="at-cc-aside-footer-btn at-cc-aside-footer-appstore">
                      <AppstoreOutlined className="at-cc-aside-footer-icon" />
                    </div>
                  </Popconfirm>
                )}
                <div
                  className="at-cc-aside-footer-btn at-cc-aside-footer-collapsed"
                  onClick={() => {
                    setCollapsed(value => !value)
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
