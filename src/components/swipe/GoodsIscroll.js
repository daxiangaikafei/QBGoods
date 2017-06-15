import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat,eventFun } from 'libs/util'
import styles from './GoodsIscroll.less'

class GoodsIscroll extends Component {

  constructor(props) {
    super(props);
    // this.scrollInit = this.scrollInit.bind(this);
  }
  componentWillMount() {
    // let _this = this;
    // _this.AlloyTouch = false;
    // require.ensure([], () => {
    //    _this.AlloyTouch = require("./alloyTouch.js");
    //    //_this.$ = require("./zepto.js");
    // })
  }
  componentDidMount(){
      // let _this = this;
      // if(_this.AlloyTouch){
      //     _this.scrollInit()
      // }else{
      //     require.ensure([], () => {
      //        _this.AlloyTouch = require("./alloyTouch.js");
      //        //_this.$ = require("./zepto");
      //        _this.scrollInit();
      //     })
      // }
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
          min: (goodsNum * 100 + (goodsNum+1) * 5 - innerWidth) * -1,
          max: 0,
          touchStart: function (value,target) {

          }
      });

  }
  render() {
    var props = this.props, itemTpl = '';
    switch (props.type) {
      case "nine":
        itemTpl = props.goods.map(function(item,index){
                  return (<div className="hots-public-item" key={index}>
                      <a {...eventFun("102", "hot_goods_koubei_products", item.id)}  href={'newtab://goodstuff.qbao.com/goods?url=' + item.url} className="hots-public-item-a-img" ><img src={item.imgUrl} alt="" className="hots-public-item-img" /></a>
                      <a {...eventFun("102", "hot_goods_koubei_products", item.id)}  href={'newtab://goodstuff.qbao.com/goods?url=' + item.url} ><h3>{item.name}</h3></a>
                      <div className="price">￥{item.finalPrice}<div className="icon"><i className={item.source}></i></div></div>
                  </div>)
                });
        break;
      default:
        itemTpl = props.goods.map(function(item,index){
                    return (<div className="hots-public-item" key={index}>
                        <a {...eventFun("102", "hot_goods_koubei_products", item.id)}  href={'newtab://goodstuff.qbao.com/goods?url=' + item.url} ><img src={item.imgUrl} alt="" className="hots-public-item-img" /></a>
                        <a {...eventFun("102", "hot_goods_koubei_products", item.id)}  href={'newtab://goodstuff.qbao.com/goods?url=' + item.url} ><h3>{item.name}</h3></a>
                        <div className="price">￥{item.finalPrice}<div className="icon"><i className={item.source}></i></div></div>
                        <div className="bottom public-rebateValue">
                            <span className="return">{item.rebateValue}</span>
                        </div>
                    </div>)
                  });
    }
    return (
      <div styleName={classNames({"hots-public-container":true,"type-nine": (this.props.type==="nine")  })} ref="touch">
        <div className="hots-public-content">
          <div className="hots-public-warpper" ref="swipe" style={{ width: `${110 * props.goods.length}px`}}>
            { itemTpl }
          </div>
        </div>
      </div>
    )
  }
};
export default CSSModules(GoodsIscroll,styles,{allowMultiple:true});
