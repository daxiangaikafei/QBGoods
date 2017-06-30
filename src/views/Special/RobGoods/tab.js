import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import classNames from 'classnames'
import CSSModules from 'react-css-modules'
import { eventFun } from 'libs/util';

class Tab extends Component {

  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentDidMount(){

  }
  componentWillUnmount(){
  }
  componentDidUpdate(prevProps,prevState){
    // console.log("this.props.tabs",this.props.tabs);
  }
  tabsClickHandler(active){
    // console.log(active);
    this.props.tabCallback && this.props.tabCallback(active);
  }
  // shouldComponentUpdate(nextProps, nextState){
    // if(this.props.active != nextProps.active){
    //   return true;
    // }
    // return false;
  // }
  render() {
    let tabs = this.props.tabs || [];
    let active = this.props.active || 0;
    return (
      <div className="rob-tabs-warpper" >
        {
          this.props.tabs.map((item, i) => <div onClick={this.tabsClickHandler.bind(this,i)} key={i} className={active == i ? 'tabs-item tabs-item-active' : 'tabs-item'}><p>{item.onTime}</p><p>{item.isStart ? "已经开始" : "即将开始"}</p></div>)
        }
      </div>
    )
  }
};
Tab.defaultProps = {
    isInit: true
}
export default Tab;
