import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import Tappable from 'react-tappable';
import styles from './tabs.less';
import classNames from 'classnames'
import CSSModules from 'react-css-modules'
import { eventFun } from 'libs/util';

let isInit =true;
class GoodsTab extends Component {
  constructor(props) {
    super(props);
    this.scrollInit = this.scrollInit.bind(this);
  }
  componentWillMount() {
    let _this = this;
    _this.AlloyTouch = false;
    require.ensure([], () => {
       _this.AlloyTouch = require("./alloyTouch.js");
      // _this.$ = require("./zepto.js");
    })
  }
  componentDidMount(){
      let _this = this;
      if(_this.AlloyTouch){
          _this.scrollInit()
      }else{
          require.ensure([], () => {
             _this.AlloyTouch = require("./alloyTouch.js");
             //_this.$ = require("./zepto");
             _this.scrollInit();
          })
      }
      if(isInit){
        isInit = false;
        this.props.tabCallback(0);
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
          vertical: false,//不必需，默认是true代表监听竖直方向touch
          target: target, //运动的对象
          property: "translateX",
          min: touchMin <= innerWidth ? 0 : (touchMin - targetparent.clientWidth) * -1,
          max: 0,
          touchStart: (value,target) => {
            // if(!this.moveTarget) {
            //   this.moveTarget = target
            // }
          },
          touchMove: () => {
            setTimeout(() =>  {
              target.style.transform = target.style.transform.replace(/500px/i, '0')
            }, 300);
          },
          touchEnd: () => {
            setTimeout(() =>  {
              target.style.transform = target.style.transform.replace(/500px/i, '0')
            }, 2000);
          }
      });
      setTimeout(() =>  {
        target.style.transform = target.style.transform.replace(/500px/i, '0')
      }, 300);


  }
  tabsClickHandler(active){
    // console.log(active);
    this.props.tabCallback && this.props.tabCallback(active);
  }
  render() {
    let tabs = this.props.tabs || [];
    let active = this.props.active || 0;
    console.log("active.....",active);
    let { pageName, model } = this.props.eventConfig;
    return (
      <div styleName="hots-tabs-container" ref="touch">
        <div styleName="hots-tabs-content" ref="swipeparent">
          <div styleName="hots-tabs-warpper" ref="swipe" >
            {
              this.props.tabs.map((item, i) => <div {...eventFun(pageName, model, item.id)}  onClick={this.tabsClickHandler.bind(this,i)} key={i} styleName={active == i ? 'tabs-item tabs-item-active' : 'tabs-item'}><span>{item.dirName || item.name}</span></div>)
            }
          </div>
        </div>
      </div>
    )
  }
};
GoodsTab.defaultProps = {
    isInit: true
}
export default CSSModules(GoodsTab, styles, { allowMultiple: true });
