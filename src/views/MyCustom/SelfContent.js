import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import classNames from 'classnames'
import { connect } from 'dva'
import Tappable from 'react-tappable';
import Swipe from "components/swipe/swipe";
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
    let swipeProps = {
        property:"translateY",
        className:"scroll-self-warpper",
        tag:"ul",
        min:"auto",
        stopPro:false,
        vertical:true,
        // touchMove:this.touchMove
        //step:200
    }
    return (
      <Swipe  {...swipeProps} >
        <div className="self-content">
          <div className="self-list">
            {
              this.props.selfLabels.map(
                (item, i) =>
                  <Tappable key={i}  onTap={this.labelClickHandler.bind(this, item, i)} className={item.check ? 'self-item selected' : 'self-item'}>
                    <span className="label"><i className="icon-selected"></i>{item.name}</span>
                    <div className="bg"></div>
                  </Tappable>
              )
            }
          </div>
        </div>
      </Swipe>
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
