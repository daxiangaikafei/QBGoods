import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import classNames from 'classnames'
import Modal from "components/modal/index";
import PopUp from "components/popup/index";
import ShowCamera from "./ShowCamera";

class Cameras extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }
  componentDidUpdate() {

  }
  showClose(){
    PopUp.hide();
  }
  showCameraHandler(index){
    PopUp.show(
            (<ShowCamera cameraImgs={this.props.cameraImgs} cameraIndex={index} showClose={this.showClose} />),{maskClosable:true}
    );
  }
  render() {
    let _this = this;
    return (
      <div className="cameras-container">
        {
          this.props.cameraImgs.map(function(item,i){
            return (<div className="img-item" key={i}><img src={item} onClick={_this.showCameraHandler.bind(_this,i)}/></div>)
          })
        }
      </div>
    )
  }
};
export default CSSModules(Cameras,styles,{allowMultiple:true});
