'use strict'
import * as React from 'react';
import { Icon } from 'ui';
//import * as _ from "lodash";


import "./info.less";


class infoState extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {data,onClick} = this.props;
        console.log("appealStatus:",data);
        let statusBack = '';
        switch (data.appealStatus) {
          case 2:
           statusBack = <li className="info-select"><h4>取消申诉</h4><p>您已取消申诉。</p></li>;
           break;
          case 0:
            statusBack = <li className="info-select"><h4>申诉审核</h4><p></p></li>;
            break;
          case -1:
            statusBack = <li className="info-select"><h4>申诉审核</h4><p></p></li>;
            break;
          case 1:
            statusBack = <li className="info-select"><h4>申诉受理</h4><p></p></li>;
            break;
          case 3:
            statusBack = <li className="info-select"><h4>申诉反馈</h4><p>{data.comment}</p></li>;
            break;
          default:
            statusBack = <li className="info-select"><h4>取消申诉</h4><p>您已取消申诉。</p></li>;
        }
        return (
            <div onClick={onClick} className="container-my-order-info container-order-state">

                    <ol>
                        <li>
                          <h4>申诉提交</h4>
                          <p><label>订单编号：</label>{data.orderId}</p>
                          <p><label>申诉时间：</label>{data.appealTime}</p>
                          <p><label>手机型号：</label>{data.phoneType}</p>
                          <p><label>商品来源：</label>{data.source}</p>
                          <p className="ly-flex-column"><label>申诉原因：</label><p>{data.reason}</p></p>
                          {data.appealStatus === 3 &&(<p className="ly-flex-column"><label>申诉反馈：</label><p>{data.comment}</p></p>)}
                        </li>
                        {data.appealStatus === 1 &&(<li><h4>申诉审核</h4><p></p></li>)}
                        {data.appealStatus === 3 &&(<li><h4>申诉审核</h4><p></p></li>)}
                        {data.appealStatus === 3 &&(<li><h4>申诉受理</h4><p></p></li>)}
                        { statusBack }
                    </ol>
                    <div className="order-info-close">
                      <Icon name="cross" color="#35353f" size="18" styleName="cross" />
                    </div>
                </div>
        )
    }
};

infoState.defaultProps = {
    data:{}
}

module.exports = infoState;
//<div className="vi-nav-bar"><span className="left-icon"></span>返利详情</div>
