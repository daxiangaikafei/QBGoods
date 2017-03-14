import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat } from 'libs/util'

import createFragment from 'react-addons-create-fragment'

import { Tabs } from 'ui'
import { ProductList } from 'ui'

class GatherGoods extends Component {
  //Tabs and List component config
  tabsConfig = {
    names : [
      {
        key:'云好货',
        action: 'getCloudList',
        temp: 'similar'                 //带找相似
      },
      {
        key:'热搜好货',
        action: 'getHotSearchList'
    },
      {
        key:'我的定制',
        action: 'getHotSearchList',
        temp: 'sales'                   //带销量
      }
    ], //required
    model : 'gatherGoods',
    statusKey : 'tabActive'             //the statusKey in the model, default 'tabActive'
  }

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div styleName="home-container">
        <div styleName="banner-container">
          <img src={require("static/imgs/gatherGoods/banner.png")} alt=""/>
        </div>
        <Tabs tabsConfig={this.tabsConfig} />
        <ProductList listConfig={{temp:this.tabsConfig.names[this.props.tabActive]['temp']}} listData={this.props.productList}/>
      </div>
    )
  }

};

function mapStateToProps(state) {
  return state.gatherGoods;
}

function mapDispatchToProps(dispatch) {
  return {
    // getProductList(productList) {
    //   dispatch({ type: 'gatherGoods/getProductList', productList });
    // }
  }
}

GatherGoods.PropTypes = {
  enterAnimation: {
    duration: 2000,
    animation: 'slideDown'
  },
  leaveAnimation: {
    duration: 2000,
    animation: 'slideUp'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(GatherGoods, styles, {allowMultiple: true}));
