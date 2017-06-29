import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../static/style/main.mobile.less'
import '../static/style/animate.less'
import { NavBar } from 'ui'
var cx = require('classnames');

function CoreLayout ({ children, location,route }) {
  var viewHeight = window.innerHeight - 0 ;
  var styles = Object.assign({}, {opacity:0}) // child.props.style contains an int (e.g 34)
    var nameObj = QBFK.Business.getName(location.pathname, route.childRoutes)
    document.title = nameObj.title
    QBFK.EventLog.sendMsg({
      pageName: nameObj.pageName,
      type: 'page'
    })


  return (
    <div>
        {/*<NavBar {...arguments[0]}/>*/}
        <main>
        {/*<main style={{height:viewHeight,position: 'fixed',top: '44px',width: '100%',overflow: 'hidden'}}>*/}
        <ReactCSSTransitionGroup component='div'
         transitionName={{
            enter: 'default-enter',
            enterActive: location.action == 'PUSH'?'fadeInRight':'fadeInLeft',
            leave: 'default-leave',
            leaveActive: location.action == 'PUSH'?'':''
          }}
         style={{overflowY: 'scroll',height: '100%',position: 'absolute',top: 0,width:'100%' }}

         transitionEnterTimeout={1000}
         transitionLeaveTimeout={1000}
        >
        {React.cloneElement(children, {
            style:{position: 'absolute',top: 0,left: 0,width: '100%'},
            key: location.pathname
        })
        }
        </ReactCSSTransitionGroup>
        </main>
  </div>
  )
}

CoreLayout.propTypes = {
    children: PropTypes.element,
    location: PropTypes.object
}

export default CoreLayout
