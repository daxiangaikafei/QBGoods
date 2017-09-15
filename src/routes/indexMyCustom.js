import React from 'react'
import { Route, IndexRoute, Router } from 'dva/router'
import CoreLayout from '../containers/layout'
import Hotgoods from 'views/Hotgoods/page'
import MyCustom from 'views/MyCustom/page'
import SelfSupport from 'views/SelfSupport/page'
import GatherGoods from 'views/GatherGoods/page'
import GatherStore from 'views/GatherStore/page'
import ShopActivity from 'views/ShopActivity/page'

import Order from "views/Order/page"
import BannerEntry from "views/Activity/bannerEntry"
import Banner01 from "views/Activity/banner01"
import ChannelEntry from "views/Activity/channelEntry"

export default function (ref) {
  return (
    <Router history={ref.history}>
      <Route path='/' component={CoreLayout} name="我有好物">
        <IndexRoute component={MyCustom} name="我的定制"/>
        <Route path='/MyCustom' component={MyCustom} name="我的定制" />
      </Route>
    </Router>
  )
}
