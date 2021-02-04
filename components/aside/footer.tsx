import React, { FC, useMemo, useContext } from 'react'
import { Popconfirm } from 'antd'
import {
  PoweroffOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { toConsoleLogin, clearConsoleToken } from 'auto-libs'
import getLoginInfo from '../utils/getLoginInfo'
import WrapperContext from '../wrapper/wrapperContext'

const Footer: FC<{
  collapsed: boolean
  loginUrl: string
  homeUrl: string
}> = ({ collapsed, loginUrl, homeUrl }) => {
  const { loginName = 'unknow' } = useMemo(getLoginInfo, [])
  const { setCollapsed } = useContext(WrapperContext)
  const logOut = () => {
    if (loginUrl) {
      clearConsoleToken()
      window.location.href = loginUrl
    } else {
      toConsoleLogin()
    }
  }
  const backHome = () => {
    if (homeUrl) {
      window.location.href = homeUrl
    } else {
      window.location.href = '/system'
    }
  }
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
                <Popconfirm title="确认要注销么？" onConfirm={logOut}>
                  <div className="at-cc-aside-footer-btn at-cc-aside-footer-logout">
                    <PoweroffOutlined className="at-cc-aside-footer-icon" />
                  </div>
                </Popconfirm>
                <Popconfirm title="确认要回到主页么？" onConfirm={backHome}>
                  <div className="at-cc-aside-footer-btn at-cc-aside-footer-appstore">
                    <AppstoreOutlined className="at-cc-aside-footer-icon" />
                  </div>
                </Popconfirm>
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
