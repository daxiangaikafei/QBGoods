'use strict'
import * as React from 'react';
import { Icon } from 'ui';
//import * as _ from "lodash";


import "./info.less";


class Info extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {data,onClick} = this.props;
        let statusBack = '';
        switch (data.rebateStatus) {
          case 1:
            statusBack = <li className="info-select">返还返利</li>;
            break;
          case 2:
            statusBack = <li className="info-select">返利被收回</li>;
            break;
          case 3:
            statusBack = <li className="info-select">返利失败</li>;
            break;
          default:
            statusBack = <li>返还返利</li>;
        }
        return (
            <div onClick={onClick} className="container-my-order-info">

                    <ol>
                        <li>下单</li>
                        <li className={data.rebateStatus==-1?"info-select":""}>记录订单</li>
                        <li className={data.rebateStatus==0?"info-select":""}>待返返利</li>
                        { statusBack }
                    </ol>
                    <div className="order-info-content">
                        <p><label>商城：</label>{data.source||""}</p>
                        <p><label>下单时间：</label>{data.orderTime||""}</p>
                        <p><label>订单金额：</label>{data.amount||""}</p>
                        <p><label>订单编号：</label>{data.orderNo||""}</p>
                        <p><label>返还返利：</label>{data.unit}{data.rebateValue||""}</p>
                        {data.appealValue != 0 &&(<p><label>增返返利：</label>{data.appealValue}</p>)}
                    </div>
                    <div className="order-info-close">
                      <Icon name="cross" color="#35353f" size="18" styleName="cross" />
                    </div>
                </div>
        )
    }
};

Info.defaultProps = {
    data:{}
}

module.exports = Info;
//<div className="vi-nav-bar"><span className="left-icon"></span>返利详情</div>
