import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';

class GoodsIscroll extends Component {

  constructor(props) {
    super(props);
    this.scrollInit = this.scrollInit.bind(this);
  }
  componentWillMount() {
    let _this = this;
    _this.AlloyTouch = false;
    require.ensure([], () => {
       _this.AlloyTouch = require("./alloyTouch.js");
       //_this.$ = require("./zepto.js");
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
      let $ = this.$;
      let goodsNum = this.props.goods.length;
      this.alloyTouch = new this.AlloyTouch({
          touch: dom,//反馈触摸的dom
          target:target,
          vertical: false,//不必需，默认是true代表监听竖直方向touch
          target: target, //运动的对象
          property: "translateX",
          min: (goodsNum * 100 + (goodsNum+1) * 10 - innerWidth) * -1,
          max: 0,
          touchStart: function (value,target) {

          }
      });

  }
  render() {
    var props = this.props;
    return (
      <div className="hots-public-container" ref="touch">
        <div className="hots-public-content">
          <div className="hots-public-warpper" ref="swipe">
            {
              props.goods.map(function(item,i){
                return (<a key={i} className="public-item"><img src={item.src}/></a>)
              })
            }
          </div>
        </div>
      </div>
    )
  }
};
export default GoodsIscroll;
