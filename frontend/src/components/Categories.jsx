import React from 'react'
import '../styles/Categories.css'

const Categories = () => {
  return (
    <>
     <div className="categories-deco"></div>
     <div className="categories-container">
       <h3 className="categories__title">
         Our Products
       </h3>
       <div className="categories__cards">
         <div className="categories__cards--title primary">
           <p className="cards__name">
             -01: Phones
           </p>
         </div>
         <div className="categories__cards--img bg-blue"></div>
         <div className="categories__cards--title secondary">
           <p className="cards__name">
             -02: Headphones
           </p>
         </div>
         <div className="categories__cards--img bg-pink"></div>
         <div className="categories__cards--img bg-purple"></div>
         <div className="categories__cards--title third">
           <p className="cards__name">
             -03: Accesories
           </p>
         </div>
         <div className="categories__cards--img bg-orange"></div>
         <div className="categories__cards--title blue">
           <p className="cards__name">
             -04: Cases
           </p>
         </div>
       </div>
     </div> 
    </>
  )
}

export default Categories
