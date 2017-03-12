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

class SelfSupport extends Component {

  constructor(props) {
    super(props)
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
  }
  render() {
    return (
      <div className="hots-container">
        <div className="hots-swiper">
          <ReactSwipe className="carousel" swipeOptions={{continuous: false, callback: this.swiperCallback}}>
            {
              this.props.swipers.map(function(item,i){
                return (<div key={i}><a href={item.href}><img src={item.src}/></a></div>)
              })
            }
          </ReactSwipe>
          <SwiperPagination active={this.props.swiperActive} swipers={this.props.swipers}></SwiperPagination>
        </div>
        <GoodsTab tabCallback={this.tabCallback} active={this.props.tabActive} tabs={this.props.tabs}></GoodsTab>
      </div>
    )
  }
};
function mapStateToProps(state) {
    return state.selfsupport;
}

function mapDispatchToProps(dispatch) {
    return {
      setSwiperActive: function(act){
        dispatch({type:"selfsupport/swiperAct",active:act});
      },
      setTabActive: function(act){
        dispatch({type:"selfsupport/tabAct",active:act});
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(SelfSupport,styles,{allowMultiple:true}));
