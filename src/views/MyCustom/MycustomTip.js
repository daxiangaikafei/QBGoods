import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import classNames from 'classnames'
class MycustomTip extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  render() {
    var props = this.props;
    return (
      <div>
        <p className={this.props.selfTipShow ? 'self-tip self-tip-show' : 'self-tip'}>
          与您个性相匹配的人<span>{this.props.selfTipNum}</span>人
        </p>
        <p className={this.props.shopTipShow ? 'shop-tip shop-tip-show' : 'shop-tip'}>
          与你购物喜好相似的人有<span>{this.props.shopTipNum}</span>人
        </p>
      </div>
    )
  }
};
export default MycustomTip;
