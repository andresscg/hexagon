import React from "react"
import {FaFacebook, FaInstagram, FaWhatsapp, FaGoogle} from "react-icons/fa"
import "../styles/Footer.css"

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="social__icons">
        <FaFacebook className="social__icon" />
        <FaInstagram className="social__icon" />
      </div>
      <div className="brand-container">
        <div className="nav__logo--text" style={{margin: 0}}>
          <p className="nav__title">HEXAGON</p>
          <p className="nav__subtitle">TECHSTORE</p>
        </div>
        <img
          src="../../assets/logo_notext.svg"
          alt="logo"
          width={100}
          className="nav__logo"
          style={{marginBottom: 10}}
        />

        <div className="footer__contact">
          <p className="contact__info">
            1230 Peachtree Street, NE. Suite 1900. Atlanta, GA
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
