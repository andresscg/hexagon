import React, {useEffect} from "react"
import {connect} from "react-redux"
import Producto from "../components/Producto"
import productoAction from "../redux/actions/productoAction"

import "../styles/Producto.css"

const Productos = (props) => {
  useEffect(() => {
    props.listaProductos()
  }, [])

  return (
    <>
      <div className="container-all__productos">
        <div className="container-all__filtros">
          <div className="productos-container">
            {props.searched.length > 0 ? (
              props.searched.map((producto) => (
                <div key={producto._id} className="prod-container">
                  <Producto producto={producto} />
                </div>
              ))
            ) : (
              <div className="noexiste-container">
                Lo sentimos, el producto que estás buscando no existe. 😪
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
    searched: state.productoReducer.searched,
  }
}

const mapDispatchToProps = {
  listaProductos: productoAction.fetchearProductos,
  filtro: productoAction.filtro,
}

export default connect(mapStateToProps, mapDispatchToProps)(Productos)
