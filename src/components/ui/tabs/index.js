import React, {Component} from 'react'
import {connect} from 'dva'
import CSSModules from 'react-css-modules'
import styles from './index.less'
import {Link} from 'react-router'
import classNames from 'classnames'

class Tabs extends Component {

    constructor(props) {
        super(props)
        // props.getLevel()

        this.state = {
            tabActive: props.tabsConfig.active || 0
        }
    }

    toggleTabHandler = (e) => {
        this.setState({
            tabActive: e
                .currentTarget
                .getAttribute('data-active')
        })
    }

    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        let tabInner = this.props.tabsConfig.names.map((name, index) => 
           <label key={index}>
              <span
                  styleName={classNames({
                  'tab-item': true,
                  'active': this.state.tabActive == index
              })}
                  data-active={index}
                  onClick={this.toggleTabHandler}>
                  <i>{name}</i>
              </span>
          </label>
        )

        return (
            <div styleName="tabs">
                {tabInner}
            </div>
        )
    }

};

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Tabs, styles, {allowMultiple: true}));