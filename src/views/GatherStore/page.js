import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import ReactSwipe from 'react-swipe';
import { Banner } from 'ui'

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
        <Banner bannerList={this.props.bannerList} 
          eventConfig={{
            stuffMoudId: 4
        }}/>

        <div styleName="title">精选好店</div>
        <div styleName="list-container">
        {
          this.props.storeList.map((shop, index) => 
            <div styleName="item" key={index}>
              <div styleName="header">
                <img src={shop.coverUrl} alt=""/>
                <div styleName="info">
                  <h3>{shop.name}</h3>
                  <p>
                    {/*<span><i></i>10赞</span>*/}
                    <a {...this.eventFun(shop, index)} styleName="goin" href={shop.url}>进店 <i>></i></a>
                  </p>
                </div>
              </div>
              <div styleName="bottom">
              {
                shop.list.map((stuff, index) => 
                  <a key={index} href={stuff.url}>
                    <img src={stuff.imgUrl} alt="" />
                  </a>
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
  eventFun(item, index) {
    return {
      'data-event-stuffMoudId': 4,
      'data-event-type': 'shop',
      'data-event-id': item.id,
      'data-event-locationId': item.locationId || (index + 1),
      'data-event-source': item.source,
      'data-event': 'point'
    }
  }
}

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