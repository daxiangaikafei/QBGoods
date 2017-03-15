import React from 'react'
import { Route, IndexRoute, Router } from 'dva/router'
import CoreLayout from '../containers/layout'
import Hotgoods from 'views/Hotgoods/page'
import MyCustom from 'views/MyCustom/page'
import SelfSupport from 'views/SelfSupport/page'
import GatherGoods from 'views/GatherGoods/page'
import GatherStore from 'views/GatherStore/page'

import Order from "views/Order/page"
import Banner01 from "views/Activity/bannner01"

export default function (ref) {
  return (
    <Router history={ref.history}>
      <Route path='/' component={CoreLayout} name="有好货">
        <IndexRoute component={Order} name="有好货"/>
        <Route path='/Hotgoods' component={Hotgoods} name="热卖好货" />
        <Route path='/MyCustom' component={MyCustom} name="我的定制" />
        <Route path='/SelfSupport' component={SelfSupport} name="钱宝自营" />
        <Route path='/GatherGoods' component={GatherGoods} name="聚好货" />
        <Route path='/GatherStore' component={GatherStore} name="聚好店"/>
        <Route path='/Order' component={Order} name="我的好货"/>
        <Route path='/Banner01' component={Banner01} name="活动页面"/>
      </Route>
    </Router>
  )
}
