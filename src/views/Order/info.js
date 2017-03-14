'use strict'
import * as React from 'react';

//import * as _ from "lodash";





class Info extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        
        return (
            <div className="container-my-order-info">
                    <ol>
                        <li>下单</li>
                        <li>记录订单</li>
                        <li className="info-select">待返宝券</li>
                        <li>反还宝券</li>
                    </ol>
                    <div className="order-info-content">
                        <p><label>商城：</label>淘宝</p>
                        <p><label>下单时间：</label>淘宝</p>
                        <p><label>订单金额：</label>淘宝</p>
                        <p><label>订单编号：</label>淘宝</p>
                        <p><label>反还宝券：</label>淘宝</p>
                    </div>
                </div>
        )
    }
};

Info.defaultProps = {
}

module.exports = Info;


