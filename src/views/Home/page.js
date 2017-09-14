import React,{ Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat } from 'libs/util'
import { fetchPosts } from "components/common/fetch"
import ReactSwipe from 'react-swipe';

class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {

  }

  componentDidUpdate() {
  }



  render() {
    return (
      <div styleName="home-container" style={this.props.style}>
        
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
