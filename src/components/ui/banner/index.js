import React, {Component} from 'react'
import {connect} from 'dva'
import CSSModules from 'react-css-modules'
import styles from './index.less'
import {Link} from 'react-router'
import classNames from 'classnames'
import ReactSwipe from 'react-swipe';

class Banner extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return <div>
      {
        this.props.bannerList.length > 0 ?
          <ReactSwipe styleName="banner-container" swipeOptions={{ continuous: false }}>
          {
            this.props.bannerList.map((item, index) =>
              <div key={index}><a {...this.eventFun(item, index)} href={item.linkUrl}><img src={item.imgUrl} /></a></div>
            )
          }
          </ReactSwipe>
        : ''
      }
      </div>
  }

  eventFun(item, index, stuffMoudId) {
    return {
      'data-event-stuffMoudId': stuffMoudId || this.props.eventConfig.stuffMoudId,
      'data-event-type': 'banner',
      'data-event-id': item.id,
      'data-event-locationId': item.locationId || (index + 1),
      'data-event': 'point'
    }
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    action(type) {
      dispatch({ type });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Banner, styles, {allowMultiple: true}));