import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import classNames from 'classnames'
import { connect } from 'dva'

let noimg = require('static/imgs/hotgoods/noimg.png');

class ShopContent extends Component {

  constructor(props) {
    super(props);
    this.scrollInit = this.scrollInit.bind(this);
  }
  componentDidMount() {
    let _this = this;
    // _this.AlloyTouch = false;
    // require.ensure([], () => {
    //    _this.AlloyTouch = require("components/swipe/alloyTouch.js");
    //    _this.$ = require("components/swipe/zepto.js");
    // })
  }
  componentDidMount(){
      let _this = this;
      // if(_this.AlloyTouch){
      //     _this.scrollInit()
      // }else{
      //     require.ensure([], () => {
      //        _this.AlloyTouch = require("components/swipe/alloyTouch.js");
      //        _this.$ = require("components/swipe/zepto");
      //        _this.scrollInit();
      //     })
      // }
  }
  componentWillUnmount(){
      this.alloyTouch&&this.alloyTouch.destory();
  }
  scrollInit(){
      let $ = this.$;

      let dom = ReactDOM.findDOMNode(this.refs.touch); //offsetTop
      let target = ReactDOM.findDOMNode(this.refs.swipe);
      let {property,width,min,max,step,findScroller,vertical,findDis} = this.props;
      let prevTarget = false;

      let showH =  innerHeight - 94; //78
      $(dom).height(showH);

      let listHeight = $(target).height() - showH + 78;

      this.alloyTouch = new this.AlloyTouch({
          touch: dom,//反馈触摸的dom
          target:target,
          vertical: true,//不必需，默认是true代表监听竖直方向touch
          target: target, //运动的对象
          property: "translateY",
          min: listHeight * -1,
          max: 0,
          touchStart: function (value,target) {

          }
      });

  }
  labelClickHandler(item , index){
    // if(!item.check){
    //   this.props.editTip( item.name, item.count   );
    // }
    this.props.editLabelSelected(index , !item.check);

    console.log(this.props.shopLabels, this.props.shopLabelsDefault );
  }
  render() {
    return (
      <div className="shop-content" ref="touch">
        <div className="shop-list" ref="swipe">
          {
            this.props.shopLabels.map(
              (item, i) =>
                <div key={i} onTouchStart={this.labelClickHandler.bind(this, item, i)} className={item.check ? 'shop-item selected' : 'shop-item'}>
                  <div className="img-mask">

                    {item.icon == "http://" || item.icon == "" || !tem.icon ? <img src={noimg}/>: <img src={item.icon}/>}
                    <div className="mask"></div>
                    <div className="border"></div>
                  </div>
                  <div className="icon-selected"></div>
                  <div className="shop-name">{item.name}</div>
                </div>
            )
          }
        </div>
        <p className={this.props.shopTipShow ? 'shop-tip shop-tip-show' : 'shop-tip'}>
          与你购物喜好相似的人有<span>{this.props.shopTipNum}</span>人
        </p>
      </div>
    )
  }
};

function mapStateToProps(state) {
    return state.mycustom;
}
function mapDispatchToProps(dispatch) {
    return {
      editTip: function(label, num){
        dispatch({type:"mycustom/editTipShow", label: label, num: num});
      },
      editLabelSelected: function(index , check){
        dispatch({type:"mycustom/editLabelSelected", index: index , check: check});
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShopContent);
