import React, {useEffect, useState} from "react"
import productoAction from "../../redux/actions/productoAction"
import {connect} from "react-redux"
import "../../styles/Filters.css"
import Productos from "../../pages/Productos"
import SliderPriceFilter from "./SliderPriceFilter"
import PhonesFilter from "./PhonesFilter"
import {BiSearchAlt} from "react-icons/bi"
import {FormControl} from "react-bootstrap"
import SideBarFilter from "./SideBarFilter"

function Filters(props) {
  const categories = [
    ...new Set(props.productos.map((producto) => producto.categoria)),
  ]

  const brands = [...new Set(props.productos.map((producto) => producto.marca))]
  const [grid, setGrid] = useState(false)

  useEffect(() => {
    !props.auxiliar[1] && props.listaProductos()
    props.search("")
  }, [])

  return (
    <div className="shop__main">
      <h2 className="text-light">Find what you're looking for:</h2>
      <div className="buscador-container">
        <BiSearchAlt />
        <FormControl
          onChange={(e) => props.search(e.target.value.toLowerCase().trim())}
          placeholder="FIND YOUR PRODUCT"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      <div className="filter-contaniner__find">
        <div className="shop__container">
          <div className="selectores-container">
            <div className="selectores">
              <PhonesFilter data={brands} name={"Brands"} sx={{width: 10}} />
              <div className="selectores-price">
                <p>Price range:</p>
                {props.productos.length > 0 && (
                  <SliderPriceFilter productos={props.productos} />
                )}
              </div>
              <PhonesFilter data={categories} name={"Categories"} />
            </div>
            <div className="botones-filter layout-products">
              <SideBarFilter
                setGrid={setGrid}
                productos={props.productos}
                sort={props.sortProductos}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="shop__content">
        <Productos products={props.sorted} grid={grid} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    productos: state.productoReducer.productos,
    auxiliar: state.productoReducer.filtered,
  }
}

const mapDispatchToProps = {
  listaProductos: productoAction.fetchearProductos,
  search: productoAction.search,
  sortProductos: productoAction.sortProductos,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
