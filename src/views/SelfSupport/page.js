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
import { ProductListHots } from 'ui';
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
    this.getData(1);
  }

  componentDidUpdate() {

  }
  swiperCallback  = (active) => {
    this.props.setSwiperActive(active);
  }
  tabCallback  = (active) => {
    this.props.setTabActive(active);
    // this.props.getHotSearchList(this.props.tabs[active].id, 4);
    this.getData(1, {
      page:1,
      cId: this.props.tabs[active].id
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

      console.log("isLoading.....", this.state, ".............", searchParam)
      if(isLoading || isEnd){
          return;
      }
      this.setState({
          isLoading:true
      })
      let _this = this;
      let param = Object.assign({},{cId: active, page: page,size: 8},searchParam);
      page = param.page;
      return fetchPosts("stuff/qbzy/goodsList.do",param,"GET").then((data)=>{
              console.log(data);
              if(data.responseCode===1000){
                  page += num;
                  if(searchParam){
                    _this.setState({
                        isLoading:false,
                        page,
                        active: param.cId,
                        isEnd:data.data.length < 8 ?true:false,
                        items:data.data
                    });
                  }else{
                    _this.setState({
                        isLoading:false,
                        page,
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
      reactSwipe = <ReactSwipe className="carousel" swipeOptions={{continuous: false, callback: this.swiperCallback}}>
                    {
                      this.props.swipers.map(function(item,i){
                        return (<div key={i}><a href={item.linkUrl}><img src={item.imgUrl}/></a></div>)
                      })
                    }
                  </ReactSwipe>;
      goodsTab = <GoodsTab tabCallback={this.tabCallback} active={this.props.tabActive} tabs={this.props.tabs}></GoodsTab>;
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
        <div className="hots-container">
          <div className="hots-swiper">
            {reactSwipe}
            <SwiperPagination active={this.props.swiperActive} swipers={this.props.swipers}></SwiperPagination>
          </div>
          {goodsTab}
          <ProductListHots listConfig={{temp: 'similar'}} listData={this.state.items}/>
        </div>
        {this.state.isLoading===true&&(<div className="no-up">--加载中--</div>)}
        {this.state.page>=1&&this.state.isEnd===true&&(<div className="no-up">--{noDataTip}--</div>)}
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
