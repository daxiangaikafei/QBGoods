import React from 'react'
import { Route, IndexRoute, Router } from 'dva/router'
import CoreLayout from '../containers/layout'
import GatherGoods from 'views/GatherGoods/page'
export default function (ref) {
  return (
    <Router history={ref.history}>
      <Route path='/' component={CoreLayout} name="有好货">
        <IndexRoute component={GatherGoods} name="聚好货"/>
        <Route path='/GatherGoods' component={GatherGoods} name="聚好货" />
      </Route>
    </Router>
  )
}
