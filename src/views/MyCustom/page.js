import React,{ Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import classNames from 'classnames'
import {Router} from 'dva/router';
import { fetchPosts } from "components/common/fetch"
import ShopContent from "./ShopContent";
import SelfContent from "./SelfContent";
import MycustomTap from "./MycustomTap";
import MycustomBtns from "./MycustomBtns";
import MycustomTip from "./MycustomTip";
import Modal from "components/modal/index";
import PopUp from "components/popup/index";
import Swipe from "components/swipe/swipe";
import { eventFun } from 'libs/util';

class MyCustom extends Component {

  constructor(props) {
    super(props)
    props.getShopLists();

    this.state = {
        isLoading: false
    }
    this.sendData = this.sendData.bind(this);
    this.tabCallback = this.tabCallback.bind(this);
    this.changeCallback = this.changeCallback.bind(this);
    this.enterCallback = this.enterCallback.bind(this);
  }
  componentDidMount() {

  }

  componentDidUpdate() {

  }
  tabCallback(active){
    this.props.setTabActive(active);
  }
  enterCallback(){


    let tagDetailIds = [];
    let shopLabels = this.props.shopLabels;
    shopLabels.map((item,i) => {
      if(item.check){
        tagDetailIds.push(item.tagDetailId);
      }
    });

    let tagSelfDetailIds = [];
    let selfLabels = this.props.selfLabels;
    selfLabels.map((item,i) => {
      if(item.check){
        tagSelfDetailIds.push(item.tagDetailId);
      }
    });
    // this.props.selfLabelsDefault.map((item,i) => {
    //   if(selfLabels[i].check !== item.check){
    //     tagSelfDetailIds.push(item.tagDetailId);
    //   }
    // });
    // this.props.saveLabels(tagDetailIds.join(","), tagSelfDetailIds.join(",") );
    //{ typeId: 1 ,tagDetailIds: action.tagDetailIds }
    let that = this;
    this.sendData({
      typeId: that.props.tabActive === "shop" ? 1: 2,
      tagDetailIds:that.props.tabActive === "shop" ? tagDetailIds: tagSelfDetailIds,
    });
  }
  infoClose(){
      // PopUp.hide();
  }
  sendData(searchParam){
    let {isLoading} = this.state;
    if(isLoading){
        return;
    }
    this.setState({
        isLoading:true
    })
    let _this = this;
    let param = Object.assign({},{typeId: 1},searchParam);

    return fetchPosts("/stuff/custom/updateUserTags.do",param,"GET").then((data)=>{
            if(data.responseCode===1000){

              Modal.alert("提示", _this.props.tabActive === "shop" ? "购物标签保存成功" : "个人标签保存成功" );

              if(_this.props.tabActive === "shop"){
                _this.props.setDefaultShopDatas();
              }else{
                _this.props.setDefaultSelfDatas();
              }
              _this.setState({
                 isLoading:false});
            }else{
                 _this.setState({
                    isLoading:false});
            }
     }).catch(function(){
            Modal.alert("提示", _this.props.tabActive === "shop" ? "购物标签保存失败" : "个人标签保存失败" );
                _this.setState({
                    isLoading:false,});
     });
  }
  changeCallback(){
    // this.context.router.goBack();
    let tagDetailIds = [];
    let shopLabels = this.props.shopLabelsDefault;
    shopLabels.map((item,i) => {
      if(item.check){
        tagDetailIds.push(item.tagDetailId);
      }
    });

    let tagSelfDetailIds = [];
    let selfLabels = this.props.selfLabelsDefault;
    selfLabels.map((item,i) => {
      if(item.check){
        tagSelfDetailIds.push(item.tagDetailId);
      }
    });

    if(this.props.tabActive === "shop"){
      this.props.setNowShopDatas();
    }else{
      this.props.setNowSelfDatas();
    }
    return;
  }
  render() {
    let props = {
        property:"translateY",
        className:"scroll-warpper",
        tag:"ul",
        min:"auto",
        stopPro:false,
        vertical:true,
        // touchMove:this.touchMove
        //step:200
    }
    let tipProps = {
      selfTipShow: this.props.selfTipShow ,
      selfTipNum: this.props.selfTipNum ,
      shopTipShow: this.props.shopTipShow ,
      shopTipNum: this.props.shopTipNum
    }
    return (
      <div className="mycustom-container">
        <MycustomTap tabActive={this.props.tabActive} tabCallback={this.tabCallback}/>
        {
          this.props.tabActive === "shop" ? <ShopContent/> : <SelfContent  />
        }
        <MycustomTip {...tipProps}/>
        <MycustomBtns changeCallback={this.changeCallback} enterCallback={this.enterCallback}/>
      </div>
    )
  }
};
MyCustom.contextTypes = {
  router: React.PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return state.mycustom;
}

function mapDispatchToProps(dispatch) {
    return {
      setNowShopDatas: function(){
        dispatch({type: 'mycustom/setNowShopDatas' });
      },
      setNowSelfDatas: function(){
        dispatch({type: 'mycustom/setNowSelfDatas' });
      },
      setDefaultShopDatas: function(){
        dispatch({type: 'mycustom/setDefaultShopDatas' });
      },
      setDefaultSelfDatas: function(){
        dispatch({type: 'mycustom/setDefaultSelfDatas' });
      },
      getShopLists: function(act){
          dispatch({type: 'mycustom/getShopLabels' });
      },
      setTabActive: function(act){
        dispatch({type: "mycustom/tabAct",active:act});
      },
      saveLabels: function(ids, selfIds){
        dispatch({type: "mycustom/saveLabels", tagDetailIds: ids , tagSelfDetailIds: selfIds});
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(MyCustom,styles,{allowMultiple:true}));
