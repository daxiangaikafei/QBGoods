
import React, { Component, PropTypes } from 'react';


import Scroll from "components/swipe/scroll"
import "./banner01.scss";


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
                    <a href={item.url} data-event-stuffMoudId={10} data-event-type={"bannner"} data-event-id={item.id} data-event-locationId={i} data-event-source={item.source} data-event={"point"} >
                        <div className="activity_normal-item-left">
                            <img src={item.imgUrl} />
                        </div>
                        <div className="activity_normal-item-right">
                            <h3>{item.name}</h3>
                            <div className="item-left-info">
                                <span>￥{price[0]}<em>.{price[1]}</em></span>
                                <b>销量 {item.orderNum}</b>
                            </div>
                            {/*<div className="item-good">
                                <span><i className="good-index"></i>好货指数</span>
                                <span>{12}<i className="good-arror-right"></i></span>
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
        debugger;
        let props = Object.assign({},scrollOptions,{
                analysis_data:this.analysis_data,
                searchParam:{catId:params.id},
                renderItem:this.renderItem,
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
          
    }
}

export default Activity;