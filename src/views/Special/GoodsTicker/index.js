import React,{ PropTypes } from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'

import Swipe from "components/swipe/swipe";
import GoodsTickerItem from './components/GoodsTickerItem'

import { fetchPosts } from "components/common/fetch";
import { getRequest } from 'libs/util'
import classNames from 'classnames'
import styles from './index.less'

class GoodsTicker extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tabList: [],
            tabIndex: 0,
            sortList: [
                {
                    id: 1,
                    name:"人气",
                    canSort: false,
                    sort: "",
                    type: "",
                    active: true,
                },
                {
                    id: 2,
                    name:"销量",
                    sort: "",
                    canSort: true,
                    type: "order_num",
                    active: false,
                },
                {
                    id: 3,
                    name:"价格",
                    canSort: true,
                    sort: "",
                    type: "final_price",
                    active: false,
                },
                {
                    id: 4,
                    name:"优惠券",
                    canSort: true,
                    sort: "",
                    type: "value",
                    active: false,
                }
            ],
            list: [],

            isLoading: false,
            page: 1,
            size: 10,
            isEnd: false
        }
    }
    
    componentDidMount() {
        this.getTabData()
    }

    getSortType(){
        let { sortList } = this.state, result = {};
        let obj = sortList.find(obj=>obj.active==true && obj.canSort);
        if(obj){
            result.sort = "sort:" + obj.type + ":" + obj.sort;
        }

        return result
    }
    
    getTabData(){
        let { tabUrl } = this.props;
        fetchPosts(tabUrl ,{ },"GET").then((data)=>{
            if(data.responseCode===1000){
                this.initTab(data.data);
            }else{
                this.initTab();
            }
        }).catch(() => {
        });
    }

    initTab(data){
        if(!data) data = [];
        let state = {}, api = "";
        state.tabList = data;
        state.isEnd = false;
        if(data.length > 0){
            state.tabIndex = data[0].id;
        }
        this.setState(state, ()=>{
            this.getListData({page: 1});
        })
    }

    getListData(opt){
        let { tabIndex, tabList, size, isLoading, isEnd } = this.state;
        if(isLoading || isEnd) return;

        let tab = tabList.find(obj=>obj.id == tabIndex);
        if(!tab) return;
        this.setState({isLoading: true});
        
        let api = "/stuff" + tab.url.split("?")[0];
        opt = Object.assign(opt, getRequest(api), {size}, this.getSortType());

        fetchPosts(api, opt, "GET").then((data)=>{
            if(data.returnCode===1000){
                this.initList(data.data, opt.page);
            }else{
                this.initList();
            }
        }).catch(() => {
            this.setState({isLoading:false});
        });
    }

    initList(data, page){
        data = data || [];
        let { size, list } = this.state;
        let state = {
            isLoading: false, 
            page: page,
            list: page == 1 ? data : list.concat(data),
            isEnd: data.length < size ? true : false
        };
        
        this.setState(state);
    }

    getTabComponents(){
        let { tabIndex, tabList } = this.state;
        return tabList.map((obj, index) => {
            return <span key={index} className={obj.id === tabIndex ? "active" : ""} onClick={()=>this.onTabClickHandler(obj.id, obj.url)}>{obj.dirName}</span>
        })
    }

    getSortComponents(){
        let { sortList } = this.state;
        return sortList.map((obj, index) => {
            let style = classNames({
                "goods-ticker-sort-item": obj.canSort,
                "goods-ticker-sort-item-normal": !obj.canSort,
                "active": obj.active,
                "up": obj.sort == "asc",
                "down": obj.sort == "desc"
            })
            return <div key={index} className={style} onClick={()=>this.onSortClickHandler(obj.id)}>{obj.name}</div>
        })
    }

    getListItems(){
        let { list } = this.state;
        return list.map((obj, index) => {
            return <GoodsTickerItem key={index} data={obj} />
        })
    }

    onTabClickHandler(index){
        let state = {
            tabIndex: index,
            isEnd: false
        };

        this.setState(state, ()=>{
            this.getListData({page: 1});
        });
    }

    onSortClickHandler(sortId){
        let sortList = this.state.sortList.map((obj, index)=>{
            if(obj.id == sortId){
                obj.active = true;
                if(obj.sort == "desc"){
                    obj.sort = "asc"
                }else {
                    obj.sort = "desc"
                }
            }else{
                obj.active = false;
                obj.sort = "";
            }
            return obj;
        })

        this.setState({sortList, isEnd: false}, ()=>{
            this.getListData({page: 1});
        });
    }

    touchMove(that, args){
        if(that.min - args[0] > 30){
            let { page } = this.state;
            this.getListData({page: page+1});
        }
    }
    
    render() {
        let props = {
            property:"translateY",
            className:"scroll-warpper",
            tag:"ul",
            min:"auto",
            stopPro:false,
            vertical:true,
            touchMove: (that,args)=>this.touchMove(that,args),
        }

        let { list, isLoading, page, isEnd } = this.state;
        let noTip = ""
        let noDataTip = "--已经到底了--";
        if(list.length === 0){
            noDataTip = "--敬请期待--"
        }
        if(isLoading){
            noTip = <div className="no-up">--加载中--</div>;
        }else if(page >=1 && isEnd === true){
            noTip = <div className="no-up">{noDataTip}</div>;
        }

        return (
            <div className="goods-ticker-container">
                <Swipe {...props}>
                    <header className="goods-ticker-header">
                        <div className="goods-ticker-tab-list">{ this.getTabComponents()}</div>
                        <div className="goods-ticker-sort-list">{ this.getSortComponents() }</div>
                    </header>
                    <div className="goods-ticker-list">
                        { this.getListItems() }
                    </div>
                    {noTip}
                </Swipe>
            </div>
        )
    }
}

GoodsTicker.defaultProps = {
    tabUrl: "/stuff/coupon/goodsClass.do?specialId=3"
}

export default CSSModules(GoodsTicker, styles, {allowMultiple:true});
