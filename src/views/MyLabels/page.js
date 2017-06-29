import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun } from 'libs/util';
import GoodsTab from "components/swipe/GoodsTab";
import {Icon,Tabs} from 'ui';
import Swipe from "components/swipe/swipe";
import { fetchPosts } from "components/common/fetch";
import Modal from "components/modal/index";
import PopUp from "components/popup/index";

class MyLabels extends Component {
  headimg = require('static/imgs/special/front.png');
  bannerpic = require('static/imgs/gatherGoods/banner.png');
  tabsConfig = {
    names : [
      {
        key:'专属个性',
        action: 'getLabelsList'
      },
      {
        key:'购物DNA',
        action: 'getDNALabelsList'
      }

    ], //required
    model : 'gatherGoods',
    statusKey : 'tabActive'             //the statusKey in the model, default 'tabActive'
  }
  constructor(props) {
    super(props)
    let infoDatas ={};// this.props.location && this.props.location.state.infos;
    console.log(infoDatas);

    this.state = {
        // navActive: 0,
        // productList:[],
        isLoading: false
    }
    this.restHandler = this.restHandler.bind(this);
    this.enterHandler = this.enterHandler.bind(this);
    this.handNavClick = this.handNavClick.bind(this);
    this.handItemClick = this.handItemClick.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  touchMove(that,args){
      let {items,isEnd} = this.state;
      let cTop = args[0];

      if(that.min-args[0]>30 && !isEnd){
          this.getData(1);
      }
  }
  enterHandler(){
    let {editThemeIds} = this.props;
    let {isLoading} = this.state;
    let _this = this;
    if(isLoading){
        return;
    }
    this.setState({
        isLoading:true
    })
    if(editThemeIds.length > 0){
      return fetchPosts("/stuff/theme/update.do",{ themeIds: editThemeIds.join(",") },"GET")
        .then((data)=>{
            if(data.responseCode===1000){
              Modal.alert("提示", "保存成功" );
              _this.setState({
                  isLoading:false
              });
            }else{
              Modal.alert("提示", "保存失败" );
              _this.setState({
                  isLoading:false
              });
            }
         }).catch(function(){
           Modal.alert("提示", "网络异常" );
                    _this.setState({
                        isLoading:false});
         });
    }
  }
  restHandler(){
    this.props.setNavRest();
  }
  handNavClick(event){
      let className = event.target.className;
      let index = parseInt(event.target.dataset.index,10);

      if(className.indexOf('mylabel-navs-active') > -1){
          return;
      }
      if(className === "mylabel-navs"){
        console.log("index: " ,index);
          this.props.setNavActive(index);
      }
  }
  handItemClick(event){
    let className = event.target.className;
    let index = parseInt(event.target.dataset.index,10);

    if(className.indexOf('mylabel-navs-item') > -1){
      this.props.setNavItemCheck(index);
    }
  }
  render() {

    let props = {
        property:"translateY",
        className:"scroll-warpper",
        tag:"ul",
        min:"auto",
        stopPro:false,
        vertical:true,
        touchMove:this.touchMove
    }
    let navitems = [];
    if(this.props.productList&&this.props.productList.length>0){
      navitems = this.props.productList[this.props.navActive].items;
    }
    return (
      <div>
        <div className="special-labels-container">
          <Swipe  {...props} >
            <Tabs
              tabsConfig={this.tabsConfig}
              eventConfig={{
                pageName: '101',
                model: 'gather_goods_tab'
              }}/>
            <div className="special-labels-warpper">
              <div className="special-labels-left" onClick={this.handNavClick}>
                {
                  this.props.productList.map((item, index) =>
                     <div styleName={classNames({"mylabel-navs":true ,"mylabel-navs-active": this.props.navActive===index })} key={index} data-index={index}>{item.theme}</div>
                  )
                }
              </div>
              <div className="special-labels-right" onClick={this.handItemClick}>
                {
                  navitems.map((item, index) =>
                     <div styleName={classNames({"mylabel-navs-item":true ,"mylabel-navs-item-active": item.check })} key={index} data-index={index}>{item.name}</div>
                  )
                }
            </div>
            </div>
          </Swipe>
        </div>
        <div className="special-labels-footer">
          <div className="special-labels-rest" onClick={this.restHandler}>重置</div>
          <div className="special-labels-enter" onClick={this.enterHandler}>确定</div>
        </div>
      </div>
    )
  }
};
MyLabels.contextTypes = {
  router: React.PropTypes.object.isRequired
};
MyLabels.defaultProps = {
  infoUrl: "/stuff/detail.do",
  infoDatas:{
    brandName:"",
    offSale:"",
    imgUrl:""
  },
  pageSize: 8
}
function mapStateToProps(state) {
  return state.gatherGoods;
}

function mapDispatchToProps(dispatch) {
  return {
    setNavItemCheck: function(index){
      dispatch({type:"gatherGoods/setNavItemCheck",index: index});
    },
    setNavActive: function(act){
      dispatch({type:"gatherGoods/navAct",active:act});
    },
    setNavRest: function(){
      dispatch({type:"gatherGoods/navRest"});
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(MyLabels, styles, {allowMultiple: true}));
