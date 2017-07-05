import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun } from 'libs/util';
import Swipe from "components/swipe/swipe";
import { fetchPosts } from "components/common/fetch";
import { Icon,MultiSwipe,SpecialTab } from 'ui'

class Women extends Component {
  bannerpic = require('static/imgs/gatherGoods/banner.png');
  pageName = '118'
  constructor(props) {
    super(props)

    this.state = {
        bannerId: props.params.id || "",
        items:[],
        active: 0,
        activeId: 0,
        isLoading: false
    }
    this.getData = this.getData.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate() {
  }
  touchMove(that,args){

  }
  tabCallback  = (active) => {
    if(this.state.active === active){
      return;
    }
    this.setState({
        active: active
    });
  }
  getData(){
      let {listUrl} = this.props;
      let {items,isLoading,bannerId} = this.state;

      if(isLoading){
          return;
      }
      this.setState({
          isLoading:true
      })
      let _this = this;
      let param = Object.assign({},{ bannerId: bannerId});

      return fetchPosts(listUrl ,param,"GET").then((data)=>{
          if(data.responseCode===1000){
            if(data.data.name){
              document.title = data.data.name;
            }
            _this.setState({
                isLoading:false,
                bannerpic: data.data.imgUrl||_this.bannerpic,
                items:data.data.details
            });
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
    let noTip = <div className="no-up">-- 已经到底了 --</div>;
    let props = {
        property:"translateY",
        className:"scroll-warpper",
        tag:"ul",
        min:"auto",
        stopPro:false,
        vertical:true,
        touchMove:this.touchMove
    }
    let _this = this;
    let tabs = [],tabsdom = null;
    this.state.items.map(function(item,index){
      tabs.push({
        id: item.level,
        name: item.title
      });
    });
    if(tabs.length>0){
      tabsdom = <SpecialTab  ref="tap" tabCallback={this.tabCallback} active={this.state.active} tabs={tabs} eventConfig={{pageName:_this.pageName,model:"women_tab"}}></SpecialTab>;
    }
    // <Swipe  {...props} ></Swipe>
    return (

        <div className="special-container special-women-container">
          <div className="women-banner">
            <img src={this.state.bannerpic} />
          </div>
          <div className="time-limit-tabs">
            {tabsdom}
          </div>
          {
            this.state.items.map(function(item, index){
              return (<MultiSwipe eventConfig={{pageName:_this.pageName,model:`women_products`}} key={index} level={ index } title={ item.title } swipes={item.stuffs} />)
            })
          }
          { noTip }
        </div>

    )
  }
};
Women.defaultProps = {
  listUrl: "/stuff/ad/banner/detail.do"
}
export default CSSModules(Women,styles,{allowMultiple:true});
