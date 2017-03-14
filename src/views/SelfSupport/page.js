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

class SelfSupport extends Component {

  constructor(props) {
    super(props);
    props.getInitData();
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
    this.props.getHotSearchList(this.props.tabs[active].id, 4);
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
    return (
      <div className="hots-container">
        <div className="hots-swiper">
          {reactSwipe}
          <SwiperPagination active={this.props.swiperActive} swipers={this.props.swipers}></SwiperPagination>
        </div>
        {goodsTab}
        <ProductList listConfig={{temp: 'sales'}} listData={this.props.productList}/>
      </div>
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