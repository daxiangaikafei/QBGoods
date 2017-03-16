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
      }
 
    ], //required
    model : 'gatherGoods',
    statusKey : 'tabActive'             //the statusKey in the model, default 'tabActive'
  }

  constructor(props) {
    super(props)
    this.state = {
    }
    props.getBannerList(20)

  }
  getData = () => {
    let model = this.tabsConfig.model
    let { loading, page, isEnd, tabActive } = this.props
    let action = this.tabsConfig.names[tabActive].action
    
    if ((page !== 0 && loading === true) || (isEnd)) {
      return;
    }
    this.props.action({type:`${model}/${action}`,page:++page})
  }

  touchMove = (that, args) => {
    console.log(that, args);
    if (that.min - args[0] > 30) {
      this.getData();
    }
  }
  render() {
    let { loading, page, isEnd, tabActive } = this.props;
    let action = this.tabsConfig.names[tabActive]
    let i = 0, j = this.props.productList.length, totalPrice = 0, totalSb = 0;
    let props = {
      property: "translateY",
      styleName: "product-list",
      tag: "div",
      min: "auto",
      stopPro: false,
      vertical: true,
      touchMove: this.touchMove,
      intervals: 500
      //step:200
    }
    if (j === 0 && page === 0 && loading === false) {
      return (<div styleName="list"></div>)
    } else if (j === 0 && page === 0) {
      return (<div styleName="list"></div>)
    }

    return (
      <Swipe {...props}>
        <div styleName="home-container">
          <Banner bannerList={this.props.bannerList} />
          <Tabs tabsConfig={this.tabsConfig} />
          <ProductList listConfig={{ 
            temp: this.tabsConfig.names[this.props.tabActive]['temp'], 
            isNoMore: isEnd
          }} listData={this.props.productList}/>
        </div>
      </Swipe>

    )
  }

};

function mapStateToProps(state) {
  return state.gatherGoods;
}

function mapDispatchToProps(dispatch) {
  return {
    action(type) {
      dispatch(type);
    },
    getBannerList(id) {
      dispatch({ type: 'gatherGoods/getBannerList', id });
    }
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
