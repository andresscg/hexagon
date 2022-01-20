import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Hero.css'

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="heroInfo">
        <h1 className="heroInfo__heading">
          Find a new device or make yours special! 
        </h1>
        <p className="heroInfo__subtitle">
          Thanks to Hexagon, you can find yourself a brand new phone or give to your current one new looks and accessories.
        </p>
        <button className="custom-btn btn-3">
          <span>
            <Link to="/shop" className="nav__menu--item text-light">
              Go Shopping!
            </Link>
          </span>
        </button>
      </div>
      <img src="/assets/hero-img.svg" alt="Phone Image" className='heroImg'/>
    </div>
  )
}

export default Hero
