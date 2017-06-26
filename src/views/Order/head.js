'use strict'
import * as React from 'react';
import { eventFun } from 'libs/util'

//import * as _ from "lodash";

import "./head.less";



class OrderHead extends React.Component {
    constructor(props) {
        super(props);
        this.handleTrigger = this.handleTrigger.bind(this);
    }
    componentWillMount() {

    }
    componentWillReceiveProps (nextProps) {

    }
    handleTrigger(event) {
       let {click} = this.props;

       let id = event.currentTarget.dataset.id;

       click&&click(id);
       //debugger;

    }

    render() {
        //total_rebate_value:data.total_rebate_value,
           //     un_rebate_value:data.un_rebate_value
        let {items,status,info} = this.props;
        let i = 0,length = items.length,$lis=[];
        while(i<length){
            let item = items[i];
            i+=1;
            //let trueStatus = status===undefined?0:Number(status+1);
            let props = {
                onClick:this.handleTrigger,
                key:item.id,
                className:status==item.id?"tab-select":""
            }
            $lis.push(<li {...props} {...eventFun('109','order_tab', i)} data-id={item.id} ><span>{item.title}</span></li>)
        }
        return (
            <header className="order-head">
                <ul className='head-top'>
                    <li className="head-top-tab">
                            <em>{info.totalRebateValue}<i>返利</i></em>
                            <span>累计返利</span>
                    </li>
                    <li className="head-top-tab">
                            <em>{info.unRebateValue}<i>返利</i></em>
                            <span>待返返利</span>
                    </li>
                </ul>
                <ul className="head-tab">
                   {$lis}
                </ul>
            </header>
        )
    }
};

OrderHead.defaultProps = {
    items:[
        {id:0,title:"全部"},
        {id:2,title:"已返"},
        {id:1,title:"待返"},
        {id:3,title:"申诉"}
    ]
}

module.exports = OrderHead;
