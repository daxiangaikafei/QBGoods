import React, { Component } from 'react'
import * as ReactDOM from 'react-dom';
import classNames from 'classnames'
import { connect } from 'dva'
import { eventFun } from 'libs/util';
import { fetchPosts } from "components/common/fetch";
import "./themes.less"

class Themes extends Component {

  constructor(props) {
    super(props);
    
  }
  
  componentWillMount() {
    let planets = ['JS','CSS','Vue','NG','React','Redux','Dva']
    // let planets = ['JS','CSS','Vue','NG','React','Redux','Dva','LESS']
    this.handlePlanets(planets)
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
        starryNight.body.classList.add("show_website_nav");
      },

      setStars: function() {
        for (let i = 0; i < 40; i++) {
          starryNight.container1.innerHTML += "<i class='star'></i>";
          starryNight.container2.innerHTML += "<i class='star'></i>";
          starryNight.container3.innerHTML += "<i class='star'></i>";
          starryNight.containertest.innerHTML += "<i class='star'></i>";
        }
      }
    }
    starryNight.init()
  }
  componentDidUpdate() {
  }
  handlePlanets = (planets) => {
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
        let temp = this.props.inner[i-1]
        this.props.inner[i-1] = innerItem
        this.props.inner[i] = temp
      } else {
        this.props.inner[i] = innerItem
      }
      
      if (!outerItem) {
        let temp = this.props.outer[i-1]
        this.props.outer[i-1] = outerItem
        this.props.outer[i] = temp
      } else {
        this.props.outer[i] = outerItem
      }
    }
    // console.log('inner', props.inner)
    // console.log('outer', props.outer)
  }
  render() {
    let { inner, outer } = this.props
    let innerContent = inner.map((item, index) => {
      if(!item) {
        return <div className="skill-planet" style={{'width':0,'height':0}} key={index}><span>{item}</span></div>
      } else {
        return <div className="skill-planet" key={index}><span>{item}</span></div>
      }     
    })
    let outerContent = outer.map((item, index) => {
      if(!item) {
        return <div className="skill-planet" style={{'width':0,'height':0}} key={index}><span>{item}</span></div>
      } else {
        return <div className="skill-planet" key={index}><span>{item}</span></div>
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
            <div className="skills-circle">
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
      </div>
    )
  }
}
Themes.defaultProps = {
  inner: [],
  outer: []
}
export default Themes;
