import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import Flex from "components/ui/flex";

class FlexLayout extends Component {

  constructor(props) {
    super(props);

  }
  componentDidMount() {
    // this.getData(1);
  }

  componentDidUpdate() {

  }

  render() {

    return (
      <div>
        <Flex flex_direction="row" >
          <div className="items">1</div>
          <div className="items">2</div>
          <div className="items">3</div>
          <div className="items">4</div>
          <div className="items">
            <Flex>
              <div className="items">1</div>
              <div className="items">2</div>
              <div className="items">3</div>
              <div className="items">4</div>
            </Flex>
          </div>
        </Flex>
      </div>
    )
  }
};
export default CSSModules(FlexLayout,styles,{allowMultiple:true});
