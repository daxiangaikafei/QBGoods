import React,{ Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat } from 'libs/util'
import { fetchPosts } from "components/common/fetch"
import ReactSwipe from 'react-swipe';
const bannerList = [
  {
    imgUrl: require('static/imgs/activity/banner2.jpg')
  },
  {
    imgUrl: require('static/imgs/activity/banner3.jpg')
  },
]
class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bannerActive:0,
    }
  }

  componentDidMount() {

  }

  componentDidUpdate() {
  }



  render() {
    return (
      <div styleName="home-container" style={this.props.style}>
        <div className="search">
          <div className="input">
            
          </div>
        </div>
        <div styleName="banner">
          <ReactSwipe ref="swiper" swipeOptions={{continuous: false, callback: bannerActive=>{this.setState({bannerActive})}}}>
            {bannerList.map((item, index) => (
              <img src={item.imgUrl} key={index} onClick={()=>{}}/>
            ))}
          </ReactSwipe>
          <div styleName="swiper-pagination">
            {
              bannerList.map((item,i)=> <span key={i} styleName={classNames('swiper-pagination-bullet',{'swiper-pagination-bullet-active':this.state.bannerActive == i})}></span>)
            }
          </div>
      </div>
      </div>
    )
  }



  


};


function mapStateToProps(state) {
    return state.home;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}
Home.PropTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Home,styles,{allowMultiple:true}));
