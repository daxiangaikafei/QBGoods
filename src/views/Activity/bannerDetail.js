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

class bannerDetail extends Component {
  pageName = '108'

  constructor(props) {
    super(props)
    this.state = {
      bannerId: props.params.id
    }
  }

  componentWillMount() {
    var state = this.state;
    fetchPosts("/stuff/ad/banner/detail.do",{ bannerId : state.bannerId },"GET")
      .then(data => {
        document.title = data.data.name;
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
    let level0s  = { title:"", stuffs:[]} ,level1s = level0s;
    data.details.map(function(n,i){
      if(n.level===1){
        level0s = n;
      }
      if(n.level===2){
        level1s = n;
      }
    });

    return (
      <div styleName="home-container">
        <ReactSwipe styleName="banner-container" swipeOptions={{ continuous: false }}>
          <div><img src={ data.imgURL } /></div>
        </ReactSwipe>
        <MiddleContainer levelData={level0s} pageName={this.pageName} modelName="channel_entry_ad_products"/>
        <ListContainer levelData={level1s} pageName={this.pageName} modelName="channel_entry_list_products"/>
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

bannerDetail.PropTypes = {
  enterAnimation: {
    duration: 2000,
    animation: 'slideDown'
  },
  leaveAnimation: {
    duration: 2000,
    animation: 'slideUp'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(bannerDetail, styles, {allowMultiple: true}));
