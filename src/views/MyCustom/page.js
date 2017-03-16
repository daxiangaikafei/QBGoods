import React,{ Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import classNames from 'classnames'
import {Router} from 'dva/router';
import { fetchPosts } from "components/common/fetch"
import ShopContent from "./ShopContent";
import SelfContent from "./SelfContent";
import Modal from "components/modal/index";
import PopUp from "components/popup/index";

class MyCustom extends Component {

  constructor(props) {
    super(props)
    props.getShopLists();

    this.state = {
        isLoading: false
    }
    this.sendData = this.sendData.bind(this);
  }
  componentDidMount() {

  }

  componentDidUpdate() {

  }
  tabClickHandler(active){
    this.props.setTabActive(active);
  }
  enterHandler(){


    let tagDetailIds = [];
    let shopLabels = this.props.shopLabels;
    this.props.shopLabelsDefault.map((item,i) => {
      if(shopLabels[i].check !== item.check){
        tagDetailIds.push(item.tagDetailId);
      }
    });

    let tagSelfDetailIds = [];
    let selfLabels = this.props.selfLabels;
    this.props.selfLabelsDefault.map((item,i) => {
      if(selfLabels[i].check !== item.check){
        tagSelfDetailIds.push(item.tagDetailId);
      }
    });
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

              Modal.alert("提示", _this.props.tabActive === "shop" ? "个人标签保存成功" : "购物标签保存成功" );

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
            Modal.alert("提示", _this.props.tabActive === "shop" ? "个人标签保存失败" : "购物标签保存失败" );
                _this.setState({
                    isLoading:false,});
     });
  }
  changeHandler(){
    this.context.router.goBack();
  }
  render() {
    let customcontent;
    if (this.props.tabActive === "shop") {
      customcontent = <ShopContent/>;
    } else {
      customcontent = <SelfContent  />;
    }
    return (
      <div className="mycustom-container">
        <div className="mycustom-tab">
          <div className={this.props.tabActive === "shop" ? 'mycustom-active' : ''} onTouchStart={this.tabClickHandler.bind(this,'shop')}>个人标签</div>
          <div className={this.props.tabActive === "self" ? 'mycustom-active' : ''} onTouchStart={this.tabClickHandler.bind(this,'self')}>购物标签</div>
        </div>
        {customcontent}
        <div className="mycustom-btns">
          <button className="btn-change" onTouchStart={this.changeHandler.bind(this)}>取消</button>
          <button className="btn-enter" onTouchStart={this.enterHandler.bind(this)}>确定</button>
        </div>
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
