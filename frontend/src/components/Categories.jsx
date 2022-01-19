import React from "react"
import "../styles/Categories.css"

const Categories = () => {
  return (
    <>
      <div className="categories-deco"></div>
      <div className="categories-container">
        <h3 className="categories__title">Our Products</h3>
        <div className="categories__cards">
          <div className="categories__cards--title primary">
            <p className="cards__name">-01: Phones</p>
          </div>
          <div
            className="categories__cards--img bg-blue"
            style={{
              backgroundImage:
                "linear-gradient(rgba(68, 52, 148, 0.7),rgba(68, 52, 148, 0.5)),url(/assets/bg-blue.webp)",
            }}
          ></div>
          <div className="categories__cards--title secondary">
            <p className="cards__name">-02: Headphones</p>
          </div>
          <div
            className="categories__cards--img bg-pink"
            style={{
              backgroundImage:
                "linear-gradient(rgba(239, 47, 85, 0.7),rgba(239, 47, 85, 0.5)),url(/assets/bg-pink.webp)",
            }}
          ></div>
          <div
            className="categories__cards--img bg-purple"
            style={{
              backgroundImage:
                "linear-gradient(rgba(141, 35, 126, 0.7),rgba(141, 35, 126, 0.5)),url(/assets/bg-orang.webp)",
            }}
          ></div>
          <div className="categories__cards--title third">
            <p className="cards__name">-03: Cases</p>
          </div>
          <div
            className="categories__cards--img bg-orange"
            style={{
              backgroundImage:
                "linear-gradient(rgba(251, 151, 40, 0.7),rgba(251, 151, 40, 0.5)),url(/assets/bg-purple.webp)",
            }}
          ></div>
          <div className="categories__cards--title blue">
            <p className="cards__name">-04: Accessories</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Categories
