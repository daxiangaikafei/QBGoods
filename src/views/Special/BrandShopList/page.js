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

class BrandShopList extends Component {
  constructor(props) {
    super(props)

    this.state = {
        items:[],
        page: 1,
        isLoading: false,
        isEnd:false
    }
    this.getData = this.getData.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.shopClick = this.shopClick.bind(this);
  }
  componentDidMount() {
    this.getData(1,{
      page:1
    });
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
  getData(num,searchParam){
      let {pageSize,listUrl} = this.props;
      let {page,items,isLoading,isEnd} = this.state;

      if(isLoading){
          return;
      }
      this.setState({
          isLoading:true
      })
      let _this = this;
      let param = Object.assign({},{page: page, size: pageSize}, searchParam);
      page = param.page;
      return fetchPosts(listUrl ,param,"GET").then((data)=>{
          if(data.responseCode==1000){
            if(page===1){
                _this.setState({
                    isLoading:false,
                    page: page + num,
                    isEnd: data.data.length < pageSize ?true:false,
                    items:data.data
                });
              }else{
                _this.setState({
                    isLoading:false,
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
  shopClick(event){
    let className = event.target.className;
    let id = event.target.dataset.brandId;
    console.log("className:",className,"id",id);
    //debugger
    if(className==='bsl-img'){
      this.context.router.push( {"pathname": "BrandShop/" + id });
    }
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
          <div className="brand-shop-list" onClick={this.shopClick}>
            {
              this.state.items.map(function(item,index){
                  return (<div className="bsl-item" key={index} data-brandid={item.brandId}>
                      <div className="bsl-item-img">
                        <img src={item.imgUrl } alt="" className="bsl-img" data-brandid={item.brandId}/>
                      </div>
                      <div className="bsl-item-info">
                        <p className="bsl-offSale">{item.offSale}</p><p className="bsl-name">{item.brandName}</p>
                      </div>
                  </div>)
              })
            }
          </div>
        </div>
        { noTip }
      </Swipe>
    )
  }
};
BrandShopList.contextTypes = {
  router: React.PropTypes.object.isRequired
};
BrandShopList.defaultProps = {
  listUrl: "/stuff/brand/list.do",
  pageSize: 8
}
export default CSSModules(BrandShopList,styles,{allowMultiple:true});
