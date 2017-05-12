import React, { Component } from 'react';
import classNames from 'classnames';
import 'libs/layout/layout-mixin.less';

class Flex extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let props = this.props;
    let classGroups = ['flexLayout', 'flex'];

    classGroups.push( "flex-" + props.flex_wrap );
    classGroups.push( "flex-vertical-" + props.flex_direction );
    classGroups.push( "flex-justify-" + props.justify_content );
    classGroups.push( "flex-align-" + props.align_items );
    return (
      <div className={classGroups.join(" ")}>
        {this.props.children}
      </div>
    )
  }
}
Flex.defaultProps = {
    flex_direction: "row", // row | row-reverse | column | column-reverse
    flex_wrap: "wrap", // nowrap | wrap | wrap-reverse;
    justify_content: "space-between", //flex-start | flex-end | center | space-between | space-around;
    align_items: "flex-start ", //flex-start | flex-end | center | baseline | stretch;
};
export default Flex
