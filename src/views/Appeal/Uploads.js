import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import classNames from 'classnames'
import Modal from "components/modal/index";
import PopUp from "components/popup/index";
import { Icon } from 'ui';
import { fetchPosts } from "components/common/fetch"

class Uploads extends Component {
  canvas = document.createElement("canvas");
  ctx = this.canvas.getContext('2d');

  tCanvas = document.createElement("canvas");
  tctx = this.tCanvas.getContext('2d');
  maxsize = 200 * 1024;
  constructor(props) {
    super(props)
    this.upload = this.upload.bind(this);
  }
  componentDidMount() {

  }
  componentDidUpdate() {

  }
  uploadClick(event){
    document.getElementById("choose").click();
  }
  uploadChange(event){
    let _this = this;
    let target = event.target;
    let cameraImgs = this.props.cameraImgs || [];

    console.log("uploadChange....", target.files.length);

    if (!target.files.length) return;
    var files = Array.prototype.slice.call(target.files);
    if (files.length > 5 - cameraImgs.length) {
        Modal.alert("提示","最多只可上传5张图片");
        return;
    }
    files.forEach(function (file, i) {
        if (file.size > 5000 * 1024) {
            Modal.alert("提示","上传图片不能大于5M");
            target.value = "";
            return;
        } else if (file.size == 0) {
            Modal.alert("提示","上传图片路径不正确（可能包含中文）");
            target.value = "";
            return;
        }
        if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;

        var reader = new FileReader();
        reader.onload = function () {
            var result = this.result;
            var img = new Image();
            img.src = result;
            // $(li).css("background-image", "url(" + result + ")");
            //如果图片大小小于100kb，则直接上传
            if (result.length <= this.maxsize) {
                img = null;
                this.upload(result, file.type);
                return;
            }
//                图片加载完毕之后进行压缩，然后上传
            if (img.complete) {
                callback();
            } else {
                img.onload = callback;
            }
            function callback() {
                var data = _this.compress(img);
                _this.upload(data, file.type);
                img = null;
            }
            target.value = "";
        };
        reader.readAsDataURL(file);
    })
  }

  getBlob(buffer, format) {
    var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
    if (Builder) {
        var builder = new Builder;
        builder.append(buffer);
        return builder.getBlob(format);
    } else {
        return new window.Blob([buffer], {type: format});
    }
  }
  upload(basestr, type, $li) {
    var _this = this;
    var text = window.atob(basestr.split(",")[1]);
    var buffer = new Uint8Array(text.length);
    var pecent = 0, loop = null;
    for (var i = 0; i < text.length; i++) {
        buffer[i] = text.charCodeAt(i);
    }
    var blob = this.getBlob(buffer, type);

    var xhr = new XMLHttpRequest();
    var formdata = new FormData();

    formdata.append('image', blob);
    formdata.append('imageType', type.replace("image/",""));
    formdata.append('userId', '10001');
    xhr.open('post', '/stuff/appeal/upload.do');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log( typeof xhr.responseText )
                var jsonData = JSON.parse(xhr.responseText);
                // var xData = JSON.parse(jsonData.message);
                if(jsonData.data){
                  _this.props.uploadComplete(jsonData.data);
                }

                console.log(jsonData.message);
                console.log('上传成功');
                clearInterval(loop);
            } else {

            }
        }
    };
    //数据发送进度，前50%展示该进度
    xhr.upload.addEventListener('progress', function (e) {
        if (loop) return;
        pecent = ~~(100 * e.loaded / e.total) / 2;
        console.log(pecent);
        // $li.find(".progress span").css('width', pecent + "%");
        if (pecent == 50) {
            mockProgress();
        }
    }, false);
    xhr.send(formdata);
    //数据后50%用模拟进度
    function mockProgress() {
        if (loop) return;
        loop = setInterval(function () {
            pecent++;
            // $li.find(".progress span").css('width', pecent + "%");
            if (pecent == 99) {
                clearInterval(loop);
            }
        }, 100)
    }

  }
  compress(img) {
    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }
    this.canvas.width = width;
    this.canvas.height = height;

//        铺底色
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    //如果图片像素大于100万则使用瓦片绘制
    var count;
    if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
//            计算每块瓦片的宽和高
        var nw = ~~(width / count);
        var nh = ~~(height / count);
        this.tCanvas.width = nw;
        this.tCanvas.height = nh;
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                this.tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                this.ctx.drawImage(this.tCanvas, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        this.ctx.drawImage(img, 0, 0, width, height);
    }
    //进行最小压缩
    var ndata = this.canvas.toDataURL('image/jpeg', 0.5);
    console.log('压缩前：' + initSize);
    console.log('压缩后：' + ndata.length);
    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    this.tCanvas.width = this.tCanvas.height = this.canvas.width = this.canvas.height = 0;
    return ndata;
  }
  uploadFile(){
    console.log("uploadFile....");
  }
  render() {
    let _this = this;
    //onClick={()=>this.uploadFile()}
    console.log(this.canvas)
    return (
      <div className="upload-button">
        <input type="file" ref="choose" id="choose" accept="image/*" capture="camera"  onChange={(event)=>this.uploadChange(event)}/>
        <Icon name="camera" color="#fff" size="30" styleName=""  />
        <div className="mask-upload" onClick={(event)=>this.uploadClick(event)}></div>
      </div>
    )
  }
};
export default CSSModules(Uploads,styles,{allowMultiple:true});
