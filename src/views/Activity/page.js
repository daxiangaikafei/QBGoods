'use strict'
import * as React from 'react';

//import * as _ from "lodash";

// import Swipe from "components/swipe/swipe";

import "./page.scss";

// import {fetchPosts} from "components/common/fetch";

// import Modal from "components/modal/index";
// import PopUp from "components/popup/index";




class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            page:0,
            isLoading:true,
            isEnd:false,
        }

        //this.getData = this.getData.bind(this);
        //this.touchMove = this.touchMove.bind(this);

    }

    render() {

        let {items,isLoading,page,isEnd} = this.state;
        let i =0,j=items.length||2,$lis = [],totalPrice=0,totalSb=0;
        while(i<j){
            console.log("----");
            let item = items[i];
            i+=1;
            $lis.push(
                <li className="activity_normal-item">
                    <div className="activity_normal-item-left">
                        <img src="" />
                    </div>
                    <div className="activity_normal-item-right">
                        <h3>商品名称商品名称商品名称商品名称商品名称商品名称商品名称</h3>
                        <div className="item-left-info">
                            <span>￥1200<em>.00</em></span>
                            <b>销量 100</b>
                        </div>
                        <div className="item-good">
                            <span><i className="good-index"></i>好货指数</span>
                            <span>32.5<i className="good-arror-right"></i></span>
                        </div>
                    </div>
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
};

Activity.defaultProps = {
    pageSize:20,
    url:"/stuff/order/list.do",
    searchParam:{},
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
