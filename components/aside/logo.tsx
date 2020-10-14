import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const Logo: FC<{
  title: string
}> = ({ title }) => {
  return (
    <Link to="/">
      <div className="at-cc-aside-title">
        <img
          src="https://cdn.atzuche.com/static/images/icon-logo-green.png"
          alt="logo"
          className="at-cc-aside-logo"
        />
        <h1>{title}</h1>
      </div>
    </Link>
  )
}

export default Logo
