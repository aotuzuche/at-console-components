import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import { BrowserRouter, Router, Route, Redirect, Switch } from 'react-router-dom'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import { createBrowserHistory } from 'history'

import App from './pages/index'

const Routes = () => {
  return (
    <BrowserRouter>
      <ConfigProvider locale={zh_CN}>
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route component={App} path="/" />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ConfigProvider>
    </BrowserRouter>
  )
}

ReactDOM.render(<Routes />, document.getElementById('root'))
