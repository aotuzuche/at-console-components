import React from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter, Switch, Route, Redirect, Router } from 'react-router-dom'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import { createBrowserHistory } from 'history'
import PageIndex from './pages/index/index'

interface IRConfig {
  url: string
  component: any
}

const RoutersConfig: Array<IRConfig> = [
  {
    url: '/',
    component: React.lazy(() => import('./pages/index/')),
  },
  {
    url: '/devLogin',
    component: React.lazy(() => import('./pages/devLogin/')),
  },
  {
    url: '/aliyunOSSUpload',
    component: React.lazy(() => import('./pages/upload/')),
  },
]

export default () => {
  return (
    <BrowserRouter>
      <ConfigProvider locale={zh_CN}>
        <Router history={createBrowserHistory()}>
          <React.Suspense fallback={() => <div />}>
            <Switch>
              {RoutersConfig.map((item: IRConfig, index: number) => {
                return <Route path={item.url} exact={true} key={index} component={item.component} />
              })}
              <Route path="/" exact={true} component={PageIndex} />
              <Redirect to="/" />
            </Switch>
          </React.Suspense>
        </Router>
      </ConfigProvider>
    </BrowserRouter>
  )
}
