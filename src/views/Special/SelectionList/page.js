import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun, icons } from 'libs/util';
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
        specialId: props.params.id || "",
        items:[],
        page: 1,
        isLoading: false,
        isEnd:false,
        pageData: {},
        actList: [
          {
            "id": 524834100996222,
            "orderNum": 2670,
            "name": "艾美特烘干机家用干衣机宝宝衣服烘干暖风干衣双层烘衣机迪士尼版",
            "finalPrice": 250,
            "price": 300,
            "coupon": {
              "type": "通用券 ",
              "value": "50元券",
              "link": "https://shop.m.taobao.com/shop/coupon.htm?seller_id=683584142&activityId=c55c519fae404041ae8ec5715007df1e"
            },
            "imgUrl": "http://img03.taobaocdn.com/bao/uploaded/i3/TB1kSlkQpXXXXcBXXXXXXXXXXXX_!!0-item_pic.jpg",
            "rebateValue": "返7%宝券",
            "source": "tmall",
            "url": "https://s.click.taobao.com/t?e=m%3D2%26s%3DTpdXq7a00WwcQipKwQzePOeEDrYVVa64…D6shoT2KTDpJYNrOmOgn7VQfkJRMqt8joULH05QTse17t%2F2uOFUhDVzp%2B3EqY%2Bakgpmw"
          },
          {
            "id": 45197829623222,
            "orderNum": 868,
            "name": "海尔干湿两用吸尘器家用桶式 大功率手持强力宾馆商用机HC-T3143R",
            "finalPrice": 250,
            "price": 300,
            "coupon": {
              "type": "通用券 ",
              "value": "50元券",
              "link": "https://shop.m.taobao.com/shop/coupon.htm?seller_id=683584142&activityId=c55c519fae404041ae8ec5715007df1e"
            },
            "imgUrl": "http://img02.taobaocdn.com/bao/uploaded/i2/TB1IAZiQXXXXXX8aXXXXXXXXXXX_!!0-item_pic.jpg",
            "rebateValue": "返5%宝券",
            "source": "tmall",
            "url": "https://s.click.taobao.com/t?e=m%3D2%26s%3DIadiMZ1BifocQipKwQzePOeEDrYVVa64…DieJD6shoT2KTDpJYNoKenufVVo5l9O8pqgPSmsRHLy28QnGh7Uy3kkV4La3FnEqY%2Bakgpmw"
          },
          {
            "id": 45197829623222,
            "orderNum": 868,
            "name": "海尔干湿两用吸尘器家用桶式 大功率手持强力宾馆商用机HC-T3143R",
            "finalPrice": 250,
            "price": 300,
            "coupon": {
              "type": "通用券 ",
              "value": "50元券",
              "link": "https://shop.m.taobao.com/shop/coupon.htm?seller_id=683584142&activityId=c55c519fae404041ae8ec5715007df1e"
            },
            "imgUrl": "http://img02.taobaocdn.com/bao/uploaded/i2/TB1IAZiQXXXXXX8aXXXXXXXXXXX_!!0-item_pic.jpg",
            "rebateValue": "返5%宝券",
            "source": "tmall",
            "url": "https://s.click.taobao.com/t?e=m%3D2%26s%3DIadiMZ1BifocQipKwQzePOeEDrYVVa64…DieJD6shoT2KTDpJYNoKenufVVo5l9O8pqgPSmsRHLy28QnGh7Uy3kkV4La3FnEqY%2Bakgpmw"
          },
          {
            "id": 45197829623222,
            "orderNum": 868,
            "name": "海尔干湿两用吸尘器家用桶式 大功率手持强力宾馆商用机HC-T3143R",
            "finalPrice": 250,
            "price": 300,
            "coupon": {
              "type": "通用券 ",
              "value": "50元券",
              "link": "https://shop.m.taobao.com/shop/coupon.htm?seller_id=683584142&activityId=c55c519fae404041ae8ec5715007df1e"
            },
            "imgUrl": "http://img02.taobaocdn.com/bao/uploaded/i2/TB1IAZiQXXXXXX8aXXXXXXXXXXX_!!0-item_pic.jpg",
            "rebateValue": "返5%宝券",
            "source": "tmall",
            "url": "https://s.click.taobao.com/t?e=m%3D2%26s%3DIadiMZ1BifocQipKwQzePOeEDrYVVa64…DieJD6shoT2KTDpJYNoKenufVVo5l9O8pqgPSmsRHLy28QnGh7Uy3kkV4La3FnEqY%2Bakgpmw"
          },
          {
            "id": 45197829623222,
            "orderNum": 868,
            "name": "海尔干湿两用吸尘器家用桶式 大功率手持强力宾馆商用机HC-T3143R",
            "finalPrice": 250,
            "price": 300,
            "coupon": {
              "type": "通用券 ",
              "value": "50元券",
              "link": "https://shop.m.taobao.com/shop/coupon.htm?seller_id=683584142&activityId=c55c519fae404041ae8ec5715007df1e"
            },
            "imgUrl": "http://img02.taobaocdn.com/bao/uploaded/i2/TB1IAZiQXXXXXX8aXXXXXXXXXXX_!!0-item_pic.jpg",
            "rebateValue": "返5%宝券",
            "source": "tmall",
            "url": "https://s.click.taobao.com/t?e=m%3D2%26s%3DIadiMZ1BifocQipKwQzePOeEDrYVVa64…DieJD6shoT2KTDpJYNoKenufVVo5l9O8pqgPSmsRHLy28QnGh7Uy3kkV4La3FnEqY%2Bakgpmw"
          },
          {
            "id": 45197829623222,
            "orderNum": 868,
            "name": "海尔干湿两用吸尘器家用桶式 大功率手持强力宾馆商用机HC-T3143R",
            "finalPrice": 250,
            "price": 300,
            "coupon": {
              "type": "通用券 ",
              "value": "50元券",
              "link": "https://shop.m.taobao.com/shop/coupon.htm?seller_id=683584142&activityId=c55c519fae404041ae8ec5715007df1e"
            },
            "imgUrl": "http://img02.taobaocdn.com/bao/uploaded/i2/TB1IAZiQXXXXXX8aXXXXXXXXXXX_!!0-item_pic.jpg",
            "rebateValue": "返5%宝券",
            "source": "tmall",
            "url": "https://s.click.taobao.com/t?e=m%3D2%26s%3DIadiMZ1BifocQipKwQzePOeEDrYVVa64…DieJD6shoT2KTDpJYNoKenufVVo5l9O8pqgPSmsRHLy28QnGh7Uy3kkV4La3FnEqY%2Bakgpmw"
          },
          {
            "id": 45197829623222,
            "orderNum": 868,
            "name": "海尔干湿两用吸尘器家用桶式 大功率手持强力宾馆商用机HC-T3143R",
            "finalPrice": 250,
            "price": 300,
            "coupon": {
              "type": "通用券 ",
              "value": "50元券",
              "link": "https://shop.m.taobao.com/shop/coupon.htm?seller_id=683584142&activityId=c55c519fae404041ae8ec5715007df1e"
            },
            "imgUrl": "http://img02.taobaocdn.com/bao/uploaded/i2/TB1IAZiQXXXXXX8aXXXXXXXXXXX_!!0-item_pic.jpg",
            "rebateValue": "返5%宝券",
            "source": "tmall",
            "url": "https://s.click.taobao.com/t?e=m%3D2%26s%3DIadiMZ1BifocQipKwQzePOeEDrYVVa64…DieJD6shoT2KTDpJYNoKenufVVo5l9O8pqgPSmsRHLy28QnGh7Uy3kkV4La3FnEqY%2Bakgpmw"
          },
          {
            "id": 45197829623222,
            "orderNum": 868,
            "name": "海尔干湿两用吸尘器家用桶式 大功率手持强力宾馆商用机HC-T3143R",
            "finalPrice": 250,
            "price": 300,
            "coupon": {
              "type": "通用券 ",
              "value": "50元券",
              "link": "https://shop.m.taobao.com/shop/coupon.htm?seller_id=683584142&activityId=c55c519fae404041ae8ec5715007df1e"
            },
            "imgUrl": "http://img02.taobaocdn.com/bao/uploaded/i2/TB1IAZiQXXXXXX8aXXXXXXXXXXX_!!0-item_pic.jpg",
            "rebateValue": "返5%宝券",
            "source": "tmall",
            "url": "https://s.click.taobao.com/t?e=m%3D2%26s%3DIadiMZ1BifocQipKwQzePOeEDrYVVa64…DieJD6shoT2KTDpJYNoKenufVVo5l9O8pqgPSmsRHLy28QnGh7Uy3kkV4La3FnEqY%2Bakgpmw"
          },
          {
            "id": 15540414636222,
            "orderNum": 17899,
            "name": "Joyoung/九阳 DJ12B-A603DG豆浆机全自动家用多功能正品豆将特价",
            "finalPrice": 299,
            "price": 349,
            "coupon": {
              "type": "通用券 ",
              "value": "50元券",
              "link": "https://shop.m.taobao.com/shop/coupon.htm?seller_id=683584142&activityId=c55c519fae404041ae8ec5715007df1e"
            },
            "imgUrl": "http://img03.taobaocdn.com/bao/uploaded/i3/TB19OIpPVXXXXbpapXXXXXXXXXX_!!0-item_pic.jpg",
            "rebateValue": "返10%宝券",
            "source": "tmall",
            "url": "https://s.click.taobao.com/t?e=m%3D2%26s%3DrzH%2FJhN8XmgcQipKwQzePOeEDrYVVa…DieJD6shoT2KTDpJYNpcN%2BRcH1aDcAnG09SpU71eQxulvlKLYhYKOVHgOwqszSGFCzYOOqAQ"
          }
        ],
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

      return fetchPosts(url ,{floorId:this.props.params.id},"GET").then((data)=>{
          if(data.responseCode===1000){
              this.setState({
                pageData: data.data,
                isLoading:false,isEnd: true
              })
              if(data.data.name){
                document.title = data.data.name;
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
    if(this.state.items.length===0){
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
