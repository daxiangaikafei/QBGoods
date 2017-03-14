import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import Tappable from 'react-tappable';

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
  }
  componentWillUnmount(){
      this.alloyTouch&&this.alloyTouch.destory();
  }
  scrollInit(){
      let dom = ReactDOM.findDOMNode(this.refs.touch); //offsetTop
      let target = ReactDOM.findDOMNode(this.refs.swipe);
      let {property,width,min,max,step,findScroller,vertical,findDis} = this.props;
      let prevTarget = false;
      //let $ = this.$;
      let goodsNum = this.props.tabs.length;
      let touchMin = goodsNum * 60+10 <= innerWidth ? 0 : (goodsNum * 60 +10- innerWidth) * -1;
      this.alloyTouch = new this.AlloyTouch({
          touch: dom,//反馈触摸的dom
          target:target,
          vertical: false,//不必需，默认是true代表监听竖直方向touch
          target: target, //运动的对象
          property: "translateX",
          min: touchMin,
          max: 0,
          touchStart: function (value,target) {

          }
      });

  }
  tabsClickHandler(active){
    // console.log(active);
    this.props.tabCallback(active);
  }
  render() {
    return (
      <div className="hots-tabs-container" ref="touch">
        <div className="hots-tabs-content">
          <div className="hots-tabs-warpper" ref="swipe">
            {
              this.props.tabs.map((item, i) => <Tappable onTap={this.tabsClickHandler.bind(this,i)} key={i} className={this.props.active == i ? 'tabs-item tabs-item-active' : 'tabs-item'}><span>{item.dirName}</span></Tappable>)
            }
          </div>
        </div>
      </div>
    )
  }
};
export default GoodsTab;
