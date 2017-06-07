'use strict'
import * as React from 'react';

//import * as _ from "lodash";

import "./page.less";


import List from "./list";
import OrderHead from "./head";
import { eventFun } from 'libs/util'
import ListState from "./listState";
import {fetchPosts} from "components/common/fetch";

class Order extends React.Component {
    pageName = '109'
    constructor(props) {
        super(props);

        console.log(this.props.location);
        let _status  = this.props.location && (this.props.location.state && this.props.location.state.status);
        this.state = {
            items:[],
            headInfo:{
                total_rebate_value:0,
                un_rebate_value:0
            },
            status: _status ? _status : 0
        }
        this.handClick = this.handClick.bind(this);
        this.upData = this.upData.bind(this);
    }
    componentWillMount() {

    }
    componentWillReceiveProps (nextProps) {

    }
    handClick(status) {
        console.log(status);
       this.setState({
           status
       })

    }
    upData(data){
      if(!this.state.headInfo.totalRebateValue && !this.state.headInfo.totalRebateValue){
        //debugger
        this.setState({
            headInfo:{
                totalRebateValue:data.totalRebateValue,
                unRebateValue:data.unRebateValue
            }
        });
      }
    }
    render() {
        let {searchParam,headInfo,status} =  this.state;

        let i = 0,j=4,$lis=[];

       while(i<j){

           let sb = Number(i-1);
           i+=1;
           let searchParam = {
           };
           //status:sb<0?undefined:sb
           if(sb>=0){
                searchParam.status =  sb;
           }
           if(i === 4){
             $lis.push(<ListState upData={this.upData} key={i} searchParam={searchParam}/>);
           }else{
             $lis.push(<List upData={this.upData} key={i} searchParam={searchParam}/>);
           }
       }

        return (
            <div className="container-my-order">
                    <OrderHead status={status} info={headInfo} click={this.handClick}/>
                    {$lis[status]}
            </div>
        )
    }
};

Order.defaultProps = {
}

module.exports = Order;
