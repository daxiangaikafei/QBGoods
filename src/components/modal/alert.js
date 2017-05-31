'use strict'
import * as React from 'react';
//import * as _ from "lodash";

import styles from  "./alert.scss";


import { VelocityComponent,VelocityTransitionGroup }  from "velocity-react";

//console.log(styles);

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.handOk = this.handOk.bind(this);
        this.handCancel = this.handCancel.bind(this);
        this.callBack = this.callBack.bind(this);

        this.state = {
            anBefore:{
                duration:60,
                animation:{
                    scaleX:0.8,
                    scaleY:0.8
                },
                visibility:"hidden",
            },
            anAfter:{
                duration:300,
                animation:{
                    scaleX:1,
                    scaleY:1
                },
                visibility:"visible"
                //easing:[1.1,1.5]
                //easing: "easeInExpo"
            }
        }
    }
    handOk(){
        this.callBack("Ok");
    }
    handCancel(){
        this.callBack("Cancel")
    }
    callBack(data){
         let {callBack} = this.props;
          callBack&&callBack(data);
    }
    close(){

    }
    render() {
        let {message,show,title,children,isConfirm,closable} = this.props;

       let {anBefore,anAfter} = this.state;
       //+(show===true?"":"hide")
        return (
            <VelocityComponent  {...(show===true?anAfter:anBefore)}>
                <div className={"virtual-modal-wrap "}>
                    <div className={"virtual-modal "} >
                        <button onClick={this.handCancel} className={"virtual-modal-close"+(closable?"":" vi-hide")}>X</button>
                        <div className="virtual-modal-header">
                            <p>{title}</p>
                        </div>
                        <div className="virtual-modal-body">
                            <div className="vmb-p">{message}</div>
                        </div>
                        <div className="virtual-modal-footer">
                            {this.renderBtns()}
                        </div>
                    </div>
                </div>
           </VelocityComponent>
        )
    }
    renderBtns(){
        let {actions,isConfirm} = this.props;
         if(isConfirm===true){
             return (
                 <div className="virtual-modal-button-group-h">
                    <a className="virtual-modal-button" onClick={this.handCancel}>取消</a>
                    <a className="virtual-modal-button" onClick={this.handOk}>确定</a>
                </div>
             );
        }else{
            return (
                <div className="virtual-modal-button-group-v">
                    {actions.length>0&&actions}
                    {actions.length===0&&(
                        <a className="virtual-modal-button" onClick={this.handOk}>确定</a>
                    )}
                </div>
            )
        }
    }
};

Alert.defaultProps = {
    title:"",
    message:'',
    show:false,
    isConfirm:false,
    closable:true,//是否显示删除按钮
    actions:[]
}
// Alert.contextTypes = {
//   message: React.PropTypes.string.isRequired,
//   show:React.PropTypes.bool.isRequired,
//   callBack:React.PropTypes.func.isRequired,
// };
module.exports = Alert;
