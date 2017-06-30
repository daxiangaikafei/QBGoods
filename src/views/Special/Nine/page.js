import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun } from 'libs/util';
import GoodsTab from "components/swipe/GoodsTab";
import {SpecialList,SwiperPagination} from 'ui';
import Swipe from "components/swipe/swipe";
import { fetchPosts } from "components/common/fetch";
import ReactSwipe from 'react-swipe';

class Nine extends Component {
  constructor(props) {
    super(props)

    this.state = {
        specialId: props.params.id || "",
        imgURL: '',
        items:[],
        page: 1,
        active: 2222,
        activeId: 0,
        isLoading: false,
        goodsTabs:[],
        isEnd:false
    }
    this.getData = this.getData.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  componentDidMount() {
    this.getTabs();
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
  getTabs(){
    let _this = this;
    let {tabUrl} = this.props;
    let {specialId} = this.state;
    fetchPosts(tabUrl ,{ specialId: specialId },"GET").then((data)=>{
        if(data.responseCode=='1000'){
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
      let {pageSize,listUrl} = this.props;
      let {page,items,isLoading,isEnd,activeId,imgURL} = this.state;

      if(isLoading){
          return;
      }
      this.setState({
          isLoading:true
      })
      let _this = this;
      let param = Object.assign({},{page: page, cId: activeId, size: pageSize}, searchParam);
      page = param.page;
      if(param.cId === 0){
        _this.setState({
            isLoading:false});
        return;
      }
      return fetchPosts(listUrl ,param,"GET").then((data)=>{
          if(data.responseCode===1000){
              if(data.name){
                document.title = data.name;
              }
              if(page===1){
                _this.setState({
                    isLoading:false,
                    imgURL: data.imgUrl||imgURL,
                    activeId: param.cId,
                    page: page + num,
                    isEnd: data.data.length < pageSize ?true:false,
                    items:data.data
                });
              }else{
                _this.setState({
                    isLoading:false,
                    imgURL: data.imgUrl||imgURL,
                    activeId: param.cId,
                    page: page + num,
                    isEnd: data.data.length < pageSize ?true:false,
                    items:items.concat(data.data)
                });
              }
          }else{
               _this.setState({
                  isLoading:false,items:[],isEnd: true});
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
    let goodsTab ='';
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
        <div className=" special-container">
          <div className="nine-swiper">
            {this.state.imgURL ? <img src={this.state.imgURL}/> : ""}
          </div>
          {goodsTab}
          <SpecialList listConfig={{temp: 'nine'}} listData={this.state.items} eventConfig={{pageName:this.pageName,model:`hot_goods_${this.state.active}_products`}}/>
        </div>
        { noTip }
      </Swipe>
    )
  }
};
Nine.defaultProps = {
  tabUrl: "/stuff/nine/goodsClass.do",
  listUrl: "/stuff/nine/goodsList.do",
  pageSize: 8
}
export default CSSModules(Nine,styles,{allowMultiple:true});
