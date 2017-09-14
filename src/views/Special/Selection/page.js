import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun, icons } from 'libs/util';
import GoodsTab from "components/swipe/GoodsTab";
import {SpecialList,SwiperPagination,Icon} from 'ui';
import Swipe from "components/swipe/swipe";
import { fetchPosts } from "components/common/fetch";
import ReactSwipe from 'react-swipe';
import { Banner } from 'ui'
import { Tabs } from 'ui'
import { ProductList } from 'ui'
import Modal from "components/modal/index";
import PopUp from "components/popup/index";

class Selection extends Component {
  pageName = '122'
  swipe = null
  height = 0
  constructor(props) {
    super(props)

    this.state = {
      activityId: getParameterByName('activityId',location.search) || props.params.id || "",
      items:[],
      page: 1,
      active: 2222,
      activeId: 0,
      isLoading: false,
      goodsTabs:[],
      isEnd:false,
      actTabActive: 0,
      isModalShow: false,
      isTopShow: false,
      isTabFixed: false,
      pageData: {},
      actTabList: [],
      actList: [],
      actTitles: [],
      timelimitTabActive: -1,
      timelimitTabList: [],
      timelimitList: [],
    }
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate() {
  }
  touchMove = (that,args) => {
    // debugger
    // console.log('top',args[0])
    !this.height && (this.height = that.element.offsetHeight)
    if (-args[0]>this.height) {
      !this.state.isTopShow && this.setState({
        isTopShow: true
      })
      !this.swipe && (this.swipe = that)
    } else {
      this.state.isTopShow && this.setState({
        isTopShow: false
      })
    }
    // let offsetTop = this.refs.actTab.offsetTop
    // if (-args[0]>offsetTop) {
    //   this.setState({
    //     isTabFixed: true,
    //   })
    // } else {
    //   this.setState({
    //     isTabFixed: false,
    //   })
    // }

    let {items,isEnd} = this.state;
    let cTop = args[0];

    // if(that.min-args[0]>30 && !isEnd){
    //     this.getData(1);
    // }
  }
  touchEnd = (top) => {
    if (-top>this.height) {
      !this.state.isTopShow && this.setState({
        isTopShow: true
      })
    } else {
      this.state.isTopShow && this.setState({
        isTopShow: false
      })
    }

    // let offsetTop = this.refs.actTab.offsetTop
    // if (-top>offsetTop) {
    //   this.setState({
    //     isTabFixed: true,
    //   })
    // } else {
    //   this.setState({
    //     isTabFixed: false,
    //   })
    // }
  }
  actTabOnClick = actTabActive => {
    if(this.state.actTabActive === actTabActive){
      return;
    }
    this.setState({
      actTabActive,
    });
  }
  timelimitTabOnClick = timelimitTabActive => {
    if(this.state.timelimitTabActive === timelimitTabActive){
      return;
    }
    this.setState({
      timelimitTabActive
    });
  }
  btnRuleOnClick = () => {
    this.setState({
      isModalShow: true
    })
  }
  btnRuleCloseOnClick = () => {
    this.setState({
      isModalShow: false
    })
  }
  btnTopOnClick = () => {
    this.swipe.moveTo(0)
    this.state.isTopShow && this.setState({
      isTopShow: false
    })
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

  getData=(num,searchParam)=>{
      const {url} = this.props;
      // let {page,items,isLoading,isEnd,activeId,imgURL,specialId} = this.state;

      // if(isLoading){
      //     return;
      // }
      // this.setState({
      //     isLoading:true
      // })
      // let _this = this;
      // let param = Object.assign({},{page: page, cId: activeId, size: pageSize}, searchParam);
      // page = param.page;
      // if(param.cId === 0){
      //   _this.setState({
      //       isLoading:false});
      //   return;
      // }
      return fetchPosts(url ,{activityId:this.state.activityId},"GET").then((data)=>{
          if(data.responseCode===1000){
            let actTabList = [],
                actList = [],
                actTitles = [],
                timelimitTabList = [],
                timelimitList = [],
                timelimitTabActive = -1
            if (data.data[4]) {
              data.data[4].forEach((item,index) => {
                actTabList.push(item.name)
                actList.push(item.goods)
                actTitles.push(item.title)
              })
            }
            if (data.data[3]) {
              data.data[3].forEach((item,index) => {
                timelimitTabList.push({name:item.name,status:item.status})
                timelimitList.push(item.goods)
                item.status == 1 && (timelimitTabActive = index)
              })
            }
              this.setState({
                pageData: data.data,
                actTabList,
                actList,
                actTitles,
                timelimitTabList,
                timelimitList,
                timelimitTabActive,
                isLoading:false,
                isEnd: true,
              })
              // if(page===1){
              //   _this.setState({
              //       isLoading:false,
              //       imgURL: data.imgUrl||imgURL,
              //       activeId: param.cId,
              //       page: page + num,
              //       isEnd: data.data.length < pageSize ?true:false,
              //       items:data.data
              //   });
              // }else{
              //   _this.setState({
              //       isLoading:false,
              //       imgURL: data.imgUrl||imgURL,
              //       activeId: param.cId,
              //       page: page + num,
              //       isEnd: data.data.length < pageSize ?true:false,
              //       items:items.concat(data.data)
              //   });
              // }
          }else{
              //  _this.setState({
              //     isLoading:false,items:[],isEnd: true});
          }
       }).catch(function(){
            // this.setState({
            //     isLoading:false,});
       });
  }
  render() {
    const { pageData, actTabList, actList, actTitles, timelimitTabList, timelimitList, timelimitTabActive } = this.state
    let noDataTip = "--已经到底了--";
    if(this.state.actList.length===0){
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
        touchMove:this.touchMove,
        touchEnd:this.touchEnd,
    }
    return (
      <div style={{height:'100%'}}>
        <Swipe style={{ background:'#fff'}} {...props} >
          <div className="selection-container">
            {pageData[1] && <div className="selection-swiper">
                  <ReactSwipe ref="swiper" className="carousel" swipeOptions={{continuous: false,auto:4000,speed:500, callback: ()=>{}}}>
                    {pageData[1].map((item, index) => (
                      <img src={item.imgUrl} key={index} onClick={()=>{this.go('SelectionList',item.id)}}/>
                    ))}
                  </ReactSwipe>
                </div>
              }
            {pageData[2] && <div className="classify">
                {pageData[2].map((item,index) => (
                  <div className="classify-item" key={index} onClick={()=>{this.go('SelectionList',item.id)}}>
                    <h4>{item.name}</h4>
                    <p>{item.title}</p>
                    <img src={item.imgUrl} alt=""/>
                  </div>))}
              </div>}
            {pageData[3] && <div className="timelimit">
              <div className="tl-tab">
                
                {
                  timelimitTabList.map((item, index) => (
                    index==0 ? 
                    <div className={classNames("tl-tab-item",{'active':timelimitTabActive==index})} key={index} onClick={()=>{this.timelimitTabOnClick(index)}}>
                      {item.name}
                    </div> :
                    <div className={classNames("tl-tab-item",{'active':timelimitTabActive==index})} key={index} onClick={()=>{this.timelimitTabOnClick(index)}}>
                      <span className="tl-tab-start">{item.name}</span>
                      <span className="tl-tab-end">{item.status==1?'已经开始':'即将开始'}</span>
                    </div>
                  ))
                }
              </div>
              <div className="tl-list">
                {
                  timelimitList[this.state.timelimitTabActive].map((item, index) => (
                    
                    <div className="tl-list-item" key={index} onClick={()=>{timelimitTabList[this.state.timelimitTabActive].status==1&&this.tofrontClick(item.id,item.couponLink)}} {...eventFun(this.pageName, 'selection_timilimit_products', item.id)}>
                      
                      <div className="tl-list-item-top">
                        <div className="tl-list-item-start">
                            <div className="tl-list-item-coupon-bg">
                              <span className="tl-list-item-coupon">
                                {item.couponAmount}
                                <i>元</i>
                              </span>
                            </div>

                        </div>
                        <div className="tl-list-item-middle">
                          <div className="tl-list-item-title">
                            <img src={icons[item.source]} alt=""/>
                            {item.name}
                          </div>
                          <div className="tl-list-item-price">
                            <span className="tl-list-item-price-txt">￥{item.couponPrice}</span>券后价
                          </div>
                          <div className="tl-list-item-old-price">
                            原价￥{item.reservePrice}
                          </div>
                          <span className="tl-list-item-rebate">预返积分{item.point}</span>
                        </div>
                        <div className="tl-list-item-end">
                          <img src={item.imgUrl} alt=""/>
                        </div>
                      </div>
                      <div className="tl-list-item-bottom">
                        <p>
                        【好物推荐】{item.copyWriter}
                        </p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>}
            {pageData[4] && <div className="activity">
              <div className="act-tab" ref="actTab">
              {
                actTabList.map((item,index) => (
                  <div className={classNames("act-tab-item",{'active':this.state.actTabActive==index})} key={index} onClick={()=>{this.actTabOnClick(index)}}>
                    {this.state.actTabActive==index?<Icon name="location" size="14"/>:<span style={{display:'inline-block',width:'14px'}}></span>}
                    {item}
                  </div>)
                )
              }       
              </div>
              <div className="act-title">
                <i></i>
                {actTitles[this.state.actTabActive]}
                <i></i>              
              </div>
              <ProductList 
                style={{backgroundColor:'#fff'}}
                listConfig={{temp: 'selection'}} 
                listData={actList[this.state.actTabActive]} 
                eventConfig={{pageName:this.pageName,model:`selection_${this.state.actTabActive}_products`}}/>
            </div>}
          </div>
          { noTip }
        </Swipe>
        <div className="tool-btn-group">
          <span className={classNames("btn-top",{'hidden':!this.state.isTopShow})} onClick={this.btnTopOnClick}></span>
          <span className="btn-rule" onClick={this.btnRuleOnClick}></span>
        </div>
        {this.state.isModalShow &&  <div className="modal-container">
          <div className="modal">
            <span className="modal-btn-close" onClick={this.btnRuleCloseOnClick}>×</span>
            <div className="modal-title">活动规则</div>
            <div className="modal-content">
              <p>我有好物页面商品不支持宝券支付，可用支付宝进行支付。</p>
              <p>用户购买后的返现数量以我有好物中“我的账户”显示的数量为准。</p>
              <p>目前我有好物购物返利返还至支付宝旗下推出的积分消费服务“集分宝”内。</p>
              <p>我有好物活动优惠券券力度以实际商品页打开显示的力度为准。</p>
              <p>我有好物官方QQ群：242133525，返利均为我有好物返利与商家无任何关系。</p>
              <p>活动商品最终优惠力度以商家详情页为准。</p>
              <div>—活动最终解释权归我有好物所有—</div>
            </div>
            <div className="modal-btn-dismiss" onClick={this.btnRuleCloseOnClick}>朕知道了</div>
          </div>
        </div>}
        {this.state.isTabFixed && <div className="act-tab fixed">
          {
            this.tabsConfig.map((item,index) => (
              <div className={classNames("act-tab-item",{'active':this.state.actTabActive==index})} key={index} onClick={()=>{this.actTabOnClick(index)}}>
                {this.state.actTabActive==index&&<Icon name="location" size="14"/>}
                {item}
              </div>)
            )
          }       
        </div>}
      </div>
    )
  }
  tofrontClick = (id,url,e) => {
    location.href = 'newtab://goodstuff.qbao.com/goods?url='+url
    e && e.preventDefault()
    // id && this.context.router.push( {"pathname": `frontMatter/${id}`, state: {} });
  }
  go = (route,id) => {
    if(QBFK.Util.getDevice() === 'ios') {
      location.href = `newtab://${location.href.split('indexSelection')[0]}index${route}.html?id=${id}`
    } else {
      this.context.router.push( {"pathname": `${route}/${id}`, state: {} })
    }
  }
};
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
Selection.defaultProps = {
  url: "/cms/activity/index.do",
}
Selection.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default CSSModules(Selection,styles,{allowMultiple:true});
