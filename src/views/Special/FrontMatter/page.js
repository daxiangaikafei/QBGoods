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
import {SpecialList,Icon,Tabs} from 'ui';
import Swipe from "components/swipe/swipe";
import { fetchPosts } from "components/common/fetch";

class FrontMatter extends Component {
  headimg = require('static/imgs/special/front.png');
  bannerpic = require('static/imgs/gatherGoods/banner.png');
  tabsConfig = {
    names : [
      {
        key:'相识推荐',
        action: 'getLikeList'
      },
      {
        key:'关联推荐',
        action: 'getLikeList'
      }

    ], //required
    model : 'gatherGoods',
    statusKey : 'tabActive'             //the statusKey in the model, default 'tabActive'
  }
  constructor(props) {
    super(props)
    let infoDatas = this.props.location && this.props.location.state.infos;
    console.log(infoDatas);
    this.state = {
        infoDatas: infoDatas,
        brandId: props.params.id,
        items:[],
        page: 1,
        isLoading: false,
        isEnd:false
    }
    this.getData = this.getData.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  componentDidMount() {
    // this.getData(1);
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
    this.props.action({type:`${model}/${action}`,page:++page})
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
    // console.log("this.props.productList", this.props.productList);
    return (
      <div>
        <div className="special-mrontmatter-container">
          <div>
            <Swipe  {...props} >
              <div className=" special-mrontmatter-warpper">
                <div className="special-swiper">
                  <img src={this.bannerpic}/>
                  <div className="goods-text">
                    <img src={this.headimg}/>
                  </div>
                </div>
                <div className="special-infos">
                  <p className="info-name">{this.state.infoDatas.name}</p>
                  <div className="info-sale">
                    <p className="info-price">券后 ￥{priceFormat(this.state.infoDatas.finalPrice)}</p>
                    <p className="info-orderNum">销量 {this.state.infoDatas.orderNum}</p>
                  </div>
                </div>
                <Tabs
                  tabsConfig={this.tabsConfig}
                  eventConfig={{
                    pageName: '101',
                    model: 'gather_goods_tab'
                  }}/>
                <SpecialList listConfig={{temp: 'nina'}} listData={this.props.productList} eventConfig={{pageName:this.pageName,model:`hot_goods_${this.state.active}_products`}}/>
                { noTip }
              </div>
            </Swipe>
          </div>

        </div>
        <div className="special-mrontmatter-footer"></div>
      </div>
    )
  }
};
FrontMatter.contextTypes = {
  router: React.PropTypes.object.isRequired
};
FrontMatter.defaultProps = {
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
    },
    getLikeList(id) {
      dispatch({ type: 'gatherGoods/getLikeList', id });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(FrontMatter, styles, {allowMultiple: true}));
