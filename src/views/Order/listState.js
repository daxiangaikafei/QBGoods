'use strict'
import * as React from 'react';
import { Link } from 'react-router'
//import * as _ from "lodash";

import Swipe from "components/swipe/swipe";

import "./list.less";

import {fetchPosts} from "components/common/fetch";
import NoOrder from "./noOrder";
import InfoState from "./infoState";
import { eventFun } from 'libs/util'

import Modal from "components/modal/index";
import PopUp from "components/popup/index";


const RebateStatus ={
    "-1":"记录订单",
    0:"待返宝券",
    1:"已返宝券",
    2:"返宝券被收回",
    3:"返宝券失败"
}
const RebateStatusShort={
    "-1":"记录",
    0:"待返",
    1:"已返",
    2:"",
    3:""
}

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            page:0,
            isLoading:true,
            oneHeight:false,
            isEnd:false,
        }

        this.getData = this.getData.bind(this);
        this.touchMove = this.touchMove.bind(this);

        this.handClick = this.handClick.bind(this);
        this.doDel = this.doDel.bind(this);
        this.toInfo = this.toInfo.bind(this);

    }
    componentWillMount() {

        this.getData(1);
    }
    getData(num){
        let {pageSize,url,searchParam,upData} = this.props;
        let {page,items,isLoading,isEnd} = this.state;
        if((page!==0&&isLoading===true)||(isEnd)){
            return;
        }
        this.setState({
            isLoading:true
        })
        let _this = this;
        let param = Object.assign({},searchParam,{page,size:pageSize})
        page += num;
        return fetchPosts(url,param,"GET").then((data)=>{
                console.log(data);
                if(data.responseCode===1000){
                    _this.setState({
                        isLoading:false,
                        page,
                        isEnd:data.data.length<pageSize?true:false,
                        items:items.concat(data.data)
                    });
                    upData(data);
                }else{
                     _this.setState({
                        isLoading:false,});
                }



         }).catch(function(){
                    _this.setState({
                        isLoading:false,});
         });
    }

    touchMove(that,args){
        console.log(that,args);
        let {items} = this.state;
        if(that.min-args[0]>-300){
            this.getData(1);
        }
    }
    doDel(id){
        let _this = this;
        let newId= Number(id);

        Modal.confirm("提示","亲，您真的确定要取消申诉吗？").then((data)=>{
            if(data!=="Ok"){
                return;
            }
            fetchPosts("/stuff/appeal/cancel.do",{"appealId":id},"GET").then((data)=>{
                    if(data.responseCode===1000){
                      let {items} = _this.state;
                      let i = 0,j = items.length,$lis=[];
                      //debugger
                      while(i<j){
                          console.error(items[i])
                          if(items[i].appealId===newId){
                              items.splice(i,1);
                              break;
                          }
                          i+=1;
                      }
                      Modal.alert("取消","成功");
                      _this.setState({
                          items
                      })
                    }else{
                            Modal.alert("取消","失败");

                    }



            }).catch(function(error){
                    Modal.alert("取消","失败");
            });
        });

    }
    infoClose(){
        PopUp.hide();
    }
    toInfo(appealId){
      var appData ={ rebateStatus: 0 };
      var _this = this;
      fetchPosts("/stuff/appeal/detail.do", {"appealId": appealId},"GET").then((data)=>{

          if(data.responseCode===1000){
            console.log("appealdata", data);
            data.data.appealStatus = 3;
            PopUp.show(
                (<InfoState data={data.data} onClick={_this.infoClose} />),{maskClosable:true}
            );
          }else{
            Modal.alert("查看详情","失败");
          }
       }).catch(function(){
         Modal.alert("查看详情","失败");
       });
    }
    doApply(id){
      ///stuff/appeal/right.do
      console.log("doApply");
      fetchPosts("/stuff/appeal/right.do",{},"GET").then((data)=>{

          if(data.success){
            this.context.router.push({"pathname": "Appeal", state: { appealId: id }});
          }else{
              Modal.alert("申请","今日不能提交申诉");
          }
      }).catch(function(error){
          Modal.alert("申请","失败");
      });
    }
    doToAppeal(id){
      fetchPosts("/api/stuff/appealDetail.json", {"appealId": id},"GET").then((data)=>{
          console.log("appealdata", data);
          if(data.responseCode===1000){
            this.context.router.push({"pathname": "Appeal", state: { appealData: data.data }});
          }else{

          }
       }).catch(function(){

       });
    }
    handClick(event){

        let className = event.target.className;
        let id = event.target.dataset.id;
        console.log("className:",className,"id",id);
        //debugger
        if(className==='js_del'){
            this.doDel(id);
        }else if(className==="btn-begin"){
            this.doApply();
        }else if(className==='js_angin'){
          Modal.alert("提示","欢迎加入有好货官方群：566261195");
        }else if(className.indexOf('js_info') > -1){
            this.toInfo(id);
        }else if(className==="js_appeal"){
          this.doApply(id);
        }
    }

    render() {

        let {items,isLoading,page,isEnd} = this.state;
        let i =0,j=items.length,$lis = [];
        while(i<j){
            console.log("----");
            let item = items[i],totalPrice=0,totalSb=0;
            i+=1;

            let l=0,m=item.item.length,$subItem=[];
            while(l<m){
                let subItem = item.item[l];
                l+=1;

                totalPrice = (totalPrice*100+subItem.price*subItem.stuffNum*100)/100;
                totalSb = (totalSb*100+Number(subItem.rebateValue)*100)/100

                //totalPrice += subItem.price*subItem.stuffNum;
                $subItem.push(
                    <div key={l} className="order-item-body">
                        <div className="item-image">
                            <img src={subItem.imgUrl}/>
                        </div>
                        <p>{subItem.name}</p>
                        <span>￥{subItem.price}</span>
                    </div>
                )
            }
            let rebateStatus = item.appealStatus;
            let short = RebateStatusShort[rebateStatus];
            $lis.push(
                <li key={item.id} className="order-item"   >
                    {
                      item.item.length <= 0 ?
                        <a href={item.clickUrl} target="_blank" >
                          <p className="order-item-top">
                            <p>{ item.orderId }</p>
                            <p>{ item.appealTime }</p>
                          </p>
                          <p className="order-item-tip">亲，您好，我们会在24小时内处理尽快处理的，处理完毕后，我们会在我的消息及时通知您噢,  欢迎加入有好货官方群咨询，群1：566261195，群2： 641361648</p>
                        </a>
                      :<a href={item.clickUrl} target="_blank" >
                            <p className="order-item-top">
                              <p>{ item.orderId }</p>
                              <p>{ item.appealTime }</p>
                            </p>
                            {$subItem}
                            <p className="order-item-info">共{item.stuffNum}件商品，合计:<em><i>￥</i>{totalPrice}</em>
                            {totalSb && '已返'}
                            {totalSb &&(<span>{totalSb}宝券</span>)}
                            </p>
                        </a>
                      }

                    <div className="order-item-todo" >
                        {(rebateStatus < 3 && item.item.length != 0) &&(<button data-id={item.appealId} className="js_del">取消申诉</button>)}
                        {rebateStatus===13&&(<button data-id={item.appealId} className="js_angin">再次申诉</button>)}
                        <button data-id={item.appealId} className={rebateStatus!==3 ? 'js_info info_red' : 'js_info'}>申诉详情</button>
                    </div>
                </li>
            )
        }

        let props = {
            property:"translateY",
            className:"my-order-list list-state",
            tag:"ul",
            min:"auto",
            stopPro:false,
            vertical:true,
            touchMove:this.touchMove
            //step:200
        }
        if(j===0&&isLoading===false){
            return(<div className="my-order-list my-order-list-state" onClick={this.handClick}><div className="btns"><div className="btn-begin">立即申诉</div></div><NoOrder tipText={'<p>亲，购物后有问题，可以立即申诉哟～</p><p>快去购物吧。</p>'}/></div>)
        }else if(j===0&&page===0){
            return (<div></div>)
        }
        //return ({})
        return (
                <Swipe {...props} onClick={this.handClick}>
                    <div className="btns"><div className="btn-begin">立即申诉</div></div>
                    {$lis}
                    {isLoading===true&&(<div className="no-up">Loading</div>)}
                    {page>1&&isEnd===true&&(<div className="no-up">已经没有更新了</div>)}
                </Swipe>
        )
    }
};
OrderList.contextTypes = {
  router: React.PropTypes.object.isRequired
};
OrderList.defaultProps = {
    pageSize:20,
    url:"/stuff/appeal/list.do",
    // url:"/api/stuff/appeal.json",
    searchParam:{}
}

module.exports = OrderList;
