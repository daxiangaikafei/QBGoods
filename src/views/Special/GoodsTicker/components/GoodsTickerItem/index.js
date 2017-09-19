import React, { PropTypes } from 'react'

import { priceFormat, icons, sourceLink } from 'libs/util'

import styles from './index.less'
import CSSModules from 'react-css-modules'

class GoodsTickerItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    
    componentDidMount() {
    }
    
    render() {
        let { data } = this.props;

        return (
            <div className="goods-ticker-item">
                <div className="goods-ticker-item-icon"><img src={data.imgUrl} alt="" /></div>
                <div className="goods-ticker-item-content">
                    <div className="goods-ticker-item-title">{data.name}</div>
                    <div className="goods-ticker-item-source">
                        <span className="goods-ticker-item-source-icon"><img src={icons[data.source]} alt=""/></span>
                        <span className='goods-ticker-item-source-address'>{sourceLink[data.source]}</span>
                    </div>
                    <div className="goods-ticker-item-center-bottom">
                        <div className="goods-ticker-item-price">
                            <span>￥{priceFormat((data.finalPrice - data.coupon.value) < -1 ? data.finalPrice : data.finalPrice - data.coupon.value)}</span>
                            <span className="goods-ticker-item-couponback"></span>
                        </div>
                        <div className="goods-ticker-item-sale-div">
                            <span className="goods-ticker-item-yf">{data.rebatedValue}</span>
                            <span className="goods-ticker-item-sales">销量{data.saleCount}</span>
                        </div>
                    </div>
                </div>
                <div className="goods-ticker-item-right">
                    <div>
                        <div>领优惠券</div>
                        <div>{data.coupon.value}</div>
                    </div>
                </div>
            </div>
        )
    }
}

GoodsTickerItem.PropTypes = {
    data: PropTypes.array
}

export default CSSModules(GoodsTickerItem, styles, {allowMultiple:true});
