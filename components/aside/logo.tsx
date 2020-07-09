import React, { FC } from 'react'
import { css } from 'linaria'
import { Link } from 'react-router-dom'
import styles from '../styles'

const Logo: FC<{
  title: string
}> = ({ title }) => {
  return (
    <Link to="/">
      <h1
        className={css`
          background-color: ${styles.aside.backgroundColor};
          padding: 0 ${styles.aside.padding};
          margin: 0;
          color: ${styles.aside.color};
          font-size: 22px;
          white-space: nowrap;
          overflow: hidden;
          height: 60px;
          display: flex;
          align-items: center;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1;
        `}
      >
        <img
          src="data:image/png;base64,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"
          alt="logo"
          className={css`
            width: 42px;
            border-radius: 10px;
            margin-right: 15px;
          `}
        />
        <span>{title}</span>
      </h1>
    </Link>
  )
}

export default Logo
