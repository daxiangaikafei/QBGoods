import React, {Component} from 'react'
import {connect} from 'dva'
import CSSModules from 'react-css-modules'
import styles from './index.less'
import {Link} from 'react-router'
import classNames from 'classnames'
import ReactSwipe from 'react-swipe';
import { eventFun } from 'libs/util'

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
              <div key={index}><a {...eventFun(pageName, model, item.id)} href={item.linkUrl}><img src={item.imgUrl} /></a></div>
            )
          }
          </ReactSwipe>
        : ''
      }
      </div>
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
