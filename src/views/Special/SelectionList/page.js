import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun, icons, getParamByName } from 'libs/util';
import GoodsTab from "components/swipe/GoodsTab";
import {SpecialList,SwiperPagination,Icon} from 'ui';
import Swipe from "components/swipe/swipe";
import { fetchPosts } from "components/common/fetch";
import ReactSwipe from 'react-swipe';
import { Banner } from 'ui'
import { Tabs } from 'ui'
import { ProductList } from 'ui'
import Modal from "components/modal/index";
import PopUp from "components/popup/index";

class SelectionList extends Component {
  pageName = '123'
 
  constructor(props) {
    super(props)

    this.state = {
        specialId: getParamByName('id') || props.params.id || 0,
        items:[],
        page: 1,
        isLoading: false,
        isEnd:false,
        pageData: {},
        actList: [],
    }
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate() {
  }
  touchMove = (that,args) => {
    // debugger
    // console.log('top',args[0])
    !this.height && (this.height = that.element.offsetHeight)
    if (-args[0]>this.height) {
      !this.state.isTopShow && this.setState({
        isTopShow: true
      })
      !this.swipe && (this.swipe = that)
    } else {
      this.state.isTopShow && this.setState({
        isTopShow: false
      })
    }
    // let offsetTop = this.refs.actTab.offsetTop
    // if (-args[0]>offsetTop) {
    //   this.setState({
    //     isTabFixed: true,
    //   })
    // } else {
    //   this.setState({
    //     isTabFixed: false,
    //   })
    // }

    let {items,isEnd} = this.state;
    let cTop = args[0];

    // if(that.min-args[0]>30 && !isEnd){
    //     this.getData(1);
    // }
  }
  touchEnd = (top) => {
    if (-top>this.height) {
      !this.state.isTopShow && this.setState({
        isTopShow: true
      })
    } else {
      this.state.isTopShow && this.setState({
        isTopShow: false
      })
    }

    // let offsetTop = this.refs.actTab.offsetTop
    // if (-top>offsetTop) {
    //   this.setState({
    //     isTabFixed: true,
    //   })
    // } else {
    //   this.setState({
    //     isTabFixed: false,
    //   })
    // }
  }
  actTabOnClick = actTabActive => {
    if(this.state.actTabActive === actTabActive){
      return;
    }
    this.setState({
      actTabActive
    });
  }
  btnRuleOnClick = () => {
    this.setState({
      isModalShow: true
    })
  }
  btnRuleCloseOnClick = () => {
    this.setState({
      isModalShow: false
    })
  }
  btnTopOnClick = () => {
    this.swipe.moveTo(0)
    this.state.isTopShow && this.setState({
      isTopShow: false
    })
  }
  tabCallback  = (active) => {
    if(this.state.active === active){
      return;
    }
    this.setState({
        active: active
    });
    this.getData(1, {
      page:1,
      cId: this.state.goodsTabs[active].id
    });
  }

  getData=(num,searchParam)=>{
      const {url} = this.props;
      let {page,items,isLoading,isEnd} = this.state;

      if(isLoading){
          return;
      }
      this.setState({
          isLoading:true
      })
      // let param = Object.assign({},{page: page, cId: activeId, size: pageSize}, searchParam);
      // page = param.page;

      return fetchPosts(url ,{floorId:this.state.specialId},"GET").then((data)=>{
          if(data.responseCode===1000){
              this.setState({
                pageData: data.data.goods,
                isLoading:false,isEnd: true
              })
              if(data.data.floor.name){
                document.title = data.data.floor.name;
              }
              // if(page===1){
              //   _this.setState({
              //       isLoading:false,
              //       imgURL: data.imgUrl||imgURL,
              //       activeId: param.cId,
              //       page: page + num,
              //       isEnd: data.data.length < pageSize ?true:false,
              //       items:data.data
              //   });
              // }else{
              //   _this.setState({
              //       isLoading:false,
              //       imgURL: data.imgUrl||imgURL,
              //       activeId: param.cId,
              //       page: page + num,
              //       isEnd: data.data.length < pageSize ?true:false,
              //       items:items.concat(data.data)
              //   });
              // }
          }else{
               this.setState({
                  isLoading:false,items:[],isEnd: true});
          }
       }).catch(function(){
                  this.setState({
                      isLoading:false,});
       });
  }
  render() {
    const { pageData } = this.state
    let noDataTip = "--已经到底了--";
    if(this.state.pageData.length===0){
      noDataTip = "--敬请期待--"
    }
    let noTip = null;
    if(this.state.isLoading){
      noTip = <div className="no-up">--加载中--</div>;
    }else{
      if(this.state.page>=1&&this.state.isEnd===true){
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
        touchMove:this.touchMove,
        touchEnd:this.touchEnd,
    }
    return (
      <Swipe style={{ background:'#fff'}} {...props} >
        <div className="selection-container">
          <ProductList 
            style={{backgroundColor:'#fff'}}
            listConfig={{temp: 'selection'}} 
            listData={this.state.pageData} 
            eventConfig={{pageName:this.pageName,model:`selection_list_${this.state.active}_products`}}/>
        </div>
        { noTip }
      </Swipe>
    )
  }

};

SelectionList.defaultProps = {
  url: "/cms/activity/goods.do",
  pageSize: 8
}
export default CSSModules(SelectionList,styles,{allowMultiple:true});
