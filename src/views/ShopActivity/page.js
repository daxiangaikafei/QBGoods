import React,{ Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat } from 'libs/util'
import { fetchPosts } from "components/common/fetch"
import SwiperPagination from './SwiperPagination';
import ReactSwipe from 'react-swipe';
import { ProductList } from 'ui';

class ShopActivity extends Component {

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
    }
    return (
      <div className="shop-container">
        <div className="shop-header">
          <img className="shop-header-bg" src="" />
          <div className="shop-header-warrper">
            <div className="shop-icon"></div>
            <div className="shop-info">

            </div>
          </div>
        </div>
        <div className="shop-swiper">
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
    return state.ShopActivity;
}

function mapDispatchToProps(dispatch) {
    return {
      getCloudList: function(){
        dispatch({type:"ShopActivity/getCloudList"});
      },
      getHotSearchList: function( cid, page ){
        dispatch({type:"ShopActivity/getHotSearchList" , cid: cid, page: page });
      },
      getInitData: function(act){
        dispatch({type:"ShopActivity/getShopInitData"});
      },
      setSwiperActive: function(act){
        dispatch({type:"ShopActivity/swiperAct",active:act});
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(ShopActivity,styles,{allowMultiple:true}));
