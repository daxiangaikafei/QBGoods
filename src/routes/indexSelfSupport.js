import React from 'react'
import { Route, IndexRoute, Router } from 'dva/router'
import CoreLayout from '../containers/layout'
import SelfSupport from 'views/SelfSupport/page'
export default function (ref) {
  return (
    <Router history={ref.history}>
      <Route path='/' component={CoreLayout} name="有好货">
        <IndexRoute component={SelfSupport} name="钱宝自营"/>
        <Route path='/SelfSupport' component={SelfSupport} name="钱宝自营" />
      </Route>
    </Router>
  )
}
