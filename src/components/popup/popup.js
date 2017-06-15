'use strict'
import * as React from 'react';


import "./index.scss";
//import 'rmc-picker/assets/index.css';


class PopUp extends React.Component {
    constructor(props) {
        super(props);
        //this.handClick = this.handClick.bind(this);
    }
    // handClick(){
    //     // let {maskClosable} = this.props;
    //     // if(maskClosable ===false){
    //     //     return false;
    //     // }
    //     debugger
    //     let {onMaskClose} = this.props;
    //     onMaskClose&&onMaskClose();

    // }
    render() {
        let {show,maskClosable,showClose,onMaskClose,children,animationType,isBgAlpha} = this.props;
        return (

                <div className={"virtual-popup virtual-popup-slide-" + (animationType==="slide-down"?"down":"up") + (isBgAlpha && " bgalpha")}>
                        <div className="am-popup-content">
                            <div className="am-popup-body">{children}</div>
                        </div>
                </div>

        )
    }
};

/**
 * <button>
                                 <button onClick={this.handCancel} className={"virtual-modal-close"+(closable?"":" hide")}>X</button>
                            </button>
 */

PopUp.defaultProps = {
    show:false,
    maskClosable:false,
    showClose:false,
    animationType:"slide-up",
    onMaskClose:function(){}
}
PopUp.contextTypes = {

};
module.exports = PopUp;
