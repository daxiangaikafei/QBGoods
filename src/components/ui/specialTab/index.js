import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import Tappable from 'react-tappable';
import styles from './index.less'
import { eventFun } from 'libs/util';
import Icon from "../icon"

class specialTab extends Component {

  constructor(props) {
    super(props);
    this.scrollInit = this.scrollInit.bind(this);
  }
  componentWillMount() {
    let _this = this;
    _this.AlloyTouch = false;
    require.ensure([], () => {
       _this.AlloyTouch = require("components/swipe/alloyTouch.js");
      // _this.$ = require("./zepto.js");
    })
  }
  componentDidMount(){
      let _this = this;
      if(_this.AlloyTouch){
          _this.scrollInit()
      }else{
          require.ensure([], () => {
             _this.AlloyTouch = require("components/swipe/alloyTouch.js");
             //_this.$ = require("./zepto");
             _this.scrollInit();
          })
      }
  }
  componentWillUnmount(){
      this.alloyTouch&&this.alloyTouch.destory();
  }
  componentDidUpdate(prevProps,prevState){
    // console.log("this.props.tabs",this.props.tabs);
  }
  scrollInit(){
      let dom = ReactDOM.findDOMNode(this.refs.touch); //offsetTop
      let target = ReactDOM.findDOMNode(this.refs.swipe);
      let targetparent = ReactDOM.findDOMNode(this.refs.swipeparent);
      let {property,width,min,max,step,findScroller,vertical,findDis} = this.props;
      let prevTarget = false;
      //let $ = this.$;
      let goodsNum = this.props.tabs.length;
      let touchMin = 0;

      let childrensT = target.children;
      for(let i = 0; i < childrensT.length; i++){
        touchMin += childrensT[i].clientWidth;
      }
      // console.log(innerWidth, "dom", ReactDOM.findDOMNode(this.refs.swipeparent).clientWidth);
      // childrensT.map(function(n,i){
      //   console.log(n.clientWidth);
      // });
      this.alloyTouch = new this.AlloyTouch({
          touch: dom,//反馈触摸的dom
          target:target,
          vertical: false,//不必需，默认是true代表监听竖直方向touch
          target: target, //运动的对象
          property: "translateX",
          min: touchMin <= innerWidth ? 0 : (touchMin - innerWidth) * -1,
          max: 0,
          touchStart: function (value,target) {

          }
      });


  }
  tabsClickHandler(active){
    // console.log(active);
    this.props.tabCallback && this.props.tabCallback(active);

    let anchorElement = document.getElementById("stuffs"+active);
    if(anchorElement) { anchorElement.scrollIntoView(); }

  }
  render() {
    let tabs = this.props.tabs || [];
    let active = this.props.active || 0;
    let { pageName, model } = this.props.eventConfig;
    return (
      <div className="hots-tabs-container" ref="touch">
        <div className="hots-tabs-content" ref="swipeparent">
          <div className="hots-tabs-warpper" ref="swipe">
            {
              this.props.tabs.map((item, i) => <Tappable {...eventFun(pageName, model, item.id)}  onTap={this.tabsClickHandler.bind(this,i)} key={i} className={active == i ? 'tabs-item tabs-item-active' : 'tabs-item'}><span><Icon className="tab-hot-icon" name="location" color={active == i ? '#fd472b' : '#ffffff'} size="18"/>{item.name}</span></Tappable>)
            }
          </div>
        </div>
      </div>
    )
  }
};
export default specialTab;
