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

class Hotgoods extends Component {

  constructor(props) {
    super(props)
    props.getGoodsInitData();
    props.getCloudList();
  }
  componentDidMount() {

  }

  componentDidUpdate() {

  }
  swiperCallback  = (active) => {
    this.props.setSwiperActive(active);
  }
  tabCallback  = (active) => {
    this.props.setTabActive(active);

    this.props.getHotSearchList(this.props.goodsTabs[active].id, 4);
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

    return (
      <div className="hots-container">
        <div className="hots-swiper">
          {reactSwipe}
          <SwiperPagination active={this.props.swiperActive} swipers={this.props.goodsSwipers}></SwiperPagination>
        </div>
        <div className="hots-public-title"><div></div></div>
        {  goodsIscroll }
        { goodsTab }
        <ProductList listConfig={{temp: 'sales'}} listData={this.props.productList}/>
      </div>
    )
  }
};
function mapStateToProps(state) {
    return state.hotgoods;
}

function mapDispatchToProps(dispatch) {
    return {
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
