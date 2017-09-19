import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import { fetchPosts } from "components/common/fetch";
import Swipe from "components/swipe/swipe";
import SignScoreItem from './components/signScoreItem';

import style from './index.less'
import LoveIcon from 'static/imgs/special/icon_love.jpg'

class SignScore extends React.Component{
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
        
        let { ApiLikeList } = this.props;
        opt = Object.assign(opt, {size});

        fetchPosts(ApiLikeList, opt, "GET").then((data)=>{
            if(data.responseCode===1000){
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
            <div className="sign-score-container">
                <Swipe {...props}>
                    <div className="baobi-header">
                        <div className="left">
                            <h6>已领宝币：2元</h6>
                            <div>累计报到10天</div>
                            <ul>
                                <li className="active"><span></span></li>
                                <li><span>2</span></li>
                                <li><span>3</span></li>
                                <li><span>4</span></li>
                                <li><span>5</span></li>
                                <li><span>6</span></li>
                                <li><span>7</span></li>
                            </ul>
                            <div className="line"></div>
                        </div>

                        <div className="right">
                            <a className="bm">立即报到</a>
                            <a className="score-rule">积分规则?</a>
                        </div>
                    </div>

                    <div className="baobi-content">
                        <h6><img src={LoveIcon} /></h6>
                        <div className="baobi-list">
                            { list.map((obj, index) => <SignScoreItem key={index} data={obj} />)}
                        </div>
                    </div>
                    {noTip}
                </Swipe>
            </div>
        )
    }
}

SignScore.defaultProps = {
    ApiSign: "/stuff/point/checkin/info",
    ApiSignInfo: "/stuff/point/checkin/info",
    ApiLikeList: "/stuff/guessYouLike"
}

export default CSSModules(SignScore, style, {allowMultiple:true})