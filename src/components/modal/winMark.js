'use strict'
import * as React from 'react';

import "./winMark.scss";



class WinMark extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {children,show,onClick} = this.props;
        return (
            <div onClick={onClick} className={"virtual-mark "+(show===true?"vi-show":" vi-hide")} >
                {children}
            </div>
        )
    }
};

WinMark.defaultProps = {
    show:false,
    onClick:()=>{}
}
WinMark.contextTypes = {

};
module.exports = WinMark;
