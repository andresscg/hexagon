import React, {useEffect} from "react"
import {connect} from "react-redux"
import Producto from "../components/Producto"
import productoAction from "../redux/actions/productoAction"
import FlipMove from "react-flip-move"

import "../styles/Producto.css"

const Productos = (props) => {
  useEffect(() => {
    props.filters()
  }, [
    props.min,
    props.max,
    props.search,
    props.sort,
    props.categories,
    props.brands,
  ])
  useEffect(() => {
    window.scroll(0, 0)
    props.fetchearProductos()
  }, [])

  console.log(props)

  return (
    <>
      <FlipMove className={props.grid ? "grid" : "productos-container"}>
        {props.auxiliar.length > 0 ? (
          props.auxiliar.map((producto) => (
            <div
              key={producto._id}
              className={props.grid ? "prod-container-grid" : "prod-container"}
            >
              <Producto producto={producto} grid={props.grid} />
            </div>
          ))
        ) : (
          <div className="noexiste-container">
            Sorry, the product you are looking for does not exist. 😪
          </div>
        )}
      </FlipMove>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    min: state.productoReducer.min,
    max: state.productoReducer.max,

    search: state.productoReducer.search,
    sort: state.productoReducer.sort,
    categories: state.productoReducer.categories,
    brands: state.productoReducer.brands,
    auxiliar: state.productoReducer.filtered,
  }
}

const mapDispatchToProps = {
  listaProductos: productoAction.fetchearProductos,
  filters: productoAction.filters,
  fetchearProductos: productoAction.fetchearProductos,
}

export default connect(mapStateToProps, mapDispatchToProps)(Productos)
