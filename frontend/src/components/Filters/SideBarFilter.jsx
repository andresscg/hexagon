import React from "react"
import PhonesFilter from "./PhonesFilter"
import SliderPriceFilter from "./SliderPriceFilter"

export default function SideBarFilter(props) {
  const categories = [
    ...new Set(props.productos.map((producto) => producto.categoria)),
  ]

  const brands = [...new Set(props.productos.map((producto) => producto.marca))]

  return (
    <>
      <PhonesFilter data={brands} name={"Brands"} /> {/* Marca */}
      <PhonesFilter data={categories} name={"Categories"} /> {/* Categorias */}
      {props.productos.length > 0 && (
        <SliderPriceFilter productos={props.productos} />
      )}
    </>
  )
}
