'use strict'
import * as React from 'react';

import WinMark from "./../modal/winMark.js";
import PopUp from "./popup";

import _ from "lodash";

import { VelocityComponent,VelocityTransitionGroup }  from "velocity-react";

class HelpModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            popUp:{},
            showModal:false
        }
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }
    hide(){
        this.setState({
            showModal:false,
            popUp:{},
        })

        let self = this;
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                    resolve();
            })
        })
    }
    show(content,options){
        let self = this;

        return new Promise(function(resolve, reject){
            let popUp = Object.assign({},options,{
                show:true,
                children:content,
                onMaskClose:function(){
                    if(options&&options.maskClosable===true){
                        self.hide().then(function(){
                            resolve("Ok");
                        });

                    };
                }
            })
            self.setState({
                showModal:true,
                popUp
            })
        });
    }
    render(){
        let {showModal,popUp} = this.state;

        let {anEnter,anLeave} = this.props;
        return (
            <div className="help">
                <WinMark show={showModal} onClick = {popUp.onMaskClose}/>
                <VelocityTransitionGroup enter={anEnter} leave={anLeave}>
                {showModal&&(<PopUp {...popUp}/>)}
                </VelocityTransitionGroup>
            </div>
        )
    }

}

HelpModal.defaultProps = {
    anEnter:{
        duration:200,
        animation: "slideDown"
    },
    anLeave:{
        duration:200,
        animation: "slideUp"
    }
}

//

module.exports = HelpModal;
