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
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll';
import Swipe from "components/swipe/swipe";

class Hotgoods extends Component {

  constructor(props) {
    super(props)
    props.getGoodsInitData();
    props.getCloudList();
    this.state = {
        items:[],
        page:0,
        isLoading:true,
        oneHeight:false,
        isEnd:false,
    }
    this.touchMove = this.touchMove.bind(this);
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


  touchMove(that,args){
      // console.log(that,args);
      let {items,oneHeight} = this.state;
      oneHeight = oneHeight===false?that.element.children[0].children[0].clientHeight:oneHeight;

      console.log("...............that.min:", that.min, ".......", args);
      if(that.min-args[0]>-300){
          // this.getData(1).then(()=>{
          //     console.error("该加载了",-oneHeight*items.length);
          //     that.min = -oneHeight*items.length;
          // });
      }
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
    let props = {
        property:"translateY",
        className:"scroll-warpper",
        // tag:"ul",
        min:"auto",
        // stopPro:false,
        vertical:true,
        touchMove:this.touchMove
        //step:200
    }
    return (
      <Swipe  {...props}>
        <div className=" hots-container">
          <div className="hots-swiper">
            {reactSwipe}
            <SwiperPagination active={this.props.swiperActive} swipers={this.props.goodsSwipers}></SwiperPagination>
          </div>
          <div className="hots-public-title"><div></div></div>
          {  goodsIscroll }
          { goodsTab }
          <ProductList listConfig={{temp: 'sales'}} listData={this.props.productList}/>
        </div>
      </Swipe>
    )
  }
};
// Hotgoods.defaultProps = {
//     options: {
//         mouseWheel: true,
//         scrollbars: true
//     }
// }
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
