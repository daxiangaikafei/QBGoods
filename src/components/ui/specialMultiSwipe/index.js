import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './index.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat, baoquanFormat, eventFun, icons } from 'libs/util'
import ReactSwipe from 'react-swipe';
import SwiperPagination from '../swiperPagination';
import SpecialToTip from '../specialToTip';
import PopUp from "components/popup/index";

class MultiSwipe extends Component {
    constructor(props) {
        super(props)

        this.state = {
          swiperActive:0
        }
        // this.clickLink = this.clickLink(this);
    }

    componentWillMount(){

    }
    clickLink(id,source,e){
      console.log(this,"this........");
      this.context.router.push( {"pathname": `frontMatter/${id}`,  state: {} });
      e.preventDefault();
      // PopUp.show(
      //         (<SpecialToTip source={source}  />),{maskClosable:true, isBgAlpha: true}
      // );
      // setTimeout(function(){
      //   window.location.href = 'newtab://goodstuff.qbao.com/goods?url=' + url;
      //   PopUp.hide(
      //     (<SpecialToTip source={source} />), { maskClosable: false, isBgAlpha: false }
      //   );
      // },1000);
      // e.preventDefault();
    }

    swiperCallback  = (active) => {
      this.setState({
          swiperActive: active
      });
    }


    render() {
        let _this = this;
        let listTpl = "";
        let pageSize = this.props.pageSize || 6;
        let pageswipe = [],
            total = this.props.swipes.length,
            swipes = this.props.swipes,
            page = total > 0 ? Math.ceil(total/pageSize) : 0;

        let swipeDom = null;
        let { pageName, model } = this.props.eventConfig;

        if(total>0){
          let i = 0;
          while(i<page){
            let _arr = swipes.slice( i*6, i*6+6);
            pageswipe.push(_arr);
            i++;
          }
          swipeDom = <ReactSwipe ref="swiper" className="carousel" swipeOptions={{continuous: false, callback: this.swiperCallback}}>
            {
              pageswipe.map(function(pages,i){
                return (<a key={i} className="swipe-img">
                  <div className="swipe-slide">{
                    pages.map(function(item,i){
                      return (<div className="swipe-item" key={i}>
                            <a {...eventFun(pageName, model, item.id)} href={item.linkUrl} className="imga" onClick={_this.clickLink.bind(_this,item.id,item.source)}><img src={item.imgUrl}/></a>
                            <a {...eventFun(pageName, model, item.id)} href={item.url} onClick={_this.clickLink.bind(_this,item.id,item.source)}><h3>{item.name}</h3></a>
                            <div styleName="source">
                                <span styleName="icon"><img src={icons[item.source]} alt=""/></span>
                                <span styleName="return">预估返{item.orderNum}%</span>
                            </div>
                            <div styleName="price">
                              ￥{priceFormat(item.finalPrice)}
                            </div>
                        </div>)
                    })
                  }</div>
                </a>)
              })
            }
          </ReactSwipe>
        }

        return (
          <div className="swipe-wrapper" id={`stuffs${this.props.level}`}>
            <div className="swipe-title">{this.props.title || ""}</div>
            {swipeDom}
            {
              total && (<SwiperPagination active={this.state.swiperActive} swipers={pageswipe}></SwiperPagination>)
            }
          </div>
        )
    }

}
MultiSwipe.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default CSSModules(MultiSwipe, styles, { allowMultiple: true });
