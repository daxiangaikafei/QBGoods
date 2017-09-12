import React from 'react'
import { Route, IndexRoute, Router } from 'dva/router'
import CoreLayout from '../containers/layout'
import HotGoods from 'views/Hotgoods/page'
import MyCustom from 'views/MyCustom/page'
import Themes from 'views/MyCustom/Themes'
import SelfSupport from 'views/SelfSupport/page'
import GatherGoods from 'views/GatherGoods/page'
import GatherStore from 'views/GatherStore/page'
import ShopActivity from 'views/ShopActivity/page'

import Order from "views/Order/page"
import Appeal from "views/Appeal/page"
import BannerEntry from "views/Activity/bannerEntry"
import Banner01 from "views/Activity/banner01"
import ChannelEntry from "views/Activity/channelEntry"
import bannerDetail from "views/Activity/bannerDetail"
import SignIn from "views/Activity/signIn"
import IconDoc from "views/IconDoc/page"
import FlexLayout from "views/FlexLayout/page"

import Nine from "views/Special/Nine/page"
import List from "views/Special/List/page"
import GoodsClass from "views/Special/GoodsClass/page"
import Coupon from "views/Special/Coupon/page"
import Man from "views/Special/Man/page"
import Selection from "views/Special/Selection/page"
import SelectionList from "views/Special/SelectionList/page"
import Women from "views/Special/Women/page"
import BrandShop from "views/Special/BrandShop/page"
import BrandShopList from "views/Special/BrandShopList/page"
import FrontMatter from "views/Special/FrontMatter/page"
import MyLabels from "views/MyLabels/page"
import MyLabelsTheme from "views/MyLabelsTheme/page"
import RobGoods from "views/Special/RobGoods/page"

export default function (ref) {
  return (
    <Router history={ref.history}>
      <Route path='/' component={CoreLayout} name="有好货">
        <IndexRoute component={GatherGoods} name="聚好货"/>
        <Route path='/FlexLayout' component={FlexLayout} name="布局" />
        <Route path='/HotGoods' component={HotGoods} name="热卖好货" />
        <Route path='/MyCustom' component={MyCustom} name="我的定制" />
        <Route path='/Themes' component={Themes} name="定制中心" />
        <Route path='/SelfSupport' component={SelfSupport} name="钱宝自营" />
        <Route path='/ShopActivity' component={ShopActivity} name="店铺活动页"/>
        <Route path='/GatherGoods' component={GatherGoods} name="聚好货" />
        <Route path='/GatherStore' component={GatherStore} name="聚好店"/>
        <Route path='/Order' component={Order} name="我的好货"/>
        <Route path='/Appeal' component={Appeal} name="申诉"/>
        <Route path='/BannerEntry' component={BannerEntry} name="活动页面"/>
        <Route path='/Ju/:id' component={Banner01} name="聚好货页面"/>
        <Route path='/bannerDetail/:id' component={bannerDetail} name="Banner详细页面" />
        <Route path='/SignIn' component={SignIn} name="今日清单" />
        <Route path='/ChannelEntry/1' component={ChannelEntry} name="女神学穿搭" />
        <Route path='/ChannelEntry/2' component={ChannelEntry} name="个护化妆" />
        <Route path='/ChannelEntry/3' component={ChannelEntry} name="运动户外" />
        <Route path='/ChannelEntry/4' component={ChannelEntry} name="创意电器" />
        <Route path='/ChannelEntry/5' component={ChannelEntry} name="母婴联合馆" />
        <Route path='/ChannelEntry/6' component={ChannelEntry} name="焕然居家" />
        <Route path='/IconDoc' component={IconDoc} name="Icon Document" />

        <Route path='/GoodsClass' component={GoodsClass} name="商品分类" />
        <Route path='/List/:id' component={List} name="专场" />
        <Route path='/FrontMatter/:id' component={FrontMatter} name="有好货" />
        <Route path='/MyLabels' component={MyLabels} name="修改" />
        <Route path='/MyLabelsTheme' component={MyLabelsTheme} name="个性主题" />

        <Route path='/RobGoods' component={RobGoods} name="必抢爆款" />

        <Route path='/Nine/:id' component={Nine} name="9.9专场" />
        <Route path='/Coupon/:id' component={Coupon} name="好券直播" />
        <Route path='/Man/:id' component={Man} name="男士专场" />
        <Route path='/Selection/:id' component={Selection} name="好物精选" />
        <Route path='/SelectionList/:id' component={SelectionList} name="好物精选" />
        <Route path='/BrandShopList' component={BrandShopList} name="品牌店铺列表" />
        <Route path='/BrandShop/:id' component={BrandShop} name="品牌店铺" />
        <Route path='/Women/:id' component={Women} name="女士专场" />
      </Route>
    </Router>
  )
}
