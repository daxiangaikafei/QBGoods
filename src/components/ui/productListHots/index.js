import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './index.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat } from 'libs/util'

import Swipe from "components/swipe/swipe";

class ProductList extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {

        return (
            <div styleName="list">
                {
                    this.props.listData.length > 0 ?
                        this.props.listConfig.temp == 'similar' ? this.props.listData.map((item, index) =>
                            <div styleName="item" key={index}>
                                <a href={item.link_url} ><img src={item.imgUrl} alt="" /></a>
                                <a href={item.link_url} ><h3>{item.name}</h3></a>
                                <div styleName="price">￥{priceFormat(item.viewPrice)}
                                    <span styleName="icon"></span>
                                </div>
                                <div styleName="bottom">
                                    <p styleName="sales">销量 <span>{item.saleCount}</span></p>
                                    <div styleName="tip">
                                      <div styleName="haohuoScore">{item.haohuoScore}</div>
                                    </div>
                                </div>
                            </div>
                        ) :
                        this.props.listData.map((item, index) =>
                            <div styleName="item" key={index}>
                                <a href={item.link_url} ><img src={item.imgUrl} alt="" /></a>
                                <a href={item.link_url} ><h3>{item.name}</h3></a>
                                <div styleName="price">￥{priceFormat(item.price)}
                                    <span styleName="icon"></span>
                                </div>
                                <div styleName="bottom">
                                    <span styleName="return">返{item.rebateValue}返利</span>
                                    {item.sale_count!=null ? <p styleName="sales">销量 <span>{item.saleCount}</span></p> : ''}
                                </div>
                            </div>

                        )
                    : ''
                }
            </div>
        )
    }

};
{/*<div styleName="item" key={index}>
    <a href={item.link_url} ><img src={item.img_url} alt="" /></a>
    <a href={item.link_url} ><h3>{item.name}</h3></a>
    <div styleName="price">￥{item.price}</div>
    <p styleName="sales">销量 <span>{item.sale_count}</span></p>
</div>*/}
function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(ProductList, styles, { allowMultiple: true }));
