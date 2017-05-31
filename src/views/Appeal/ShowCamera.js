import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import classNames from 'classnames'
import ReactSwipe from 'react-swipe';

class ShowCamera extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }
  componentDidUpdate() {

  }
  render() {

    return (
      <div className="showCamera-container" onClick={this.props.showClose}>
        <ReactSwipe ref="swiper" className="carousel" swipeOptions={{startSlide: this.props.cameraIndex,continuous: false}}>
          {
            this.props.cameraImgs.map(function(item,i){
              return (<div key={i}><img src={item}/></div>)
            })
          }
        </ReactSwipe>
      </div>
    )
  }
};
export default CSSModules(ShowCamera,styles,{allowMultiple:true});
