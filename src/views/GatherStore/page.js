import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import ReactSwipe from 'react-swipe';

class GatherStore extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }
    props.getStoreList()
    props.getBannerList(24)
  }

  render() {
    return (
      <div styleName="home-container">
        {
          this.props.bannerList.length > 0 ?
          <ReactSwipe styleName="banner-container" swipeOptions={{ continuous: false, callback: this.swiperCallback }}>
          {
            this.props.bannerList.map((item, index) =>
              <div key={index}><a href={item.linkUrl}><img src={item.imgUrl} /></a></div>
            )
          }
          </ReactSwipe>
          : ''
        }
        <div styleName="title">精选好店</div>
        <div styleName="list-container">
        {
          this.props.storeList.map((shop, index) => 
            <div styleName="item" key={index}>
              <div styleName="header">
                <img src={shop.shopCover} alt=""/>
                <div styleName="info">
                  <h3>{shop.name}</h3>
                  <p>
                    {/*<span><i></i>10赞</span>*/}
                    <a styleName="goin" href={shop.shopUrl}>进店 <i>></i></a>
                  </p>
                </div>
              </div>
              <div styleName="bottom">
              {
                shop.ad_stuff.map((stuff, index) => 
                  <div key={index}>
                    <img src={stuff.imgUrl} alt="" />
                  </div>
                ) 
              }
              </div>
            </div>
          )
        }
        </div>
      </div>
    )
  }

};

function mapStateToProps(state) {
  return state.gatherStore;
}

function mapDispatchToProps(dispatch) {
  return {
    getStoreList() {
      dispatch({ type: 'gatherStore/getStoreList' });
    },
    getBannerList(id) {
      dispatch({ type: 'gatherStore/getBannerList', id });
    }
  }
}

GatherStore.PropTypes = {
  enterAnimation: {
    duration: 2000,
    animation: 'slideDown'
  },
  leaveAnimation: {
    duration: 2000,
    animation: 'slideUp'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(GatherStore, styles, {allowMultiple: true}));