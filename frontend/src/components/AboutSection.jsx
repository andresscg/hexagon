import React from "react"
import "../styles/AboutSection.css"

const AboutSection = () => {
  return (
    <div className="about-section">
      <div className="about-deco"></div>
      <div className="about-container">
        <div className="about__info">
          <h3 className="info__title">About Us</h3>
          <p className="info__text">
          Hexagon is a young company dedicated to the sale of cell phones and accessories. Started as an online store, Hexagon quickly became a benchmark for specialized cell phones inside and outside Atlanta, thanks not only to its competitive prices but also through careful attention, its extensive knowledge about the latest market launches and a daily effort that generates community through Facebook, Instagram, Twitter, Twitch and Youtube.
          </p>
        </div>
        <div className="about__features">
          <h3 className="features__title">Features</h3>
          <div className="features__cards">
            <div className="feature">
              <div className="feature__name">24/7 Support</div>
              <img
                src="/assets/support.svg"
                alt="Support"
                className="feature__img"
              />
            </div>
            <div className="feature">
              <div className="feature__name">Great Shipping Times</div>
              <img
                src="/assets/shipping.svg"
                alt="Shipping"
                className="feature__img"
              />
            </div>
            <div className="feature feat--center">
              <div className="feature__name">Best Prices</div>
              <img
                src="/assets/prices.svg"
                alt="Prices"
                className="feature__img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
