import React, { FC } from 'react'
import { Popconfirm, Tooltip, Space } from 'antd'
import { PoweroffOutlined, AppstoreOutlined } from '@ant-design/icons'
import { css } from 'linaria'
import styles from '../styles'

const iconClassname = css`
  font-size: 18px;
  cursor: pointer;
`

const Footer: FC<{
  collapsed: boolean
}> = ({ collapsed }) => {
  return (
    <div
      className={css`
        background-color: ${styles.aside.backgroundColor};
        padding: 10px ${styles.aside.padding} 0;
        height: 80px;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        &::before {
          content: '';
          height: 1px;
        }
      `}
    >
      <div
        className={css`
          display: flex;
          height: 100%;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid ${styles.aside.borderColor};
        `}
      >
        <Tooltip title="Admin" placement="right">
          <span
            className={css`
              width: 32px;
              display: inline-block;
              height: 32px;
              text-align: center;
              line-height: 32px;
              border-radius: 50%;
              overflow: hidden;
              background-color: ${styles.color};
              color: #fff;
            `}
          >
            Adewrfo efr
          </span>
        </Tooltip>
        {!collapsed && (
          <Space size="middle">
            <Popconfirm title="确认要回到主页么？">
              <AppstoreOutlined className={iconClassname} />
            </Popconfirm>
            <Popconfirm title="确认要注销么？">
              <PoweroffOutlined className={iconClassname} />
            </Popconfirm>
          </Space>
        )}
      </div>
    </div>
  )
}

export default Footer
