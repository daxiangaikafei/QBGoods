import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun } from 'libs/util';
import GoodsIscroll from "components/swipe/GoodsIscroll";
import GoodsTab from "components/swipe/GoodsTab";
import {SpecialList,Icon,Tabs,SpecialToTip} from 'ui';
import Swipe from "components/swipe/swipe";
import { fetchPosts } from "components/common/fetch";
import PopUp from "components/popup/index";



class FrontMatter extends Component {
  headimg = require('static/imgs/special/front.png');
  bannerpic = require('static/imgs/gatherGoods/banner.png');
  pageName = '121';
  tabsConfig = {
    names : [
      {
        key:'相识推荐',
        action: 'getLikeList'
      },
      {
        key:'关联推荐',
        action: 'getRelatedList'
      }

    ], //required
    model : 'gatherGoods',
    statusKey : 'tabActive'             //the statusKey in the model, default 'tabActive'
  }
  constructor(props) {
    super(props)
    let infoDatas ={};// this.props.location && this.props.location.state.infos;
    console.log(infoDatas);

    this.tabsConfig.stuffId = props.params.id;
    this.state = {
        infoDatas: infoDatas,
        stuffId: props.params.id,
        items:[],
        page: 1,
        isLoading: false,
        isEnd:false
    }
    // this.getInfo = this.getInfo.bind(this);
    this.getData = this.getData.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  componentDidMount() {
    this.getInfo();
    // this.props.getLikeList(this.state.brandId);
  }
  componentDidUpdate() {
  }
  touchMove(that,args){
      let {items,isEnd} = this.state;
      let cTop = args[0];

      if(that.min-args[0]>30 && !isEnd){
          this.getData(1);
      }
  }
  getData = () => {
    let model = this.tabsConfig.model
    let { loading, page, isEnd, tabActive } = this.props
    let action = this.tabsConfig.names[tabActive].action

    if ((page !== 0 && loading === true) || (isEnd)) {
      return;
    }
    this.props.action({type:`${model}/${action}`,page:++page,stuffId:this.state.stuffId})
  }
  getInfo = () => {
    let {infoUrl} = this.props;
    let {isLoading,stuffId} = this.state;

    if(isLoading){
        return;
    }
    this.setState({
        isLoading:true
    })
    let _this = this;
    let param = Object.assign({},{ stuffId: stuffId});
    return fetchPosts(infoUrl ,param,"GET").then((data)=>{
        if(data.responseCode===1000){
          _this.setState({
              isLoading:false,
              infoDatas: data.data
          });
        }else{
             _this.setState({
                isLoading:false
              });
        }
     }).catch(function(){
                _this.setState({
                    isLoading:false});
     });
  }
  directbuyHandler = () => {
    let {source,linkUrl,coupon} = this.state.infoDatas;

    PopUp.show(
            (<SpecialToTip source={source}  />),{maskClosable:true, isBgAlpha: true}
    );

    // if(coupon){
    //   window.location.href = 'newtab://goodstuff.qbao.com/goods?url=' + coupon.link;
    //   setTimeout(() => {
    //     PopUp.hide(
    //         (<SpecialToTip source={source} />), { maskClosable: false, isBgAlpha: false }
    //     );
    //   },1000);
    // }else{
      // window.location.href = 'newtab://goodstuff.qbao.com/goods?url=' + this.state.infoDatas.linkUrl;
      setTimeout(() => {
        if (QBFK.Util.getDevice() === 'android' && source == 'jd') {
            window.open(coupon?coupon.link:linkUrl);
        } else {
            window.location.href = 'newtab://goodstuff.qbao.com/goods?url=' + (coupon?coupon.link:linkUrl);
        }
        PopUp.hide(
            (<SpecialToTip source={source} />), { maskClosable: false, isBgAlpha: false }
        );
      },1000);
    // }
  }
  render() {
    let noDataTip = "--已经到底了--";
    if(this.props.productList.length===0){
      noDataTip = "--敬请期待--"
    }
    let noTip = null;
    if(this.props.loading){
      noTip = <div className="no-up">--加载中--</div>;
    }else{
      if(this.props.page>=1&&this.props.isEnd===true){
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
    }
    let infosale = null, footertext = null;
    if(this.state.infoDatas.coupon){
      infosale = <div className="info-sale">
        <p className="info-price">券后 ￥{priceFormat(this.state.infoDatas.finalPrice - this.state.infoDatas.coupon.value)}</p>
        <p className="info-orderNum">销量 {this.state.infoDatas.saleCount}</p>
      </div>;
      footertext = <div className="special-mrontmatter-footer-text">
        <p className="footer-price">券后 ￥{priceFormat(this.state.infoDatas.finalPrice - this.state.infoDatas.coupon.value)}</p>
        <p className="footer-rebateValue">{this.state.infoDatas.rebateValue}</p>
      </div>;
    }else{
      infosale = <div className="info-sale">
        <p className="info-price">￥{priceFormat(this.state.infoDatas.price)}</p>
        <p className="info-orderNum">销量 {this.state.infoDatas.saleCount}</p>
      </div>;
      footertext = <div className="special-mrontmatter-footer-text">
        <p className="footer-price">￥{priceFormat(this.state.infoDatas.price)}</p>
        <p className="footer-rebateValue">{this.state.infoDatas.rebateValue}</p>
      </div>;
    }
    return (
      <div>
        <div className="special-mrontmatter-container">
          <Swipe  {...props} >
            <div className="special-mrontmatter-warpper">
              <div className="special-swiper">
                <img src={this.state.infoDatas.imgUrl}/>
                <div className="goods-text">
                  <img src={this.headimg}/>
                </div>
              </div>
              <div className="special-infos">
                <p className="info-name">{this.state.infoDatas.name}</p>
                {infosale}
                {this.state.infoDatas.copyWriter  ? <p className="info-copyWriter">{this.state.infoDatas.copyWriter}</p> : '' }
              </div>
              <Tabs
                tabsConfig={this.tabsConfig}
                eventConfig={{
                  pageName: '101',
                  model: 'gather_goods_tab'
                }}/>
              <SpecialList listConfig={{temp: 'frontMatter'}} listData={this.props.productList} eventConfig={{pageName:this.pageName,model:`hot_goods_${this.state.active}_products`}}/>
              { noTip }
            </div>
          </Swipe>
        </div>
        <div className="special-mrontmatter-footer">
          {footertext}
          <div className="special-mrontmatter-directbuy" onClick={this.directbuyHandler} {...eventFun(this.pageName, 'front_matter', this.state.infoDatas.id)} >
            {this.state.infoDatas.coupon  ? '领券购买' : '直接购买' }
          </div>
        </div>
      </div>
    )
  }
};
FrontMatter.contextTypes = {
  router: React.PropTypes.object.isRequired
};
FrontMatter.defaultProps = {
  infoUrl: "/stuff/detail.do",
  infoDatas:{
    brandName:"",
    offSale:"",
    imgUrl:""
  },
  pageSize: 8
}
function mapStateToProps(state) {
  return state.gatherGoods;
}

function mapDispatchToProps(dispatch) {
  return {
    action(type) {
      dispatch(type);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(FrontMatter, styles, {allowMultiple: true}));
