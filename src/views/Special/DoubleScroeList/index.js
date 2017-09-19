import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import { fetchPosts } from "components/common/fetch";
import Swipe from "components/swipe/swipe";
import DoubleScoreItem from './components/doubleScoreItem'

import style from './index.less'

class DoubleScoreList extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            list: [],
            page: 1,
            size: 10,
            isEnd: false,
            isLoading: false
        }
    }

    componentDidMount(){
        this.getListData({page: 1});
    }

    getListData(opt){
        let { size, isLoading, isEnd } = this.state;
        if(isLoading || isEnd) return;

        this.setState({isLoading: true});
        
        let { ApiUrl } = this.props;
        opt = Object.assign(opt, {size});

        fetchPosts(ApiUrl, opt, "GET").then((data)=>{
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

    touchMove(that, args){
        if(that.min - args[0] > 30){
            let { page } = this.state;
            this.getListData({page: page+1});
        }
    }

    render(){
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
            <div className="double-score-container">
                <Swipe {...props}>
                    { list.map((obj, index) => <DoubleScoreItem key={index} data={obj} />) }
                    { noTip }
                </Swipe>
            </div>
        )
    }
}

DoubleScoreList.defaultProps = {
    ApiUrl: "/stuff/point/double.do"
}

export default CSSModules(DoubleScoreList, style, {allowMultiple:true})