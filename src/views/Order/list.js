'use strict'
import * as React from 'react';

//import * as _ from "lodash";

import Swipe from "components/swipe/swipe";

import "./list.less";

import {fetchPosts} from "components/common/fetch";
import NoOrder from "./noOrder";

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
    }
    componentWillMount() {

        this.getData(1);
    }
    componentWillReceiveProps (nextProps) {

    }
    handleTrigger(event) {


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
                    // if(data.data.data.length===0){
                    //     _this.setState({
                    //         isEnd :true
                    //     })
                    //     return false;
                    // }
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
        let {items,oneHeight} = this.state;
        oneHeight = oneHeight===false?that.element.children[0].children[0].clientHeight:oneHeight;

        if(that.min-args[0]>-300){
            this.getData(1).then(()=>{
                console.error("该加载了",-oneHeight*items.length);
                that.min = -oneHeight*items.length;
            });
            //console.error("该加载了");
            //that.min = -300000;
        }
    }

    render() {

        let {items,isLoading,page,isEnd} = this.state;
        let i =0,j=items.length,$lis = [];
        while(i<j){
            console.log("----");
            let item = items[i];
            i+=1;
            $lis.push(
                <li key={i} className="order-item">
                    <a href={item.clickUrl} target="_blank">
                        <p className="order-item-top">已返宝券</p>
                        <div className="order-item-body">
                            <div className="item-image">
                                <img src={item.imgUrl}/>
                            </div>
                            <p>{item.name}</p>
                            <span>￥{item.price}</span>
                        </div>
                        <p className="order-item-info">共一件商品，合计:<em><i>￥</i>{item.stuffNum*item.price}</em>待返<span>{item.rebateValue}宝券</span></p>
                    </a>
                    <div className="order-item-todo"><button>删除</button><button>返券详情</button></div>
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
        if(j===0&&page===0&&isLoading===false){
            return(<div className="my-order-list"><NoOrder /></div>)
        }else if(j===0&&page===0){
            return (<div></div>)
        }
        //return ({})
        return (
                <Swipe {...props}>
                    {$lis}
                    {isLoading===true&&(<div className="no-up">Loading</div>)}
                    {page>1&&isEnd===true&&(<div className="no-up">已经没有更新了</div>)}
                </Swipe>
        )
    }
};

OrderList.defaultProps = {
    pageSize:20,
    url:"api/stuff/order/list.do",
    searchParam:{}
}

module.exports = OrderList;
