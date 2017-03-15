import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './index.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat } from 'libs/util'

class ProductList extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div styleName={classNames({"list":true,"nomore":this.props.listConfig.isNoMore})}>
                {
                    this.props.listData.length > 0 ? 
                        this.props.listConfig.temp == 'similar' ? 
                            this.props.listData.map((item, index) =>
                                <div styleName="item" key={index}>
                                    <a styleName="img" href={item.linkUrl} ><img src={item.imgUrl} alt="" /></a>
                                    <a href={item.linkUrl} ><h3>{item.name}</h3></a>
                                    <div styleName="price">￥{priceFormat(item.price)}
                                        <span styleName="icon"></span>
                                    </div>
                                    <div styleName="bottom">
                                        <span styleName="return">{item.rebateValue}</span>
                                        {item.saleCount != null ? <p styleName="sales">销量 <span>{item.saleCount}</span></p> : ''}
                                        <span styleName="similar">找相似</span>
                                    </div>
                                </div>
                            )
                    : this.props.listConfig.temp == 'score' ?
                        this.props.listData.map((item, index) =>
                            <div styleName="item" key={index}>
                                <a styleName="img" href={item.link_url} ><img src={item.imgUrl} alt="" /></a>
                                <a href={item.link_url} ><h3>{item.name}</h3></a>
                                <div styleName="price">￥{priceFormat(item.viewPrice)}
                                    <span styleName="icon"></span>
                                </div>
                                <div styleName="bottom score">
                                    <p styleName="sales">销量 <span>{item.saleCount}</span></p>
                                    <div styleName="tip">
                                        <div styleName="haohuoScore">{item.haohuoScore}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    : this.props.listData.map((item, index) =>
                            <div styleName="item" key={index}>
                                <a styleName="img" href={item.linkUrl} ><img src={item.imgUrl} alt="" /></a>
                                <a href={item.linkUrl} ><h3>{item.name}</h3></a>
                                <div styleName="price">￥{priceFormat(item.price)}
                                    <span styleName="icon"></span>
                                </div>
                                <div styleName="bottom">
                                    <span styleName="return">{item.rebateValue}</span>
                                    {item.saleCount != null ? <p styleName="sales">销量 <span>{item.saleCount}</span></p> : ''}
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
    <a href={item.linkUrl} ><img src={item.imgUrl} alt="" /></a>
    <a href={item.linkUrl} ><h3>{item.name}</h3></a>
    <div styleName="price">￥{item.price}</div>
    <p styleName="sales">销量 <span>{item.saleCount}</span></p>
</div>*/}
function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(ProductList, styles, { allowMultiple: true }));
