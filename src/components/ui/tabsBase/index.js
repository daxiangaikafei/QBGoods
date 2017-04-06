import React, {Component} from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.less'
import classNames from 'classnames'

class TabsBase extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tabActive: props.tabsConfig.active || 0
        }
    }

    toggleTabHandler = (e) => {
        let index = e.currentTarget.getAttribute('data-active')
        this.setState({
            tabActive: index
        })
        this.props.tabsConfig.toggleTabHandler && this.props.tabsConfig.toggleTabHandler(index)
    }

    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        let { itemProps } = this.props.tabsConfig
        let eventLog = this.props.eventConfig ? this.props.eventConfig.eventLog : void 0
        return (
            <div styleName="tabs">
            {
                this.props.tabsConfig.names.map((item, index) =>
                    <label key={index} >
                        <span
                            styleName={classNames({
                                'tab-item': true,
                                'active': this.state.tabActive == index
                            })}
                            { ...itemProps }
                            { ...eventLog && eventLog(index+1) }
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

export default CSSModules(TabsBase, styles, {allowMultiple: true});