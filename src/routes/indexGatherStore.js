import React from 'react'
import { Route, IndexRoute, Router } from 'dva/router'
import CoreLayout from '../containers/layout'
import GatherStore from 'views/GatherStore/page'

export default function (ref) {
  return (
    <Router history={ref.history}>
      <Route path='/' component={CoreLayout} name="有好货">
        <IndexRoute component={GatherStore} name="聚好店"/>
        <Route path='/GatherStore' component={GatherStore} name="聚好店"/>
      </Route>
    </Router>
  )
}
