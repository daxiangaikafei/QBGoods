'use strict'
import * as React from 'react';

//import * as _ from "lodash";


import "./info.less";


class Info extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        let {data,onClick} = this.props;
        return (
            <div onClick={onClick} className="container-my-order-info">
                    
                    <ol>
                        <li>下单</li>
                        <li className={data.rebateStatus==-1?"info-select":""}>记录订单</li>
                        <li className={data.rebateStatus==0?"info-select":""}>待返宝券</li>
                        <li className={data.rebateStatus>=1?"info-select":""}>返还宝券</li>
                    </ol>
                    <div className="order-info-content">
                        <p><label>商城：</label>{data.source||""}</p>
                        <p><label>下单时间：</label>{data.orderTime||""}</p>
                        <p><label>订单金额：</label>{data.amount||""}</p>
                        <p><label>订单编号：</label>{data.orderId||""}</p>
                        <p><label>返还宝券：</label>{data.rebateValue||""}</p>
                    </div>
                </div>
        )
    }
};

Info.defaultProps = {
    data:{}
}

module.exports = Info;
//<div className="vi-nav-bar"><span className="left-icon"></span>返券详情</div>

