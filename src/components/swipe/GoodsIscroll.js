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
    // (<a key={i} href={item.link_url} className="hots-public-item">
    //   <img className="hots-public-item-img" src={item.img_url}/>
    //   <p className="hots-public-item-name">{item.name}</p>
    // </a>)
    return (
      <div className="hots-public-container" ref="touch">
        <div className="hots-public-content">
          <div className="hots-public-warpper" ref="swipe">
            {
              props.goods.map(function(item,index){
                return (<div className="hots-public-item" key={index}>
                    <a href={item.linkUrl} ><img src={item.imgUrl} alt="" className="hots-public-item-img" /></a>
                    <a href={item.linkUrl} ><h3>{item.name}</h3></a>
                    <div className="price">￥{item.reservePrice}
                        <span className="icon"></span>
                    </div>
                    <div className="bottom">
                        <span className="return">返{item.rebateValue}宝券</span>
                    </div>
                </div>)
              })
            }
          </div>
        </div>
      </div>
    )
  }
};
export default GoodsIscroll;