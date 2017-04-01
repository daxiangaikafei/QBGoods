import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './channelEntry.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import ReactSwipe from 'react-swipe';
import { priceFormat, eventFun } from 'libs/util'
import { fetchPosts } from "components/common/fetch"

class bannerDetail extends Component {
  pageName = '108'
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
      bannerId: props.params.id
    }
  }

  componentWillMount() {
    var state = this.state;
    fetchPosts("/stuff/ad/banner/detail.do",{ id: state.bannerId },"GET")
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
      return;
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
        <div styleName="middle-title">{level0s.title}</div>
        <div styleName="middle-container">
          {/*style={{ width: `${140 * level0s.stuffs.length}px`}}*/}
          <div styleName="list" style={{ width: `${140 * level0s.stuffs.length}px`}}>
            {level0s.stuffs.map((item, index) =>
              <div styleName="item" key={index}>
                <a {...eventFun(this.pageName,'channel_entry_ad_products',item.id)} styleName="img" href={item.url} ><img src={item.imgUrl} alt="" /></a>
                <a {...eventFun(this.pageName,'channel_entry_ad_products',item.id)} href={item.url} ><h3>{item.name}</h3></a>
                <div styleName="price">￥{priceFormat(item.finalPrice)}
                  <span styleName="icon"><img src={this.icons[item.source]} alt=""/></span>
                </div>
                <div styleName="bottom">
                  <span styleName="return">{item.rebateValue}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div styleName="middle-title" style={{marginTop:'10px'}}>{level1s.title}</div>
        <div styleName="list-container nomore">
          {level1s.stuffs.map((item, index) =>
            <div styleName="item" key={index}>
              <a {...eventFun(this.pageName,'channel_entry_list_products',item.id)} styleName="img" href={item.url} ><img src={item.imgUrl} alt="" /></a>
              <div styleName="right">
                <a {...eventFun(this.pageName,'channel_entry_list_products',item.id)} href={item.url} ><h3>{item.name}</h3></a>
                <div styleName="bottom">
                  <div styleName="price">￥{priceFormat(item.finalPrice)}
                    <span styleName="icon"><img src={this.icons[item.source]} alt="" /></span>
                  </div>
                  <span styleName="return">
                    {item.rebateValue}
                    {item.orderNum != null ? <p styleName="sales">销量 <span>{item.orderNum}</span></p> : ''}
                  </span>
                  <a {...eventFun(this.pageName,'channel_entry_list_products',item.id,)} styleName="btn-buy" href={item.url}>马上购买</a>
                </div>
              </div>
            </div>
          )}
        </div>
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
