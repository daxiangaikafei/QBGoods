import React, { Component } from 'react'
import * as ReactDOM from 'react-dom'
import classNames from 'classnames'
import { connect } from 'dva'
import { Link } from 'react-router'
import { eventFun } from 'libs/util'
import { fetchPosts } from "components/common/fetch"
import "./themes.less"

class Themes extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      inner: [],
      outer: [],
      isScale: false
    }
  }
  
  componentWillMount() {

  }
  
  componentDidMount() {
    let starryNight = {
      container1: document.getElementById('container1'),
      container2: document.getElementById('container2'),
      container3: document.getElementById('container3'),
      containertest: document.getElementById('container4'),
      uri: window.location.hostname,
      body: document.getElementsByClassName('night-background')[0],

      init: function() {
        starryNight.setStars();
        starryNight.body.classList.add("show_website_nav")
      },

      setStars: function() {
        for (let i = 0; i < 40; i++) {
          starryNight.container1.innerHTML += "<i class='star'></i>"
          starryNight.container2.innerHTML += "<i class='star'></i>"
          starryNight.container3.innerHTML += "<i class='star'></i>"
          starryNight.containertest.innerHTML += "<i class='star'></i>"
        }
      }
    }
    starryNight.init()

    fetchPosts('/stuff/theme/getUserTheme.do',{},'GET').then(data => {
      if (data.success) {
        let planets = data.data
        this.handlePlanets(planets)
      }
    })
  }
  componentDidUpdate() {
  }
  handlePlanets = planets => {
    let inner = [], 
        outer = []
    // while (planets.length > 0) {
    //   props.inner.push(planets.pop())
    //   if (planets.length > 0) {
    //     props.outer.push(planets.pop())
    //   }
    // }
    for (let i = 0; i < 4; i++) {
      let innerItem = planets.pop(),
          outerItem = planets.pop()
      if (!innerItem && i > 0 && i != 3) {
        let temp = inner[i-1]
        inner[i-1] = innerItem
        inner[i] = temp
      } else {
        inner[i] = innerItem
      }
      
      if (!outerItem) {
        let temp = outer[i-1]
        outer[i-1] = outerItem
        outer[i] = temp
      } else {
        outer[i] = outerItem
      }
    }
    this.setState({
      inner,
      outer
    })
    // console.log('inner', props.inner)
    // console.log('outer', props.outer)
  }
  handlePlanetsClick = id => {
    this.setState(
      {
        isScale: true
      }
    )
    this.context.router.push({"pathname": "/", state: { id: id }})

  }
  render() {
    let { inner, outer } = this.state
    let innerContent = inner.map((item, index) => {
      if(!item) {
        return <div className="skill-planet" style={{'width':0,'height':0}} key={index} onClick={()=>{this.handlePlanetsClick(item.id)}}><span>{item.name}</span></div>
      } else {
        return <div className="skill-planet" key={item.id} onClick={()=>{this.handlePlanetsClick(item.id)}}><span>{item.name}</span></div>
      }     
    })
    let outerContent = outer.map((item, index) => {
      if(!item) {
        return <div className="skill-planet" style={{'width':0,'height':0}} key={index} onClick={()=>{this.handlePlanetsClick(item.id)}}><span>{item.name}</span></div>
      } else {
        return <div className="skill-planet" key={item.id} onClick={()=>{this.handlePlanetsClick(item.id)}}><span>{item.name}</span></div>
      }  
    })
    return (
      <div className="">
        <div className="night-background">
          <div id='container1'></div>
          <div id='container2'></div>
          <div id='container3'></div>
          <div id='container4'></div>
        </div>
        <div className="skills-circle-wrap">
            <div className={classNames("skills-circle", {scaleEffect: this.state.isScale})}>
                <div className="skill-orbit">
                  { outerContent }
                </div>
                <div className="skill-orbit">
                  { innerContent }
                </div>
                <div className="skill-orbit"></div>
              
            </div>
            <div className="skills-top-circle panel">更多</div>
        </div>
        <Link to="/" className="modify-btn">修改</Link>
      </div>
    )
  }
}
Themes.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default Themes
