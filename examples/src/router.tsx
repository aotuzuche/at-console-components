import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PageHome from './pages/home/'
import PageList from './pages/list/'
import PageLogin from './pages/devLogin/'

export default () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={PageHome} />
      <Route path="/list" exact={true} component={PageList} />
      <Route path="/system/login" exact={true} component={PageLogin} />
      <Redirect to="/" />
    </Switch>
  )
}
