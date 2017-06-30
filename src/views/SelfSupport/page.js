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

class SelfSupport extends Component {

  constructor(props) {
    super(props);
    props.getInitData();

    this.state = {
        items:[],
        page: 1,
        active: 1,
        isLoading: false,
        oneHeight:false,
        isEnd:false,
    }
    this.getData = this.getData.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  componentDidMount() {
    // this.getData(1);
  }

  componentDidUpdate() {

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
      cId: this.props.tabs[active].id
    });
  }

  touchMove(that,args){
      let {items,isEnd} = this.state;
      let cTop = args[0];
      if(that.min-cTop>30 && !isEnd){
          this.getData(1);
      }
      // let swiper = ReactDOM.findDOMNode(this.refs.swiper);
      // let tab = ReactDOM.findDOMNode(this.refs.tap).children[0];
      // let swiperH = (swiper.clientHeight+10) * -1;
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
      return fetchPosts("/stuff/qbzy/goodsList.do",param,"GET").then((data)=>{
              // console.log("data.data.lenght" , data.data.length);
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
                        isEnd:data.data.length < 8 ?true:false,
                        items:items.concat(data.data)
                    });
                  }
              }else{
                   _this.setState({
                      isLoading:false});
              }



       }).catch(function(){
                  _this.setState({
                      isLoading:false,});
       });
  }

  render() {
    let reactSwipe = null, goodsTab = null;
    if(this.props.loadingInit){
      reactSwipe = <ReactSwipe ref="swiper" className="carousel" swipeOptions={{continuous: false, callback: this.swiperCallback}}>
                    {
                      this.props.swipers.map(function(item,i){
                        return (<div key={i}><a {...eventFun("103", 'self_support_banner', item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.linkUrl}><img src={item.imgUrl}/></a></div>)
                      })
                    }
                  </ReactSwipe>;
      goodsTab = <GoodsTab ref="tap" tabCallback={this.tabCallback} active={this.props.tabActive} tabs={this.props.tabs}  eventConfig={{pageName:"103",model:"self_support_tab"}}></GoodsTab>;
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
        <div className="hots-container">
          <div className="hots-swiper">
            {reactSwipe}
            <SwiperPagination active={this.props.swiperActive} swipers={this.props.swipers}></SwiperPagination>
          </div>
          {goodsTab}
          <ProductList listConfig={{temp: 'score'}} listData={this.state.items} eventConfig={{pageName:"103",model:`self_support_${this.state.active}_products`}}/>
        </div>
        { noTip }
      </Swipe>
    )
  }
};
function mapStateToProps(state) {
    return state.selfsupport;
}

function mapDispatchToProps(dispatch) {
    return {
      getCloudList: function(){
        dispatch({type:"selfsupport/getCloudList"});
      },
      getHotSearchList: function( cid, page ){
        dispatch({type:"selfsupport/getHotSearchList" , cid: cid, page: page });
      },
      getInitData: function(act){
        dispatch({type:"selfsupport/getGoodsInitData"});
      },
      setSwiperActive: function(act){
        dispatch({type:"selfsupport/swiperAct",active:act});
      },
      setTabActive: function(act){
        dispatch({type:"selfsupport/tabAct",active:act});
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(SelfSupport,styles,{allowMultiple:true}));
