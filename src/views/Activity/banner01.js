
import React, { Component, PropTypes } from 'react';


import Scroll from "components/swipe/scroll"
import "./banner01.scss";


const Icons  =  {
        'tmall':  require('static/imgs/thirdSource/tmall.png'),
        'dangdang':  require('static/imgs/thirdSource/dangdang.png'),
        'gome':  require('static/imgs/thirdSource/gome.png'),
        'jd':  require('static/imgs/thirdSource/jd.png'),
        'jumei':  require('static/imgs/thirdSource/jumei.png'),
        'kaola':  require('static/imgs/thirdSource/kaola.png'),
        'mi':  require('static/imgs/thirdSource/mi.png'),
        'taobao':  require('static/imgs/thirdSource/taobao.png'),
        'yhd':  require('static/imgs/thirdSource/yhd.png'),
        'yougou': require('static/imgs/thirdSource/yougou.png'),
        'qbao':  require('static/imgs/thirdSource/qbao.png'),
    }

class Activity extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentWillMount(props){
       //searchParam:{catId:110103102108}
       

    }
    renderItem(item,i){

            let price = item.finalPrice.toString().split(".");
            return(
                <li key={item.id} className="activity_normal-item">
                    <a href={item.linkUrl} data-event-stuffMoudId={10} data-event-type={"bannner"} data-event-id={item.id} data-event-locationId={i} data-event-source={item.source} data-event={"point"} >
                        <div className="activity_normal-item-left">
                            <img src={item.imgUrl} />
                        </div>
                        <div className="activity_normal-item-right">
                            <h3>{item.name}</h3>
                            <div className="item-left-info">
                                <span>￥{price[0]}<em>.{price[1]||"0"}{price[2]||"0"}</em><img src={Icons[item.source]} alt=""/></span>
                                <b><i>{item.rebateValue}</i><small>销量 {item.orderNum}</small> </b>
                            </div>
                            {/*<div className="item-good">
                                <span><img src={Icons[item.source]} alt=""/></span>
                            </div>*/}
                        </div>
                    </a>
                </li>
            )
    }
    analysis_data(data){
        if(data.responseCode===1000){
            return data.data;
        }
        return false;
    }
    renderEnd(){
        return(
            <div className="container-scroll scroll-end">
                — —已经到底了— —
            </div>
        )
        
    }
    
    render() {
        let {scrollOptions,params} = this.props;
        //debugger;
        let props = Object.assign({},scrollOptions,{
                analysis_data:this.analysis_data,
                searchParam:{catId:params.id},
                renderItem:this.renderItem,
                renderEnd:this.renderEnd,
                totalProps:{
                    className:"container_activity_normal"
                }
        })
        return (
                    <Scroll {...props}/>
        )
    }
    
}

Activity.defaultProps = {
    scrollOptions:{
        url:"/stuff/ju/catPromotion.do",
          pageName:"page",
          pageSizeName:"size",
          stopPro:false
          
    }
}

export default Activity;

{/*<div className="item-good">
                                <span><i className="good-index"></i>好指数</span>
                                <span>{12}<i className="good-arror-right"></i></span>
                            </div>*/}