import {max} from "moment"
import React, {useEffect} from "react"
import {connect} from "react-redux"
import Producto from "../components/Producto"
import productoAction from "../redux/actions/productoAction"

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

  return (
    <>
      <div className="container-all__productos">
        <div className="container-all__filtros">
          <div
            className={
              props.grid ? "productos-container grid" : "productos-container"
            }
          >
            {props.auxiliar.length > 0 ? (
              props.auxiliar.map((producto) => (
                <div key={producto._id} className="prod-container">
                  <Producto producto={producto} />
                </div>
              ))
            ) : (
              <div className="noexiste-container">
                Sorry, the product you are looking for does not exist. 😪
              </div>
            )}
          </div>
        </div>
      </div>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Productos)
