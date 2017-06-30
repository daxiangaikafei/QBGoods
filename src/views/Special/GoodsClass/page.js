import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun } from 'libs/util';
import GoodsTab from "components/swipe/GoodsTab";
import Swipe from "components/swipe/swipe";
import { fetchPosts } from "components/common/fetch";
import ClassList from "./classList";

class GoodsClass extends Component {

  constructor(props) {
    super(props)

    this.state = {
        goodsTabs:[],
        items:[],
        active: -1,
        activeId: 0,
        isLoading: false
    }
    this.getData = this.getData.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  componentDidMount() {
    this.getClassTabs();
    this.state = {ss:"ssss"};
    console.log(this.state);
    var _this = this;
    this.setState({
      goodsTabs:[{"id":"ss",dirName:"ssss"}],
      items:[],
      active: -1,
      activeId: 0,
      isLoading: false
    },function(){
      console.log(_this);
    })
  }
  componentDidUpdate() {
  }
  touchMove(that,args){

  }
  tabCallback  = (active) => {
    if(this.state.active === active){
      return;
    }
    this.setState({
        active: active
    });
    this.getData(1, {
      page:1,
      cId: this.state.goodsTabs[active].id
    });
  }
  getClassTabs(){
    let _this = this;
    let {tabUrl} = this.props;
    fetchPosts(tabUrl ,{ },"GET").then((data)=>{
        if(data.responseCode===1000){
          _this.setState({
              isLoading:false,
              goodsTabs: data.data
          });
        }else{
             _this.setState({
                isLoading:false,
                goodsTabs:[]
              });
        }
     }).catch(function(){
                _this.setState({
                    isLoading:false
                  });
     });
  }
  getData(num,searchParam){
    let {listUrl} = this.props;
    let {items,isLoading,isEnd} = this.state;

    if(isLoading){
        return;
    }
    this.setState({
        isLoading:true
    })
    let _this = this;
    let param = Object.assign({},searchParam);
    if(param.cId === 0){
      _this.setState({
          isLoading:false});
      return;
    }
    return fetchPosts(listUrl ,param,"GET").then((data)=>{
        if(data.responseCode===1000){
          _this.setState({
              isLoading:false,
              activeId: param.cId,
              items:data.data
          });
        }else{
             _this.setState({
                isLoading:false,items:[]});
        }
     }).catch(function(){
                _this.setState({
                    isLoading:false,});
     });
  }
  render() {
    let noDataTip = "--已经到底了--";
    if(this.state.items.length===0){
      noDataTip = "--敬请期待--"
    }
    let noTip = null;
    if(this.state.isLoading){
      noTip = <div className="no-up">--加载中--</div>;
    }else{
      if(this.state.page>=1&&this.state.isEnd===true){
        noTip = <div className="no-up">{noDataTip}</div>;
      }
    }
    let goodsTab = '';
    if(this.state.goodsTabs.length > 0 ){
      goodsTab = <GoodsTab  ref="tap" tabCallback={this.tabCallback} active={this.state.active} tabs={this.state.goodsTabs} eventConfig={{pageName:this.pageName,model:"hot_goods_tab"}}></GoodsTab>;
    }
    let props = {
        property:"translateY",
        className:"scroll-warpper",
        tag:"ul",
        min:"auto",
        stopPro:false,
        vertical:true,
        touchMove:this.touchMove
    }
    return (
      <Swipe  {...props} >
        <div className="goodsClass-container">
          {goodsTab}
          <ClassList/>
          <ClassList/>
        </div>
      </Swipe>
    )
  }
};
GoodsClass.defaultProps = {
  tabUrl: "/stuff/hot/goodsClass.do",
  listUrl: "/stuff/hot/goodsList.do"
}
export default CSSModules(GoodsClass,styles,{allowMultiple:true});
