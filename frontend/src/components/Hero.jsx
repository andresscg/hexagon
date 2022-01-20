import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Hero.css'

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="heroInfo">
        <div>
        <h1 className="heroInfo__heading">
          Find a new device or make yours special! 
        </h1>
        <p className="heroInfo__subtitle">
          Thanks to Hexagon, you can find yourself a brand new phone or give to your current one new looks and accessories.
        </p>
        </div>
        <button class='button button__2' data-text='Go Shopping!'>
          <span>E</span>
          <span>n</span>
          <span>j</span>
          <span>o</span>
          <span>y</span>
          <span></span>
          <span>I</span>
          <span>t</span>
          <span> </span>
          <span>😉</span>
        </button>
      </div>
      <img src="/assets/hero-img.svg" alt="Phone Image" className='heroImg'/>
    </div>
  )
}

export default Hero
