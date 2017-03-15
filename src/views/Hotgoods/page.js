import React,{ Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat } from 'libs/util'
import { fetchPosts } from "components/common/fetch"
import SwiperPagination from './SwiperPagination';
import GoodsIscroll from "components/swipe/GoodsIscroll";
import GoodsTab from "components/swipe/GoodsTab";
import ReactSwipe from 'react-swipe';
import { ProductList } from 'ui';
import Swipe from "components/swipe/swipe";

class Hotgoods extends Component {

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
      let itemsLen = items.length;

      if(that.min-args[0]>30 && !isEnd){
          this.getData(1);
      }
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
      return fetchPosts("stuff/hot/goodsList.do",param,"GET").then((data)=>{
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
    if(this.props.loadingInit){
      reactSwipe = <ReactSwipe className="carousel" swipeOptions={{continuous: false, callback: this.swiperCallback}}>
                    {
                      this.props.goodsSwipers.map(function(item,i){
                        return (<div key={i}><a href={item.link_url}><img src={item.img_url}/></a></div>)
                      })
                    }
                  </ReactSwipe>;
      goodsIscroll = <GoodsIscroll goods={this.props.goodsStuffs}></GoodsIscroll>;
      goodsTab = <GoodsTab tabCallback={this.tabCallback} active={this.props.tabActive} tabs={this.props.goodsTabs}></GoodsTab>;
    }
    let noDataTip = "已经到底了";
    if(this.state.items.length===0){
      noDataTip = "无数据"
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
          <ProductList listConfig={{temp: 'sales'}} listData={this.state.items}/>
        </div>

        {this.state.isLoading===true&&(<div className="no-up">--加载中--</div>)}
        {this.state.page>=1&&this.state.isEnd===true&&(<div className="no-up">--{noDataTip}--</div>)}
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
