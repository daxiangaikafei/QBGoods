import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'

class GatherStore extends Component {
  

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div styleName="home-container">
        <div styleName="banner-container">
          <img src={require("static/imgs/gatherGoods/banner.png")} alt=""/>
        </div>
        
      </div>
    )
  }

};

function mapStateToProps(state) {
  return state.gatherGoods;
}

function mapDispatchToProps(dispatch) {
  return {
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