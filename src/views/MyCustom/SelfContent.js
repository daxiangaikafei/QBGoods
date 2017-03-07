import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import classNames from 'classnames'
import { connect } from 'dva'

class SelfContent extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  labelClickHandler(item , index){
    if(!item.check){
      this.props.editSelfTip( item.count );
    }
    this.props.editSelfLabelSelected(index , !item.check)
  }
  render() {
    var props = this.props;

    return (
      <div className="self-content">
        <div className="self-list">
          {
            this.props.selfLabels.map(
              (item, i) =>
                <div key={i} onTouchStart={this.labelClickHandler.bind(this, item, i)} className={item.check ? 'self-item selected' : 'self-item'}>
                  <span className="label">{item.name}</span>
                  <div className="bg"></div>
                </div>
            )
          }
        </div>
        <p className={this.props.selfTipShow ? 'self-tip self-tip-show' : 'self-tip'}>
          与您个性相匹配的人<span>{this.props.selfTipNum}</span>人
        </p>
      </div>
    )
  }
};

function mapStateToProps(state) {
    return state.mycustom;
}
function mapDispatchToProps(dispatch) {
    return {
      editSelfTip: function( num){
        dispatch({type:"mycustom/editSelfTipShow" , num: num});
      },
      editSelfLabelSelected: function(index , check){
        dispatch({type:"mycustom/editSelfLabelSelected", index: index , check: check});
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelfContent);
