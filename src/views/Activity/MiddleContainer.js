import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './channelEntry.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat, eventFun } from 'libs/util'

class MiddleContainer extends Component {
  pageName = '108'
  icons = {
    'tmall': require('static/imgs/thirdSource/tmall.png'),
    'dangdang': require('static/imgs/thirdSource/dangdang.png'),
    'gome': require('static/imgs/thirdSource/gome.png'),
    'jd': require('static/imgs/thirdSource/jd.png'),
    'jumei': require('static/imgs/thirdSource/jumei.png'),
    'kaola': require('static/imgs/thirdSource/kaola.png'),
    'mi': require('static/imgs/thirdSource/mi.png'),
    'taobao': require('static/imgs/thirdSource/taobao.png'),
    'yhd': require('static/imgs/thirdSource/yhd.png'),
    'yougou': require('static/imgs/thirdSource/yougou.png'),
    'qbao': require('static/imgs/thirdSource/qbao.png'),
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  render() {
    var level0s = this.props.levelData;
    return (
      <div>
        <div styleName="middle-title">{level0s.title}</div>
        <div styleName="middle-container">
          {/*style={{ width: `${140 * level0s.stuffs.length}px`}}*/}
          <div styleName="list" style={{ width: `${140 * level0s.stuffs.length}px`}}>
            {level0s.stuffs.map((item, index) =>
              <div styleName="item" key={index}>
                <a {...eventFun(this.pageName,'channel_entry_ad_products',item.id)} styleName="img" href={item.url} ><img src={item.imgUrl} alt="" /></a>
                <a {...eventFun(this.pageName,'channel_entry_ad_products',item.id)} href={item.url} ><h3>{item.name}</h3></a>
                <div styleName="price">￥{priceFormat(item.finalPrice)}
                  <span styleName="icon"><img src={this.icons[item.source]} alt=""/></span>
                </div>
                <div styleName="bottom">
                  <span styleName="return">{item.rebateValue}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
};
export default CSSModules(MiddleContainer, styles, {allowMultiple: true});
