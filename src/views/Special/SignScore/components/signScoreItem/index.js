import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import { priceFormat, icons, sourceLink } from 'libs/util'

import style from './index.less'

class SignScoreItem extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let { data } = this.props;

        return (
            <div className="sign-score-item">
                <div className="sign-score-item-icon"><img src={data.imgUrl} alt="" /></div>
                <div className="sign-score-item-content">
                    <div className="sign-score-item-title">{data.name}</div>
                    <div className="sign-score-item-source">
                        <span className="sign-score-item-source-icon"><img src={icons[data.source]} alt=""/></span>
                        <span className='sign-score-item-source-address'>{sourceLink[data.source]}</span>
                    </div>
                    <div className="sign-score-item-center-bottom">
                        <div className="left-div">
                            <div className="sign-score-item-price">
                                <span>￥{priceFormat(data.price)}</span>
                                <span className="sign-score-item-couponback"></span>
                            </div>
                            <div className="sign-score-item-sale-div">
                                <span className="sign-score-item-yf">{data.rebateValue}</span>
                                <span className="sign-score-item-sales">销量{data.saleCount}</span>
                            </div>
                        </div>
                        <div className="right-div">
                            <button className="btn-buy">立即购买</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SignScoreItem.PropTypes = {
    data: PropTypes.object.isRequired
}


export default CSSModules(SignScoreItem, style, {allowMultiple:true})