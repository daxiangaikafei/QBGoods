'use strict'

import * as React from 'react';
import * as ReactDOM from 'react-dom';





import HelpPopUp from "./container.js";


  
var div = document.createElement("div");
div.className = "virtual-help";
document.body.appendChild(div)

const Help =  ReactDOM.render(<HelpPopUp/>,div);

const PopUp = function(){};
PopUp.show = Help.show;
PopUp.hide = Help.hide;

module.exports = PopUp;