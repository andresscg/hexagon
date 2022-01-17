import React from "react"

export default function BrandFilter(props) {
  let brands = props.productos.map((producto) => producto.marca)
  let uniqueBrands = [...new Set(brands)]
  return (
    <div>
      <label htmlFor="brand">Brand</label>
      <select name="brand" id="brand">
        <option value="brand-all">All</option>
        {uniqueBrands.map((brand, index) => {
          return (
            <option key={index} value={`brand-${brand}`}>
              {brand}
            </option>
          )
        })}
      </select>
    </div>
  )
}
