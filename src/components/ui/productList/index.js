import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './index.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat, baoquanFormat, eventFun, icons } from 'libs/util'

class ProductList extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }
    tofrontClick(id){
      if(id){
        this.context.router.push( {"pathname": `frontMatter/${id}`, state: {} });
      }
      // event.preventDefault();
      //<Link to={"frontMatter/"+item.id} styleName="img"><img src={item.imgUrl} alt="" {...eventFun(pageName, model, item.id)}/></Link>
    }
    render() {
        let { pageName, tabId, model } = this.props.eventConfig
        return (
            <div styleName={classNames({"list":true,"nomore":this.props.listConfig.isNoMore})} style={this.props.style}>
                {
                    this.props.listData.length > 0 ?
                        this.props.listConfig.temp == 'similar' ?
                            this.props.listData.map((item, index) =>
                                <div styleName="item" key={index}>
                                    <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} styleName="img" href={'newtab://goodstuff.qbao.com/goods?url=' + item.url} ><img src={item.imgUrl} alt="" /></a>
                                    <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.url} ><h3>{item.name}</h3></a>
                                    <div styleName="price">￥{priceFormat(item.finalPrice)}
                                        <span styleName="icon"><img src={icons[item.source]} alt=""/></span>
                                    </div>
                                    <div styleName="bottom">
                                        <span styleName="return">{item.rebateValue}</span>
                                        {item.orderNum != null ? <p styleName="sales">销量 <span>{item.orderNum}</span></p> : ''}
                                        <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, 'gather_goods_similar', item.id)} href={`newTab://goodstuff.qbao.com/similar?pid=${item.id}`}><span styleName="similar">找相似</span></a>
                                    </div>
                                </div>
                            )
                    : this.props.listConfig.temp == 'score' ?
                        this.props.listData.map((item, index) =>
                            <div styleName="item" key={index}>
                                <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} styleName="img" href={'newtab://goodstuff.qbao.com/goods?url=' + item.haohuoUrl} ><img src={item.imgUrl} alt="" /></a>
                                <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.haohuoUrl} ><h3>{item.name}</h3></a>
                                <div styleName="price">￥{baoquanFormat(item.viewPrice)}
                                    <span styleName="icon"><img src={icons[item.source]} alt=""/></span>
                                </div>
                                <div styleName="bottom score">
                                    <p styleName="sales">销量 <span>{item.saleCount}</span></p>
                                    <div styleName="tip">
                                        <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, 'self_support_score', item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.haohuoUrl} ><div styleName="haohuoScore">{item.haohuoScore}</div></a>
                                    </div>
                                </div>
                            </div>
                        )
                    : this.props.listConfig.temp == 'activity' ?
                        this.props.listData.map((item, index) =>
                            <div styleName="item" key={index}>
                                <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} styleName="img" href={'newtab://goodstuff.qbao.com/goods?url=' + item.haohuoUrl} ><img src={item.imgUrl} alt="" /></a>
                                <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.haohuoUrl} ><h3>{item.name}</h3></a>
                                <div styleName="price">￥{priceFormat(item.viewPrice)}
                                    <span styleName="icon"><img  src={icons[item.source]}  alt="" /></span>
                                </div>
                                <div styleName="bottom score">
                                    <p styleName="sales">销量 <span>{item.saleCount}</span></p>
                                    <div styleName="tip">
                                        <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, 'self_support_score', item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.haohuoUrl} ><div styleName="haohuoScore">{item.haohuoScore}</div></a>
                                    </div>
                                </div>
                            </div>
                        )
                    : this.props.listConfig.temp == 'selection' ?
                        this.props.listData.map((item, index) =>
                            <div className="tl-list-item" key={index}>
                                <div className="item-start">
                                  <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} styleName="img" href={'newtab://goodstuff.qbao.com/goods?url=' + item.url} >
                                    <img src={item.imgUrl} alt=""/>
                                  </a>
                                </div>
                                <div className="item-end">
                                    <div className="item-title">
                                    <img src={icons[item.source]} alt=""/>
                                      <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.url} >
                                        {item.name}
                                      </a>
                                    </div>
                                    <div className="item-price">
                                    <span className="item-price-txt">￥{item.couponPrice}</span>{item.couponAmount>0&&'券后价'}
                                    </div>
                                    {item.couponAmount>0&&<div className="item-old-price">
                                    原价￥{item.reservePrice}
                                    </div>}
                                    <div>
                                      <span className="item-rebate">预返积分{item.point}</span>
                                      <span className="item-sales">销量{item.orderNum}</span>
                                    </div>
                                    {item.couponAmount>0 ?                                    
                                        <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.couponLink} >
                                          <div className="btn-buy">领券购买</div> 
                                        </a>
                                        :
                                        <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.url} >
                                          <div className="btn-buy">立即购买</div>
                                        </a>
                                    }
                                </div>
                            </div>
                        )

                    : this.props.listConfig.temp == 'hots' ?
                            this.props.listData.map((item, index) =>
                              <div styleName="item" key={index}>
                                  <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} styleName="img" href={'newtab://goodstuff.qbao.com/goods?url=' + item.linkUrl} ><img src={item.imgUrl} alt="" /></a>
                                  <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.linkUrl} ><h3>{item.name}</h3></a>
                                  <div styleName="price">￥{priceFormat(item.finalPrice)}
                                      <span styleName="icon"><img src={icons[item.source]} alt=""/></span>
                                  </div>
                                  <div styleName="bottom">
                                      <span styleName="return">{item.rebateValue}</span>
                                      {item.orderNum != null ? <p styleName="sales">销量 <span>{item.orderNum}</span></p> : ''}
                                  </div>
                              </div>
                            )
                    : this.props.listData.map((item, index) =>
                            <div styleName="item" key={index}>
                                <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} styleName="img" href={'newtab://goodstuff.qbao.com/goods?url=' + item.url} ><img src={item.imgUrl} alt="" /></a>
                                <a onClick={this.tofrontClick.bind(this, item.id)} {...eventFun(pageName, model, item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.url} ><h3>{item.name}</h3></a>
                                <div styleName="price">￥{priceFormat(item.finalPrice)}
                                    <span styleName="icon"><img src={icons[item.source]} alt=""/></span>
                                </div>
                                <div styleName="bottom">
                                    <span styleName="return">{item.rebateValue}</span>
                                    {item.orderNum != null ? <p styleName="sales">销量 <span>{item.orderNum}</span></p> : ''}
                                </div>
                            </div>
                        )
                     : ''
                }
            </div>
        )
    }
    //eventFun(item, index, stuffMoudId) {
    //     return {
    //         'data-event-stuffMoudId': stuffMoudId || this.props.eventConfig.stuffMoudId,
    //         'data-event-type': this.props.eventConfig.type,
    //         'data-event-id': item.id,
    //         'data-event-locationId': item.locationId || (index+1),
    //         'data-event-source': item.source,
    //         'data-event': 'point'
    //     }
    // }
}
{/*<div styleName="item" key={index}>
    <a data-href={'newtab://goodstuff.qbao.com/goods?url=' + item.linkUrl} ><img src={item.imgUrl} alt="" /></a>
    <a data-href={'newtab://goodstuff.qbao.com/goods?url=' + item.linkUrl} ><h3>{item.name}</h3></a>
    <div styleName="price">￥{item.price}</div>
    <p styleName="sales">销量 <span>{item.saleCount}</span></p>
</div>*/}
ProductList.contextTypes = {
  router: React.PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(ProductList, styles, { allowMultiple: true }));
