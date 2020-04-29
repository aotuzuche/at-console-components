import React from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter, Switch, Route, Redirect, Router } from 'react-router-dom'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import { createBrowserHistory } from 'history'
import PageLogin from '../../src/components/_devLogin'

export default (history: any) => {
  return (
    <BrowserRouter>
      <ConfigProvider locale={zh_CN}>
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route path="/" exact={true} component={PageLogin} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ConfigProvider>
    </BrowserRouter>
  )
}
