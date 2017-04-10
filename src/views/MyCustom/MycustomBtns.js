import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import classNames from 'classnames'
class MycustomBtns extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  changeHandler(){
    this.props.changeCallback();
  }
  enterHandler(){
    this.props.enterCallback();
  }
  render() {
    var props = this.props;
    return (
      <div className="mycustom-btns">
        <div className="btn-change" onTouchStart={this.changeHandler.bind(this)}>取消</div>
        <div className="btn-enter" onTouchStart={this.enterHandler.bind(this)}>确定</div>
      </div>
    )
  }
};
export default MycustomBtns;
