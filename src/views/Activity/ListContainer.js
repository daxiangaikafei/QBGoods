import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './channelEntry.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat, eventFun, icons } from 'libs/util'
import MiddleTitle from './MiddleTitle'

class ListContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  render() {
    let { levelData, pageName, modelName, today } = this.props;
    return (
      <div>
        <MiddleTitle title={levelData.title} today />
        <div styleName="list-container nomore">
          {levelData.stuffs.map((item, index) =>
            <div styleName="item" key={index}>
              <a {...eventFun(pageName, modelName,item.id)} styleName="img" href={item.url} ><img src={item.imgUrl} alt="" /></a>
              <div styleName="right">
                <a {...eventFun(pageName, modelName,item.id)} href={item.url} ><h3>{item.name}</h3></a>
                <div styleName="bottom">
                  <div styleName="price">￥{priceFormat(item.finalPrice)}
                    <span styleName="icon"><img src={icons[item.source]} alt="" /></span>
                  </div>
                  <span styleName="return">
                    {item.rebateValue}
                    {item.orderNum != null ? <p styleName="sales">销量 <span>{item.orderNum}</span></p> : ''}
                  </span>
                  <a {...eventFun(this.pageName, modelName,item.id,)} styleName="btn-buy" href={item.url}>马上购买</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
};
export default CSSModules(ListContainer, styles, {allowMultiple: true});
