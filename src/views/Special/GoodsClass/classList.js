import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'

class classList extends Component {
  classimg =  require('static/imgs/class.png');
  constructor(props) {
    super(props)

  }
  handlerclick(){
    // require("https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js");
  }
  render() {

    return (
      <div className="goodsClass-list-container">
        <div className="goodsClass-title">
          <p>adadadaddada</p>
          <i></i>
        </div>
        <div className="goodsClass-list">
          <div className="goodsClass-item">
            <div className="goodsClass-item-img">
              <img src={this.classimg}/>
            </div>
            <p className="goodsClass-item-name">sssss</p>
          </div>
          <div className="goodsClass-item">
            <div className="goodsClass-item-img">
              <img src={this.classimg}/>
            </div>
            <p className="goodsClass-item-name">sssss</p>
          </div>
          <div className="goodsClass-item">
            <div className="goodsClass-item-img">
              <img src={this.classimg}/>
            </div>
            <p className="goodsClass-item-name">sssss</p>
          </div>
          <div className="goodsClass-item">
            <div className="goodsClass-item-img">
              <img src={this.classimg}/>
            </div>
            <p className="goodsClass-item-name">sssss</p>
          </div>
          <div className="goodsClass-item">
            <div className="goodsClass-item-img">
              <img src={this.classimg}/>
            </div>
            <p className="goodsClass-item-name">sssss</p>
          </div>
          <div className="goodsClass-item">
            <div className="goodsClass-item-img">
              <img src={this.classimg}/>
            </div>
            <p className="goodsClass-item-name">sssss</p>
          </div>
        </div>
      </div>
    )
  }
};
export default CSSModules(classList,styles,{allowMultiple:true});
