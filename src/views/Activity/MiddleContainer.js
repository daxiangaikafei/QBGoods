import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './channelEntry.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat, eventFun, icons } from 'libs/util'
import MiddleTitle from './MiddleTitle'
import PopUp from "components/popup/index";
import {SpecialToTip} from 'ui';

class MiddleContainer extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  clickLinkSource(url, source, e) {
    PopUp.show(
      (<SpecialToTip source={source} />), { maskClosable: true, isBgAlpha: true }
    );
    setTimeout(function () {
      if (QBFK.Util.getDevice() === 'android' && source == 'jd') {
        window.open(url);
      } else {
        window.location.href = 'newtab://goodstuff.qbao.com/goods?url=' + url;
      }
      PopUp.hide(
        (<SpecialToTip source={source} />), { maskClosable: false, isBgAlpha: false }
      );
    }, 1000);
    e.preventDefault();
  }
  render() {
    let { levelData, pageName, modelName, today } = this.props;
    if(levelData.stuffs.length == 0) return ''
    return (
      <div>
        <MiddleTitle title={levelData.title} today />
        <div styleName="middle-container">
          {/*style={{ width: `${140 * levelData.stuffs.length}px`}}*/}
          <div styleName="list" style={{ width: `${140 * levelData.stuffs.length}px`}}>
            {levelData.stuffs.map((item, index) =>
              <div styleName="item" key={index}>
                <a {...eventFun(pageName,modelName,item.id)} styleName="img" href={item.url} onClick={this.clickLinkSource.bind(this,item.url,item.source)}><img src={item.imgUrl} alt="" /></a>
                <a {...eventFun(pageName,modelName,item.id)} href={item.url} onClick={this.clickLinkSource.bind(this,item.url,item.source)}><h3>{item.name}</h3></a>
                <div styleName="price">￥{priceFormat(item.finalPrice)}
                  <span styleName="icon"><img src={icons[item.source]} alt=""/></span>
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
