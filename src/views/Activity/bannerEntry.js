import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat } from 'libs/util'
import ReactSwipe from 'react-swipe';
import Swipe from "components/swipe/swipe";

import { Banner } from 'ui'
import { Tabs } from 'ui'
import { ProductList } from 'ui'

class BannerEntry extends Component {
  pageName = '107'
  //Tabs and List component config
  tabsConfig = {
    names : [
      {
        key:'新品',
        action: 'ListRes',
        temp: 'activity'
      },
      {
        key:'优惠',
        action: 'ListRes',
        temp: 'activity'
      },
      {
        key: '精品',
        action: 'ListRes',
        temp: 'activity'
      }
 
    ], //required
    model : 'activity',
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
          <ReactSwipe styleName="banner-container" swipeOptions={{ continuous: false }}>
            <div><a href=''><img src={require('static/imgs/activity/banner2.jpg')} /></a></div>
            <div><a href=''><img src={require('static/imgs/activity/banner3.jpg')} /></a></div>
          </ReactSwipe>
          <Tabs 
            tabsConfig={this.tabsConfig} 
            eventConfig={{
              pageName: this.pageName,
              model: 'banner_entry_tab'
            }}/>
          <ProductList 
            listConfig={{ 
              temp: this.tabsConfig.names[this.props.tabActive]['temp'], 
              isNoMore: true
            }} 
            listData={this.props.productList}
            eventConfig={{
              pageName: this.pageName,
              model: 'banner_entry_products'
            }}
          />
        </div>
    )
  }

};

function mapStateToProps(state) {
  return state.activity;
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

BannerEntry.PropTypes = {
  enterAnimation: {
    duration: 2000,
    animation: 'slideDown'
  },
  leaveAnimation: {
    duration: 2000,
    animation: 'slideUp'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(BannerEntry, styles, {allowMultiple: true}));
