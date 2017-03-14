import React,{ Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import classNames from 'classnames'
import { Link,browserHistory } from 'react-router'
import { fetchPosts } from "components/common/fetch"
import ShopContent from "./ShopContent";
import SelfContent from "./SelfContent";

class MyCustom extends Component {

  constructor(props) {
    super(props)
    props.getShopLists();
  }
  componentDidMount() {

  }

  componentDidUpdate() {

  }
  tabClickHandler(active){
    this.props.setTabActive(active);
  }
  enterHandler(){
    let tagDetailIds = [];
    var shopLabels = this.props.shopLabels;
    this.props.shopLabelsDefault.map((item,i) => {
      if(shopLabels[i].check !== item.check){
        tagDetailIds.push(item.tagDetailId);
      }
    });

    let tagSelfDetailIds = [];
    var selfLabels = this.props.selfLabels;
    this.props.selfLabelsDefault.map((item,i) => {
      if(selfLabels[i].check !== item.check){
        tagSelfDetailIds.push(item.tagDetailId);
      }
    });

    this.props.saveLabels(tagDetailIds.join(","), tagSelfDetailIds.join(",") );
  }
  render() {
    let customcontent;
    if (this.props.tabActive === "shop") {
      customcontent = <ShopContent/>;
    } else {
      customcontent = <SelfContent  />;
    }
    return (
      <div className="mycustom-container">
        <div className="mycustom-tab">
          <div className={this.props.tabActive === "shop" ? 'mycustom-active' : ''} onTouchStart={this.tabClickHandler.bind(this,'shop')}>购物标签</div>
          <div className={this.props.tabActive === "self" ? 'mycustom-active' : ''} onTouchStart={this.tabClickHandler.bind(this,'self')}>个人标签</div>
        </div>
        {customcontent}
        <div className="mycustom-btns">
          <button className="btn-change" onTouchStart={() => this.props.history.goBack()}>取消</button>
          <button className="btn-enter" onTouchStart={this.enterHandler.bind(this)}>确定</button>
        </div>
      </div>
    )
  }
};
function mapStateToProps(state) {
    return state.mycustom;
}

function mapDispatchToProps(dispatch) {
    return {
      getShopLists: function(act){
          dispatch({type: 'mycustom/getShopLabels' });
      },
      setTabActive: function(act){
        dispatch({type: "mycustom/tabAct",active:act});
      },
      saveLabels: function(ids, selfIds){
        dispatch({type: "mycustom/saveLabels", tagDetailIds: ids , tagSelfDetailIds: selfIds});
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(MyCustom,styles,{allowMultiple:true}));
