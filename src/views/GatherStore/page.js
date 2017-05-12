import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import ReactSwipe from 'react-swipe';
import { Banner } from 'ui'
import { eventFun } from 'libs/util'
import ListContainer from "./ListContainer";

class GatherStore extends Component {
  pageName = '104'
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

        <ListContainer storeList={this.props.storeList}/>
      </div>
    )
  }
  // eventFun(model, id, index) {
  //   return {
  //     'data-event-model': model,
  //     'data-event-type': 'page',
  //     'data-event-id': id || (index + 1),
  //     'data-event-pageName': 101,
  //   }
  // }
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
