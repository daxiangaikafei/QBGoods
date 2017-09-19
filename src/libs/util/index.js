export function setCookie(name, value, mode="cookie") {
  if(mode == "cookie") {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    return true;
  } else if(mode == "storage") {
    var _localStorage = window.localStorage;
    if (_localStorage) {
      _localStorage.setItem(name, value);
      return true;
    }
    return false;
  }

}

export function getCookie(name, mode="cookie") {
  if(mode == "cookie") {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    }
    else {
      return null;
    }
  } else if(mode == "storage") {
    var _localStorage = window.localStorage;
    if (_localStorage) {
      return _localStorage.getItem(name);
    }
    else
      return null;
  }
}

export function delCookie(name, mode="cookie") {
  if(mode == "cookie") {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
      document.cookie = name + '=' + cval + ";expires=" + exp.toGMTString();
    }
  } else if(mode == "storage") {
    var _localStorage = window.localStorage;
    if (_localStorage) {
      _localStorage.removeItem(name);
    }
  }
}

export function priceFormat(price, n) {
  n = n >= 0 && n <= 20 ? n : 2;
  price = parseFloat((price + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = price.split(".")[0].split("").reverse(), r = price.split(".")[1];
  var t = "";
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  if(n==0){
    return t.split("").reverse().join("");
  } else {
    return t.split("").reverse().join("") + "." + r;
  }
}

export function baoquanFormat(price, n) {
  price = price/100;
  n = n >= 0 && n <= 20 ? n : 2;
  price = parseFloat((price + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = price.split(".")[0].split("").reverse(), r = price.split(".")[1];
  var t = "";
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  if(n==0){
    return t.split("").reverse().join("");
  } else {
    return t.split("").reverse().join("") + "." + r;
  }
}

export function tagStrFormat(str, num) {
  return /(\d+)(\D+)/ig.exec(str)[num]
}

export function createCORSRequest(method, url){
  let cors_api_host = 'finiyang.com:8080'
  let cors_api_url = 'http://' + cors_api_host + '/'
  let slice = [].slice
  let origin = window.location.protocol + '//' + window.location.host
  let open = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function() {
    let args = slice.call(arguments)
    let targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1])
    if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
        targetOrigin[1] !== cors_api_host) {
        args[1] = cors_api_url + args[1]
    }
    return open.apply(this, args)
  }
  let xhr = new XMLHttpRequest()
  if ("withCredentials" in xhr){
      xhr.open(method, url, true)
  } else {
      xhr = null
  }
  return xhr
}

export function deepCopy(o) {
    if (o instanceof Array) {
        var n = [];
        for (var i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i]);
        }
        return n;

    } else if (o instanceof Object) {
        var n = {}
        for (var i in o) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else {
        return o;
    }
}

export function eventFun(pageName,model, id) {
  return {
    'data-event-pageName': pageName,
    'data-event-model': model,
    'data-event-id': id,
    'data-event': 'point'
  }
}

export const icons = {
  'tmall': require('static/imgs/thirdSource/tmall.png'),
  'dangdang': require('static/imgs/thirdSource/dangdang.png'),
  'gome': require('static/imgs/thirdSource/gome.png'),
  'jd': require('static/imgs/thirdSource/jd.png'),
  'jumei': require('static/imgs/thirdSource/jumei.png'),
  'kaola': require('static/imgs/thirdSource/kaola.png'),
  'mi': require('static/imgs/thirdSource/mi.png'),
  'taobao': require('static/imgs/thirdSource/taobao.png'),
  'yhd': require('static/imgs/thirdSource/yhd.png'),
  'yougou': require('static/imgs/thirdSource/yougou.png'),
  'qbao': require('static/imgs/thirdSource/qbao.png'),
}

export const sourceLink = {
  'tmall': "tmall.com",
  'dangdang': "dangdang.com",
  'gome': "gome.com",
  'jd': "jd.com",
  'jumei': "jumei.com",
  'kaola': "kaola.com",
  'mi': "mi.com",
  'taobao': "taobao.com",
  'yhd': "yhd.com",
  'yougou': "yougou",
  'qbao': "qbao.com"
}

export function showSourceTip(url,source,PopUp,e){
  console.log(this,PopUp.show);
  
  e.preventDefault();
}

export function getParamByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**获取地址栏中所有的参数**/
export function getRequest(url){
  let theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
