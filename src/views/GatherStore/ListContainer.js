import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat, eventFun } from 'libs/util'
import styles from './page.less'

class ListContainer extends Component {
  pageName = '104';
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  render() {
    return (
      <div>
        <div styleName="title">精选好店</div>
        <div styleName="list-container">
        {
          this.props.storeList.map((shop, index) =>
            <div styleName="item" key={index}>
              <div styleName="header">
                <img src={shop.coverUrl} alt=""/>
                <div styleName="info">
                  <h3>{shop.name}</h3>
                  <p>
                    {/*<span><i></i>10赞</span>*/}
                    <a {...eventFun(this.pageName, 'gather_shop_shop', shop.id)} styleName="goin" href={shop.url}>进店 <i>></i></a>
                  </p>
                </div>
              </div>
              <div styleName="bottom">
              {
                shop.list.map((stuff, index) =>
                      <a key={index} href={stuff.url} {...eventFun(this.pageName, 'gather_shop_products', stuff.id)}>
                    <img src={stuff.imgUrl} alt="" />
                  </a>
                )
              }
              </div>
            </div>
          )
        }
        </div>
      </div>
    )
  }
};
export default CSSModules(ListContainer, styles, {allowMultiple: true});
