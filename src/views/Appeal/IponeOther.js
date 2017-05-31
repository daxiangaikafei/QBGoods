import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import classNames from 'classnames'
import ReactSwipe from 'react-swipe';

class IponeOther extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }
  componentDidUpdate() {

  }
  render() {

    return (
      <div className="IponeOther-container">
        <input id="IponeOtherText" type="text" ref="IponeOtherText" maxLength="10"/>
      </div>
    )
  }
};
export default CSSModules(IponeOther,styles,{allowMultiple:true});
