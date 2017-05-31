'use strict'

import * as React from 'react';
import * as ReactDOM from 'react-dom';





import HelpModal from "./container.js";



var div = document.createElement("div");
div.className = "virtual-help";
document.body.appendChild(div)

const Help =  ReactDOM.render(<HelpModal/>,div);

const Modal = function(){};
Modal.alert = Help.alert;
Modal.confirm = Help.confirm;

module.exports = Modal;
