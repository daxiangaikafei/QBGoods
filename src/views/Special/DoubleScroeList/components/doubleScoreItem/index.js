import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import { priceFormat, icons, sourceLink } from 'libs/util'

import DoubleIcon from 'static/imgs/special/icon_double.png'
import style from './index.less'

class DoubleScoreItem extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let { data } = this.props

        return (
            <div className="double-score-item">
                <img src={DoubleIcon} className="db-img"/>
                <div className="product-img"><img src={data.imgUrl} /></div>
                <a>{data.name}</a>
                <div className="from">
                    <img src={icons[data.source]} />
                    <span>{sourceLink[data.source]}</span>
                </div>
                <div className="bottom-div">
                    <div className="div-left">
                        <div className="price">
                            <span className="price-1">￥{priceFormat((data.finalPrice - data.coupon.value) < -1 ? data.finalPrice : data.finalPrice - data.coupon.value)}</span>
                            <span className="price-2"></span>
                            <span className="price-3">券{data.coupon.value}</span>
                        </div>
                        <div className="more">
                            <span className="more-1">{data.rebatedValue}</span>
                            <span className="more-2">销售额{data.saleCount}</span>
                        </div>
                    </div>
                    <div className="div-right">
                        <button>领券购买</button>
                    </div>
                </div>
            </div>
        )
    }
}

DoubleScoreItem.PropTypes = {
    data: PropTypes.object.isRequired
}

export default CSSModules(DoubleScoreItem, style, {allowMultiple:true})