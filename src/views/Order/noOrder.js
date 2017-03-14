'use strict'
import * as React from 'react';

//import * as _ from "lodash";





class NoOrder extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        
        return (
            <div className="container-no-order">
                <div></div>
                <p>亲，购物才会返宝券哟</p>
                <button>立即前去</button>
            </div>
        )
    }
};

NoOrder.defaultProps = {
}

module.exports = NoOrder;


