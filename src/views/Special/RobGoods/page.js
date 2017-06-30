import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun, icons } from 'libs/util';
import GoodsTab from "components/swipe/GoodsTab";
import {SpecialList,SwiperPagination} from 'ui';
import Swipe from "components/swipe/swipe";
import { fetchPosts } from "components/common/fetch";
import ReactSwipe from 'react-swipe';
import Tab from './Tab'
import Modal from "components/modal/index";
import PopUp from "components/popup/index";

class RobGoods extends Component {
  constructor(props) {
    super(props)

    this.state = {
        tabs:[],
        items:[],
        page: 1,
        active: -1,
        activeId: -1,
        isLoading: false,
        isEnd:false
    }
    this.getData = this.getData.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.linkClick = this.linkClick.bind(this);
  }
  componentDidMount() {
    // this.getData(1,{
    //   page:1
    // });
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
  getTabs(){
    let _this = this;
    let {classUrl} = this.props;
    fetchPosts(classUrl,{ specialId: "specialId" } ,"GET").then((data)=>{
        if(data.responseCode=='1000'){
          _this.setState({
              isLoading:false,
              tabs: data.data
          },function(){
            _this.tabCallback(0);
          });
        }else{
             _this.setState({
                isLoading:false,
                tabs:[]
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
  linkClick(event){
    let _this = this;
    let className = event.target.className;
    let link = event.target.dataset.link;
    let index = parseInt(event.target.dataset.index,10);

    //debugger
    if(link==='link'){

      let {isStartUrl} = this.props;
      let {activeId} = this.state;
      fetchPosts(isStartUrl,{ id: activeId } ,"GET").then((data)=>{
          if(data.responseCode=='1000'){
            if(data.data){
              let _data = _this.state.items[index];
              let url = _data.url;
              if(_data.coupon){
                url = _data.coupon.link;
              }

              if (QBFK.Util.getDevice() === 'android' && _data.source == 'jd') {
                  window.open(url);
              } else {
                  window.location.href = 'newtab://goodstuff.qbao.com/goods?url=' + url;
              }

            }else{
              Modal.alert("提示","时间未到，或已过期！");
            }
          }else{
               _this.setState({
                  isLoading:false
                });
          }
       }).catch(function(){
          _this.setState({
              isLoading:false
            });
       });


    }
  }
  tabCallback  = (active) => {
    let _this = this;
    if(this.state.active === active || this.state.tabs.lenght <= 0){
      return;
    }
    let _activeId = this.state.tabs[active].id;

    this.setState({
        activeId: _activeId,
        active: active
    });
    this.getData(1, {
      page:1,
      cId: _activeId
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
        <div className="special-rob-container">
          <Tab tabs={this.state.tabs} active={this.state.active} tabCallback={this.tabCallback}/>
          <div className="special-rob-list" onClick={this.linkClick}>
            {
              this.state.items.map(function(item,index){
                  return (<div className="rob-item" key={index} data-brandid={item.brandId}>
                      <div className="rob-item-img">
                        <div>
                          <img src={item.imgUrl } data-link="link" data-index={index}  alt="" className="bsl-img" />
                        </div>
                      </div>
                      <p className="rob-item-name" data-link="link" data-index={index}>{item.name}</p>
                      <div className="rob-item-info">
                        <div className="rob-price" >
                          <p>
                            {
                              item.coupon ? <span>券后￥{priceFormat(item.finalPrice - item.coupon.value)}<i className="rob-i-coupon"></i></span> : <span>￥{priceFormat(item.price)}</span>
                            }
                            <span className="icon"><img src={icons[item.source]} alt=""/></span>
                          </p>
                          {
                            item.rebateValue && <p className="rebateValue">{item.rebateValue}</p>
                          }
                        </div>
                        {item.coupon ? <div className="rob-buybtns" ><div className="rob-coupon"><p>优惠券</p><p>{item.coupon.value}</p></div><div className="rob-btn" data-link="link" data-index={index}>领券必抢</div></div> : <div className="rob-buybtns"><div className="rob-btn" data-link="link" data-index={index}>立即抢购</div></div>}
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
RobGoods.contextTypes = {
  router: React.PropTypes.object.isRequired
};
RobGoods.defaultProps = {
  listUrl: "/stuff/flash/detail.do",
  classUrl: "/stuff/flash/item.do",
  isStartUrl: "/stuff/flash/isStart.do",
  pageSize: 4
}
export default CSSModules(RobGoods,styles,{allowMultiple:true});
