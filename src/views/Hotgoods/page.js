import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun } from 'libs/util'
import { fetchPosts } from "components/common/fetch"
import SwiperPagination from './SwiperPagination';
import GoodsIscroll from "components/swipe/GoodsIscroll";
import GoodsTab from "components/swipe/GoodsTab";
import ReactSwipe from 'react-swipe';
import { ProductList } from 'ui';
import Swipe from "components/swipe/swipe";

class Hotgoods extends Component {
  pageName = '102'
  constructor(props) {
    super(props)
    props.getGoodsInitData();
    // props.getCloudList();
    this.state = {
        items:[],
        page: 1,
        active: 0,
        isLoading: false,
        oneHeight:false,
        isEnd:false,
    }
    this.getData = this.getData.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  componentDidMount() {
    // this.getData(1);
    // console.log("this.props.goodsTabs....",this.props.goodsTabs)
    // this.state = {"s":"ssss"}
    console.log(this.state);
  }
  componentDidUpdate() {
    console.log("this.props.goodsTabs.length", this.props.goodsTabs.length);
    if(this.props.goodsTabs.length !== 0){
      // if(this.props.tapActive===0){
      //
      //   this.getData(1, {
      //     page:1,
      //     cId: this.props.goodsTabs[0].id
      //   });
      //
      // }
    }
  }
  swiperCallback  = (active) => {
    this.props.setSwiperActive(active);
  }
  tabCallback  = (active) => {
    if(this.props.tabActive === active){
      return;
    }
    this.props.setTabActive(active);
    // this.props.getHotSearchList(this.props.goodsTabs[active].id, 1);

    this.getData(1, {
      page:1,
      cId: this.props.goodsTabs[active].id
    });
  }

  touchMove(that,args){
      let {items,isEnd} = this.state;
      let cTop = args[0];

      if(that.min-args[0]>30 && !isEnd){
          this.getData(1);
      }

      // let swiper = ReactDOM.findDOMNode(this.refs.swiper);
      // let stuff = ReactDOM.findDOMNode(this.refs.stuff);
      // let tab = ReactDOM.findDOMNode(this.refs.tap).children[0];
      // let swiperH = (swiper.clientHeight+stuff.clientHeight+50) * -1;
      // if(cTop <= swiperH ){
      //   tab.style.transform="translateY("+((cTop - swiperH) * -1)+"px)";
      // }else{
      //   tab.style.transform="translateY(0px)";
      // }
  }
  getData(num , searchParam){

      let {page,items,active,isLoading,isEnd} = this.state;

      if(isLoading){
          return;
      }
      this.setState({
          isLoading:true
      })
      let _this = this;
      let param = Object.assign({},{cId: active, page: page,size: 8},searchParam);
      page = param.page;
      if(param.cId === 0){
        _this.setState({
            isLoading:false});
        return;
      }
      return fetchPosts("/stuff/hot/goodsList.do",param,"GET").then((data)=>{
        console.log("data.data.lenght" , data.data.length);
              if(data.responseCode===1000){
                  if(page===1){
                    _this.setState({
                        isLoading:false,
                        page: page + num,
                        active: param.cId,
                        isEnd: data.data.length < 8 ?true:false,
                        items:data.data
                    });
                  }else{
                    _this.setState({
                        isLoading:false,
                        page: page + num,
                        active: param.cId,
                        isEnd: data.data.length < 8 ?true:false,
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
    let reactSwipe = null, goodsIscroll = null, goodsTab = null;
    // auto: true, speed: 1000,
    if(this.props.loadingInit){
      reactSwipe = <ReactSwipe  ref="swiper" className="carousel" swipeOptions={{continuous: false, callback: this.swiperCallback}}>
                    {
                      this.props.goodsSwipers.map(function(item,i){
                        return (<div key={i}><a {...eventFun(this.pageName, 'hot_goods_banner', item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.linkUrl}><img src={item.imgUrl}/></a></div>)
                      })
                    }
                  </ReactSwipe>;
      goodsIscroll = <GoodsIscroll ref="stuff" goods={this.props.goodsStuffs}></GoodsIscroll>;
      goodsTab = <GoodsTab  ref="tap" tabCallback={this.tabCallback} active={this.props.tabActive} tabs={this.props.goodsTabs} eventConfig={{pageName:this.pageName,model:"hot_goods_tab"}}></GoodsTab>;
    }
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
        //step:200
    }
    return (
      <Swipe  {...props} >
        <div className=" hots-container">
          <div className="hots-swiper">
            {reactSwipe}
            <SwiperPagination active={this.props.swiperActive} swipers={this.props.goodsSwipers}></SwiperPagination>
          </div>
          <div className="hots-public-title"><div></div></div>
          {  goodsIscroll }
          { goodsTab }
          <ProductList listConfig={{temp: 'hots'}} listData={this.state.items} eventConfig={{pageName:this.pageName,model:`hot_goods_${this.state.active}_products`}}/>
        </div>

        { noTip }
      </Swipe>
    )
  }
};
function mapStateToProps(state) {
    return state.hotgoods;
}

function mapDispatchToProps(dispatch) {
    return {
      getLoadedMoreList: function(){
        dispatch({type:"hotgoods/getLoadedMoreList", cid: cid, page: page});
      },
      getCloudList: function(){
        dispatch({type:"hotgoods/getCloudList"});
      },
      getHotSearchList: function( cid, page ){
        dispatch({type:"hotgoods/getHotSearchList" , cid: cid, page: page });
      },
      getGoodsInitData: function(){
        dispatch({type:"hotgoods/getGoodsInitData"});
      },
      setSwiperActive: function(act){
        dispatch({type:"hotgoods/swiperAct",active:act});
      },
      setTabActive: function(act){
        dispatch({type:"hotgoods/tabAct",active:act});
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Hotgoods,styles,{allowMultiple:true}));
