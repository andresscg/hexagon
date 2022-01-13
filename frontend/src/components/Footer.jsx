import React from 'react'
import {FaFacebook, FaInstagram, FaWhatsapp, FaGoogle} from 'react-icons/fa'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer__social">
          <p className="social__title">
            Our Social Media
          </p>
          <div className="social__icons">
            <FaFacebook className="social__icon" />
            <FaInstagram className="social__icon" />
            <FaWhatsapp className="social__icon" />
            <FaGoogle className="social__icon" />
          </div>
        </div>
        <img src="../../assets/logo.png" alt="Logo" className="footer__logo" />
        <div className="footer__contact">
          <p className="contact__title">
            Contact
          </p>
          <p className="contact__info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, eaque quia quidem earum magni porro?
          </p>
        </div>
      </div>
      <p className="footer-copy">
        Hexagon TechStore | 2022, All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer
