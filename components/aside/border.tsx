import React, { FC } from 'react'
import { LeftCircleOutlined } from '@ant-design/icons'
import { css } from 'linaria'
import classnames from 'classnames'
import styles from '../styles'

const Border: FC<{
  onClick: () => void
  collapsed: boolean
}> = ({ onClick, collapsed }) => {
  const borderClassName = css`
    width: 2px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    opacity: 0;
    background: ${styles.color};
    transition: opacity 0.2s ease 0s;
  `

  return (
    <div
      className={css`
        position: absolute;
        width: 24px;
        top: 0;
        right: -24px;
        bottom: 0;
        color: #6b778c;
        &:hover {
          .${borderClassName} {
            opacity: 1;
          }
          cursor: col-resize;
          color: ${styles.color};
        }
      `}
      onClick={onClick}
    >
      <div
        className={classnames(
          borderClassName,
          css`
            opacity: 0.5;
            background: linear-gradient(
              270deg,
              rgba(0, 0, 0, 0.2) 0,
              rgba(0, 0, 0, 0.2) 1px,
              rgba(0, 0, 0, 0.1) 0,
              transparent
            );
            width: 3px;
            left: -2px;
          `
        )}
      />
      <div className={borderClassName} />
      <div
        className={css`
          position: absolute;
          width: 24px;
          height: 24px;
          top: 15px;
          right: 10px;
          cursor: pointer;
          transition: transform 0.3s;
          text-align: center;
          z-index: 2;
          &:hover {
            transform: scale(1.2);
          }
        `}
      >
        <LeftCircleOutlined
          className={css`
            font-size: 24px;
            background-color: #fff;
            > svg {
              transition: transform 0.3s ${styles.cubicClose} 0s;
            }
          `}
          rotate={collapsed ? -180 : 0}
        />
      </div>
    </div>
  )
}

export default Border
