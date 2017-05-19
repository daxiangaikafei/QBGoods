import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './channelEntry.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import ReactSwipe from 'react-swipe';
import { priceFormat, eventFun } from 'libs/util'
import { fetchPosts } from "components/common/fetch"
import MiddleContainer from "./MiddleContainer";
import ListContainer from "./ListContainer";

class signIn extends Component {
  pageName = '111'
  icons = {
    'tmall': require('static/imgs/thirdSource/tmall.png'),
    'dangdang': require('static/imgs/thirdSource/dangdang.png'),
    'gome': require('static/imgs/thirdSource/gome.png'),
    'jd': require('static/imgs/thirdSource/jd.png'),
    'jumei': require('static/imgs/thirdSource/jumei.png'),
    'kaola': require('static/imgs/thirdSource/kaola.png'),
    'mi': require('static/imgs/thirdSource/mi.png'),
    'taobao': require('static/imgs/thirdSource/taobao.png'),
    'yhd': require('static/imgs/thirdSource/yhd.png'),
    'yougou': require('static/imgs/thirdSource/yougou.png'),
    'qbao': require('static/imgs/thirdSource/qbao.png'),
  }
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentWillMount() {

    fetchPosts("/stuff/todaylist.do",{},"GET")
      .then(data => {
        this.setState({
            data: data.data
          })
      });
  }

  render() {
    let { data } = this.state
    if (!data){
      return (
        <div styleName="home-no-data">--正在加载--</div>
      )
    }
    let level0s, level1s, level2s
    data.map(function(n,i){
      if(n.level===1){
        level0s = n;
      }
      if(n.level===2){
        level1s = n;
      }
      if(n.level===3){
        level2s = n;
      }
    });
    return (
      <div styleName="home-container">
        <MiddleContainer levelData={level0s} pageName={this.pageName} today modelName="sign_in_buy_products"/>
        <MiddleContainer levelData={level1s} pageName={this.pageName} today modelName="sign_in_view_products"/>
        <ListContainer levelData={level2s} pageName={this.pageName} today modelName="sign_in_list_products"/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(signIn, styles, {allowMultiple: true}));
