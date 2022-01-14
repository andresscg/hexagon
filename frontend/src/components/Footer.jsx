import React from 'react'
import {FaFacebook, FaInstagram, FaWhatsapp, FaGoogle} from 'react-icons/fa'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="social__icons">
            <FaFacebook className="social__icon" />
            <FaInstagram className="social__icon" />
          </div>
        <div className="brand-container">
          <img src="../../assets/logo.png" alt="Logo" className="footer__logo" />
          
          <div className="footer__contact">
            <p className="contact__info">
              Av. Cabildo 2199, Belgrano, CABA.
            </p>
            <p className="footer-copy">
              Hexagon TechStore | 2022, All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="social__icons">
            <FaWhatsapp className="social__icon" />
            <FaGoogle className="social__icon" />
          </div>
    </div>
  )
}

export default Footer
