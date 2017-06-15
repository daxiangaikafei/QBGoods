import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun } from 'libs/util';
import GoodsIscroll from "components/swipe/GoodsIscroll";
import GoodsTab from "components/swipe/GoodsTab";
import {SpecialList} from 'ui';
import Swipe from "components/swipe/swipe";
import { fetchPosts } from "components/common/fetch";

class List extends Component {
  bannerpic = require('static/imgs/gatherGoods/banner.png');
  constructor(props) {
    super(props)

    this.state = {
        specialId: props.params.id,
        items:[],
        page: 1,
        isLoading: false,
        isEnd:false
    }
    this.getData = this.getData.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  componentDidMount() {
    this.getData(1);

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
  getData(num){
      let {pageSize,listUrl} = this.props;
      let {page,items,specialId,isLoading,isEnd} = this.state;

      if(isLoading){
          return;
      }
      this.setState({
          isLoading:true
      })
      let _this = this;
      let param = Object.assign({},{page: page, cId: specialId,size: pageSize});
      page = param.page;
      return fetchPosts(listUrl ,param,"GET").then((data)=>{
          if(data.responseCode===1000){
              if(page===1){
                _this.setState({
                    isLoading:false,
                    page: page + num,
                    active: param.cId,
                    isEnd: data.data.length < pageSize ?true:false,
                    items:data.data
                });
              }else{
                _this.setState({
                    isLoading:false,
                    page: page + num,
                    active: param.cId,
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
        <div className=" nine-container">
          <div className="nine-swiper">
            <img src={this.bannerpic}/>
          </div>
          <SpecialList listConfig={{temp: 'beauty'}} listData={this.state.items} eventConfig={{pageName:this.pageName,model:`hot_goods_${this.state.active}_products`}}/>
        </div>
        { noTip }
      </Swipe>
    )
  }
};
List.defaultProps = {
  listUrl: "/stuff/hot/goodsList.do",
  pageSize: 8
}
export default CSSModules(List,styles,{allowMultiple:true});
