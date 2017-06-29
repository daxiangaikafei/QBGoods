import React, {Component} from 'react'
import {connect} from 'dva'
import { eventFun } from 'libs/util'
import { TabsBase } from 'ui'

class Tabs extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
        props.tabsConfig.model ? props[props.tabsConfig.model][props.tabsConfig.statusKey ? props.tabsConfig.statusKey : 'tabActive'] = props.tabsConfig.active || 0 : void 0
        props.action(`${props.tabsConfig.model}/${props.tabsConfig.names[props.tabsConfig.active || 0].action}`, props.tabsConfig.stuffId)
    }

    toggleTabHandler = index => {
        let props = this.props
        props.tabsConfig.model ? props[props.tabsConfig.model][props.tabsConfig.statusKey ? props.tabsConfig.statusKey : 'tabActive'] = index : void 0
        props[props.tabsConfig.model]['page'] == 1
        props.action(`${props.tabsConfig.model}/${props.tabsConfig.names[index].action}`, props.tabsConfig.stuffId)
    }

    eventLog = (pageName, model) => {
        return index => {
            return eventFun(pageName, model, index)
        }
    }
    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        let { pageName, model } = this.props.eventConfig
        return (
            <TabsBase
                tabsConfig={
                    Object.assign(this.props.tabsConfig, {
                        toggleTabHandler: this.toggleTabHandler
                })}
                eventConfig={{
                    eventLog: this.eventLog(pageName, model)
                }}
            />
        )
    }
};

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        action(type, stuffId) {
            dispatch({ type , stuffId});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
