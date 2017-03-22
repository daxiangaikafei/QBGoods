'use strict'
import * as React from 'react';

//import * as _ from "lodash";

// import Swipe from "components/swipe/swipe";

import "./banner01.scss";

 import {fetchPosts} from "components/common/fetch";

// import Modal from "components/modal/index";
// import PopUp from "components/popup/index";




class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            page:1,
            isLoading:true,
            isEnd:false,
        }

        //this.getData = this.getData.bind(this);
        //this.touchMove = this.touchMove.bind(this);

    }
    componentWillMount() {

        this.getData(1);
    }

    render() {

        let {items,isLoading,page,isEnd} = this.state;
        let i =0,j=items.length,$lis = [],totalPrice=0,totalSb=0;
        while(i<j){
            console.log("----");
            let item = items[i];
            i+=1;
            let price = item.finalPrice.toString().split(".");
            $lis.push(
                <li key={item.id} className="activity_normal-item">
                    <a href={item.linkUrl} data-event-stuffMoudId={5} data-event-type={"bannner"} data-event-id={item.id} data-event-locationId={i} data-event-source={"taobao"} data-event={"point"} >
                        <div className="activity_normal-item-left">
                            <img src={item.imgUrl} />
                        </div>
                        <div className="activity_normal-item-right">
                            <h3>{item.name}</h3>
                            <div className="item-left-info">
                                <span>￥{price[0]}<em>.{price[1]}</em></span>
                                <b>销量 {item.orderNum}</b>
                            </div>
                            {/*<div className="item-good">
                                <span><i className="good-index"></i>好货指数</span>
                                <span>{12}<i className="good-arror-right"></i></span>
                            </div>*/}
                        </div>
                    </a>
                </li>
            )
            
        }

        let {option} = this.props;
        return (
                <div className="container_activity_normal">
                    <ul>
                        {$lis}
                    </ul>
                    <div className="container-scroll scroll-end">
                        — —已经到底了— —
                    </div>
                </div>
        )
    }

     getData(num){
        let {pageSize,url,searchParam,upData} = this.props;
        let {page,items,isLoading,isEnd} = this.state;
        if((page!==1&&isLoading===true)||(isEnd)){
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
};

Activity.defaultProps = {
    pageSize:20,
    url:"/stuff/ju/catPromotion.do",
    searchParam:{catId:110103102108},
    option:{
        property:"translateY",
        className:"my-order-list",
        tag:"ul",
        min:"auto",
        stopPro:false,
        vertical:true,
    }
}

  /*<Swipe {...option} onClick={this.handClick}>
                    {$lis}
                    {isLoading===true&&(<div className="no-up">Loading</div>)}
                    {page>1&&isEnd===true&&(<div className="no-up">已经没有更新了</div>)}
                </Swipe>*/

module.exports = Activity;
