import React from 'react'
import { Route, IndexRoute, Router } from 'dva/router'
import CoreLayout from '../containers/layout'
import HotGoods from 'views/Hotgoods/page'

export default function (ref) {
  return (
    <Router history={ref.history}>
      <Route path='/' component={CoreLayout} name="有好货">
        <IndexRoute component={HotGoods} name="热卖好货"/>
        <Route path='/HotGoods' component={HotGoods} name="热卖好货" />
      </Route>
    </Router>
  )
}
