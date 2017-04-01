import React from 'react'
import { Route, IndexRoute, Router } from 'dva/router'
import CoreLayout from '../containers/layout'
import HotGoods from 'views/Hotgoods/page'
import MyCustom from 'views/MyCustom/page'
import SelfSupport from 'views/SelfSupport/page'
import GatherGoods from 'views/GatherGoods/page'
import GatherStore from 'views/GatherStore/page'
import ShopActivity from 'views/ShopActivity/page'

import Order from "views/Order/page"
import BannerEntry from "views/Activity/bannerEntry"
import Banner01 from "views/Activity/banner01"
import ChannelEntry from "views/Activity/channelEntry"
import bannerDetail from "views/Activity/bannerDetail"
import IconDoc from "views/IconDoc/page"

export default function (ref) {
  return (
    <Router history={ref.history}>
      <Route path='/' component={CoreLayout} name="有好货">
        <IndexRoute component={GatherGoods} name="聚好货"/>
        <Route path='/HotGoods' component={HotGoods} name="热卖好货" />
        <Route path='/MyCustom' component={MyCustom} name="我的定制" />
        <Route path='/SelfSupport' component={SelfSupport} name="钱宝自营" />
        <Route path='/ShopActivity' component={ShopActivity} name="店铺活动页"/>
        <Route path='/GatherGoods' component={GatherGoods} name="聚好货" />
        <Route path='/GatherStore' component={GatherStore} name="聚好店"/>
        <Route path='/Order' component={Order} name="我的好货"/>
        <Route path='/BannerEntry' component={BannerEntry} name="活动页面"/>
        <Route path='/Ju/:id' component={Banner01} name="聚好货页面"/>
        <Route path='/bannerDetail/:id' component={bannerDetail} name="Banner详细页面" />
        <Route path='/ChannelEntry/1' component={ChannelEntry} name="女神学穿搭" />
        <Route path='/ChannelEntry/2' component={ChannelEntry} name="个护化妆" />
        <Route path='/ChannelEntry/3' component={ChannelEntry} name="运动户外" />
        <Route path='/ChannelEntry/4' component={ChannelEntry} name="创意电器" />
        <Route path='/ChannelEntry/5' component={ChannelEntry} name="母婴联合馆" />
        <Route path='/ChannelEntry/6' component={ChannelEntry} name="焕然居家" />
        <Route path='/IconDoc' component={IconDoc} name="Icon Document" />

      </Route>
    </Router>
  )
}
