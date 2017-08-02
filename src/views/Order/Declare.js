import React from 'react'
import classNames from 'classnames'
import './declare.less'

const Declare = props => {
  return (
    <div className="declare-container">
      <div className="qrcode">
      </div>
      <div className="declare">
        <h4>有好货正式更名为<span>“我有好物”</span>欢迎大家关注我们</h4>
        <p>1、在微信里面搜索公众号“我有好物”</p>
        <p>2、[用户中心]->[绑定返现]->[我的订单]->[绑定订单]</p>
      </div>
    </div>
  )
}

export default Declare