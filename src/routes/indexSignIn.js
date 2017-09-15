import React from 'react'
import { Route, IndexRoute, Router } from 'dva/router'
import CoreLayout from '../containers/layout'
import SignIn from 'views/Activity/signIn'
export default function (ref) {
  return (
    <Router history={ref.history}>
      <Route path='/' component={CoreLayout} name="我有好物">
        <IndexRoute component={SignIn} name="今日清单"/>
        <Route path='/SignIn' component={SignIn} name="今日清单" />
      </Route>
    </Router>
  )
}
