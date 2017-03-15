import React, {Component} from 'react'
import {connect} from 'dva'
import CSSModules from 'react-css-modules'
import styles from './index.less'
import {Link} from 'react-router'
import classNames from 'classnames'

class Tabs extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tabActive: props.tabsConfig.active || 0
        }
        props.tabsConfig.model ? props[props.tabsConfig.model][props.tabsConfig.statusKey ? props.tabsConfig.statusKey : 'tabActive'] = props.tabsConfig.active || 0 : void 0
        props.action(`${props.tabsConfig.model}/${props.tabsConfig.names[props.tabsConfig.active || 0].action}`)
    }

    toggleTabHandler = (e) => {
        let index = e.currentTarget.getAttribute('data-active')
        this.setState({
            tabActive: index
        })
        let props = this.props
        props.tabsConfig.model ? props[props.tabsConfig.model][props.tabsConfig.statusKey ? props.tabsConfig.statusKey : 'tabActive'] = index : void 0
        props[props.tabsConfig.model]['page'] == 1
        props.action(`${props.tabsConfig.model}/${props.tabsConfig.names[index].action}`)
    }

    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        return (
            <div styleName="tabs">
                {
                    this.props.tabsConfig.names.map((item, index) =>
                        <label key={index}>
                            <span
                                styleName={classNames({
                                    'tab-item': true,
                                    'active': this.state.tabActive == index
                                })}
                                data-active={index}
                                onClick={this.toggleTabHandler}>
                                <i>{item.key}</i>
                            </span>
                        </label>
                    )
                }
            </div>
        )
    }
};

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        action(type) {
            dispatch({ type });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Tabs, styles, {allowMultiple: true}));