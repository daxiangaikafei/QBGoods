'use strict'
import * as React from 'react';

//import * as _ from "lodash";

import Swipe from "components/swipe/swipe";

import "./list.less";

import {fetchPosts} from "components/common/fetch";
import NoOrder from "./noOrder";
import Info from "./info";
import { eventFun } from 'libs/util'

import Modal from "components/modal/index";
import PopUp from "components/popup/index";


const RebateStatus ={
    "-1":"记录订单",
    0:"待返返利",
    1:"已返返利",
    2:"返利被收回",
    3:"返利失败"
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
        Modal.confirm("删除","确认删除吗？").then((data)=>{
            console.log(data);
            if(data!=="Ok"){
                return;
            }
            fetchPosts("/stuff/order/delOrder.do",{"id":id},"GET").then((data)=>{
                    if(data.responseCode===1000){
                    let {items} = _this.state;
                    let i = 0,j = items.length,$lis=[];
                    //debugger
                    while(i<j){
                        console.error(items[i])
                        if(items[i].id===newId){
                            items.splice(i,1);
                            break;
                        }
                        i+=1;
                    }
                    Modal.alert("删除","成功");
                    _this.setState({
                        items
                    })
                    }else{
                            Modal.alert("删除","失败");

                    }



            }).catch(function(error){
                    Modal.alert("删除","失败");
            });
        });

    }
    infoClose(){
        PopUp.hide();
    }
    toInfo(id){


            return fetchPosts("/stuff/order/userOrder.do",{id},"GET").then((data)=>{
                    if(data.responseCode===1000){
                    PopUp.show(
                            (<Info data={data.data} onClick={this.infoClose} />),{maskClosable:true}
                    );
                    }else{
                            Modal.alert("查看详情","失败");
                    }

            }).catch(function(){
                    Modal.alert("查看详情","失败");
            });

       // debugger;

       //PopUp.show(
    }
    handClick(event){

        let className = event.target.className;
        let id = event.target.dataset.id;
        console.log("className:",className,"id",id);
        //debugger
        if(className==='js_del'){
            this.doDel(id);
        }else if(className==='js_info'){

            this.toInfo(id);
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

                totalPrice = (totalPrice*100+subItem.finalPrice*subItem.stuffNum*100)/100;
                totalSb = (totalSb*100+Number(subItem.rebateValue)*100)/100

                //totalPrice += subItem.price*subItem.stuffNum;
                $subItem.push(
                    <div key={l} className="order-item-body">
                        <div className="item-image">
                            <img src={subItem.imgUrl}/>
                        </div>
                        <p>{subItem.name}</p>
                        <span>￥{subItem.finalPrice}</span>
                    </div>
                )
            }
            let rebateStatus = item.rebateStatus;
            let short = RebateStatusShort[rebateStatus];
            $lis.push(
                <li key={item.id} className="order-item"   >
                    <a href={item.clickUrl} target="_blank" {...eventFun('109', 'order_products', item.item.stuffId)}>
                        <p className="order-item-top">{RebateStatus[rebateStatus]}</p>
                        {$subItem}
                        <p className="order-item-info">共{item.stuffNum}件商品，合计:<em><i>￥</i>{totalPrice}</em>
                          {rebateStatus<2&&short}
                          <span><em><i>{item.unit}</i>{item.rebateValue}</em></span>
                        </p>
                    </a>
                    <div className="order-item-todo" >
                        {rebateStatus>0&&(<button data-id={item.id} {...eventFun('109', 'order_remove', item.id)} className="js_del">删除</button>)}
                        <button data-id={item.id} {...eventFun('109', 'order_rebate', item.id)} className="js_info">返利详情</button>
                    </div>
                </li>
            )
        }

        let props = {
            property:"translateY",
            className:"my-order-list",
            tag:"ul",
            min:"auto",
            stopPro:false,
            vertical:true,
            touchMove:this.touchMove
            //step:200
        }
        if(j===0&&isLoading===false){
            return(<div className="my-order-list"><NoOrder /></div>)
        }else if(j===0&&page===0){
            return (<div></div>)
        }
        //return ({})
        return (
                <Swipe {...props} onClick={this.handClick}>
                    {$lis}
                    {isLoading===true&&(<div className="no-up">Loading</div>)}
                    {page>1&&isEnd===true&&(<div className="no-up">已经没有更新了</div>)}
                </Swipe>
        )
    }
};

OrderList.defaultProps = {
    pageSize:20,
    url:"/stuff/order/list.do",
    searchParam:{}
}

module.exports = OrderList;
//<button data-id={item.id} className="js_del">删除</button>
