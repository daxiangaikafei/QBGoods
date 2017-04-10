import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import classNames from 'classnames'
import { connect } from 'dva'
import Tappable from 'react-tappable';
import Swipe from "components/swipe/swipe";
import { eventFun } from 'libs/util';

class MycustomTap extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  tabClickHandler(active){

    this.props.tabCallback(active);
  }
  render() {
    var props = this.props;
    return (
      <div className="mycustom-tab">
        <div {...eventFun("105", 'my_custom_tab', "1")} className={this.props.tabActive === "shop" ? 'mycustom-active' : ''} onTouchStart={this.tabClickHandler.bind(this,'shop')}>购物标签</div>
        <div {...eventFun("105", 'my_custom_tab', "2")} className={this.props.tabActive === "self" ? 'mycustom-active' : ''} onTouchStart={this.tabClickHandler.bind(this,'self')}>个人标签</div>
      </div>
    )
  }
};
export default MycustomTap;
