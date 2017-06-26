import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './index.less'
import classNames from 'classnames'
import { priceFormat, baoquanFormat, eventFun, icons } from 'libs/util'

class specialToTip extends Component {
    tipimg = require('static/imgs/special/totip.png');
    sourceIcons = {
      'tmall': require('static/imgs/special/tmall-icon.png'),
      'taobao': require('static/imgs/special/taobao-icon.png'),
      'jd': require('static/imgs/special/jd-icon.png')
    }
    constructor(props) {
        super(props)
    }

    render() {

        let source = this.props.source || "jd";
        //<Info data={data.data} onClick={this.infoClose} />
        return (
          <div className="tosource-tip">
            <div className="tip-content">
              <img src={this.tipimg}/>
              <p>亲，您即将登录</p>
              <div className="source-icon">
                <img src={this.sourceIcons[source]}/>
              </div>
              <ol>
                <li>使用您的{source === "jd" ? "京东账户" : "淘宝/天猫账号"}与密码登录</li>
                <li>完成交易，在"我的订单"查看返利详情</li>
                <li>若有疑问可以及时申诉或查看规则</li>
              </ol>
            </div>
          </div>
        )
    }

}
export default CSSModules(specialToTip, styles, { allowMultiple: true });
