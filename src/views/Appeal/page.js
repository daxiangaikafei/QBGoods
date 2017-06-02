import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun } from 'libs/util'
import { fetchPosts } from "components/common/fetch"
import Swipe from "components/swipe/swipe";
import { Icon } from 'ui';
import Cameras from './Cameras';
import IponeOther from './IponeOther';
import Uploads from './Uploads';

import Modal from "components/modal/index";
import PopUp from "components/popup/index";


class Appeal extends Component {
  cameraImg = require('static/imgs/camera.jpg');
  constructor(props) {
    super(props)

    let appealData = {};
    appealData = this.props.location && this.props.location.state.appealData;
    this.state = {
        isLoading: false,
        iponeBrands: ["华为", "金立", "魅族", "中兴", "荣耀", "乐视" , "小米", "vivo", "oppo", "联想", "锤子", "360手机", "酷派", "海信", "长虹", "天语", "苹果", "摩托罗拉", "诺基亚", "三星", "其它"],
        appealData: Object.assign(this.props.forms, appealData , {"cameraImgs": []})
    }
    console.log(this.state);
    this.uploadComplete = this.uploadComplete.bind(this);
    this.submitData = this.submitData.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  componentDidMount() {

  }
  componentDidUpdate() {

  }
  touchMove(that,args){

  }
  phoneBrandChange(event){
    let _value = event.target.value;
    let _this = this;
    let _iponeBrands = this.state.iponeBrands;
    let _appealData = this.state.appealData;
    if(_value === "其它"){
      Modal.confirm("请输入手机品牌！", (<IponeOther  />) ).then((data)=>{
          if(data ==="Ok"){
            var otherText = document.getElementById("IponeOtherText").value;

            if(_iponeBrands.indexOf(otherText) <= -1){

              _appealData.phoneBrand = otherText;
               _iponeBrands.push(otherText);
              this.setState({
                  appealData: _appealData,
                  iponeBrands: _iponeBrands
              });
            }
            return;
          }
      });
    }else{
      _appealData.phoneBrand = _value;
      this.setState({
          appealData: _appealData
      });
    }
  }



  inputError(input){
    var _errorInput = ReactDOM.findDOMNode(this.refs[input]);
    _errorInput.className = _errorInput.className + " error-input";
  }
  inputOk(input){
    var _errorInput = ReactDOM.findDOMNode(this.refs[input]);
    if(_errorInput.className.indexOf("error-input") > -1){
      _errorInput.className = _errorInput.className.replace("error-input","");
    }
  }
  submitData(){

      let {isLoading, appealData} = this.state;

      if(isLoading){
          return;
      }
      // this.setState({
      //     isLoading:true
      // })
      let _this = this;
      let _isError = false;
      let param = Object.assign({},{ ...appealData });

      if(!param.orderId || param.orderId === ""){
        _this.inputError("orderIdC");
        _isError = true;
      }
      // if(!param["content"] || param["content"] === ""){
      //   _this.inputError("contentC");
      //   _isError = true;
      // }
      // if(!param.phoneType || param.phoneType === ""){
      //   _this.inputError("phoneTypeC");
      //   _isError = true;
      // }
      if(!param.qq || param.qq === ""){
        _this.inputError("qqC");
        _isError = true;
      }
      if(!param.phone || param.phone === ""){
        _this.inputError("phoneC");
        _isError = true;
      }
      if(_isError){
        Modal.alert("提示","请填写完全！");
        return;
      }
      if(!(/^((\+?86)|(\(\+86\)))?1\d{10}$/.test(param.phone))){
        _this.inputError("phoneC");
        Modal.alert("提示","手机号码填写错误！");
        return;
      }
      console.log(param);
      param.imgUrl = param.cameraImgs.join(",");
      delete param.cameraImgs;
      fetchPosts("/stuff/appeal/submit.do",param,"GET").then((data)=>{
          if(data.responseCode===1000){
            Modal.alert("提示","提交成功").then(function(){
              _this.context.router.push({"pathname": "order", state: { status: 3 }});
            });
          }else{
            Modal.alert("提示",data.message);
             _this.setState({
                isLoading:false
              });
          }
       }).catch(function(){
         Modal.alert("提示","提交失败");
          _this.setState({
              isLoading:false
            });
       });
      // var formdata = new FormData();
      //
      // param.map(function(n,k){
      //   formdata.append(k, n);
      // });
      //  fetch("/stuff/appeal/submit.do", {
      //          method: "POST",
      //          headers: {
      //              'Accept': 'application/json',
      //              'Content-Type': 'application/x-www-form-urlencoded',
      //              "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      //              "Response-Content-Type":'application/json'
      //          },
      //          credentials: 'same-origin',
      //          body: param
      //      })
      //      .then((res) => {
      //          var result;
      //          try{
      //              result = res.json();
      //          }catch(errorMsg){
      //              return fetchError(errorMsg);
      //          }
      //          return result;
      //      })
      //      .then((data) => {
      //          console.log('收到data', data);
      //          return data;
      //      }).catch(function(){
      //         _this.setState({
      //             isLoading:false
      //           });
      //      })
  }
  changeUpdate(event,key){
    if(event.target.value !== ""){
      this.inputOk(key+"C");
    }
    let _appealData = this.state.appealData;
    _appealData[key] = event.target.value;
    this.setState({
        appealData: _appealData
    });
  }
  uploadComplete(data){
    // console.log(img, val);
    let _appealData = this.state.appealData;
    _appealData.cameraImgs.push(data.src);
    this.setState({
        appealData: _appealData
    });
  }
  render() {

    let props = {
        property:"translateY",
        className:"scroll-warpper",
        tag:"ul",
        min:"auto",
        stopPro:false,
        vertical:true,
        touchMove:this.touchMove
        //step:200
    }
    let appealData = this.state.appealData;
    // <div className="form-item-camera">
    //   {
    //     appealData.cameraImgs.length > 0 ? <Cameras cameraImgs={appealData.cameraImgs}/> : ''
    //   }
    //   <div>
    //     <Uploads cameraImgs={appealData.cameraImgs} uploadComplete={this.uploadComplete} />
    //   </div>
    //   {
    //     appealData.cameraImgs.length > 0 ? '' : <p className="cameraC">为了更好的帮助解决问题，请上传照片。最多5张，支持jpg,bmp,png</p>
    //   }
    // </div>
    return (
      <div className="appeal-container">
          <div className="form-warpper">
              <div className="form-item" ref="orderIdC">
                <label>订单号</label>
                <input type="tel" placeholder="输入订单号" value={appealData.orderId} onChange={(event)=>this.changeUpdate(event,"orderId")}/>
              </div>
              <div className="form-item">
                <label>订单来源</label>
                <select className="appeal-source" value={appealData.source} onChange={(event)=>this.changeUpdate(event,"source")}>
                  <option value="tmall">天猫</option>
                  <option value="taobao">淘宝</option>
                  <option value="jd">京东</option>
                </select>
                <i className="icon-select-arrow"><Icon name="arrow-down" color="#d2d2d2" size="18" styleName="" /></i>
              </div>
              <div className="form-item">
                <label>手机品牌</label>
                <select className="appeal-phoneBrand" value={appealData.phoneBrand} onChange={(event)=>this.phoneBrandChange(event)}>
                  {
                    this.state.iponeBrands.map((item, i)=>
                      <option value={item} key={i}>{item}</option>
                    )
                  }
                </select>
                <i className="icon-select-arrow"><Icon name="arrow-down" color="#d2d2d2" size="18" styleName="" /></i>
              </div>
              <div className="form-item" ref="phoneTypeC">
                <label>手机型号</label>
                <input type="text" placeholder="输入手机型号" value={appealData.phoneType}  onChange={(event)=>this.changeUpdate(event,"phoneType")}/>
              </div>
              <div className="form-item">
                <label>申诉原因</label>
                <select className="appeal-reason" value={appealData.reason}  onChange={(event)=>this.changeUpdate(event,"reason")}>
                  {
                    this.props.reasons.map((item, i)=>
                      <option value={item} key={i}>{item}</option>
                    )
                  }
                </select>
                <i className="icon-select-arrow"><Icon name="arrow-down" color="#d2d2d2" size="18" styleName="" /></i>
              </div>
          </div>
          <div className="form-warpper fn-mi2">
            <div className="form-item-info">
              <p>详细问题描述(限250字内)</p>
              <textarea ref="contentC" maxLength="250" value={appealData.content} placeholder="亲，您可以留下更详细的问题，我们会尽快联系您的噢～"  onChange={(event)=>this.changeUpdate(event,"content")}>
                
              </textarea>
            </div>

          </div>
          <div className="form-warpper fn-mi2">
              <p className="form-contact-title">
                您的联系方式：
              </p>
              <div className="form-contact-item">
                <label>QQ：</label>
                <input ref="qqC" type="tel" maxLength="12" value={appealData.qq}  onChange={(event)=>this.changeUpdate(event,"qq")}/>
              </div>
              <div className="form-contact-item">
                <label>手机号：</label>
                <input ref="phoneC" type="tel" maxLength="11" value={appealData.phone}  onChange={(event)=>this.changeUpdate(event,"phone")}/>
              </div>
              <div className="form-contact-item">
                  <div className="appeal-submit" onClick={()=>this.submitData()}>提交</div>
              </div>
          </div>
        </div>
    )
  }
};
Appeal.defaultProps = {
  forms:{
    "qq":"",
    "phone":"",
    "content":"",
    "phoneType":"",
    "orderId":"",
    "source": "tmall",
    "reason": "什么时候返券",
    "phoneBrand": "华为"
  },
  reasons:[
    "什么时候返券","返券数目不对","购物之后，没有显示返券订单","返券订单在哪里查看","什么时候到货","其它"
  ]
}
Appeal.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default CSSModules(Appeal,styles,{allowMultiple:true});
