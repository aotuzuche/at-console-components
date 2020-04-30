import './style'
import React from 'react'
import { Link } from 'react-router-dom'

interface IRouterConfig {
  name: string
  url: string
}

const urlConfig: Array<IRouterConfig> = [
  {
    name: 'dev环境登录页面',
    url: '/devLogin',
  },
  {
    name: '上传阿里云',
    url: '/aliyunOSSUpload',
  },
]

const Page = () => {
  return (
    <div className="page-index">
      {urlConfig.map((item: IRouterConfig, index: number) => {
        return (
          <Link className="item" to={item.url} key={index}>
            {item.name}
          </Link>
        )
      })}
    </div>
  )
}

export default Page
