import React, {useEffect} from "react"
import Producto from "../components/Producto"
import {connect} from "react-redux"

import productoAction from "../redux/actions/productoAction"
import '../styles/Producto.css'

const Productos = (props) => {
  useEffect(() => {
    props.listaProductos()
  }, [])

  return (
    <>
      <div className="container-all__productos">
        <h1>Our Products</h1>
        <div className="container-all__filtros">
          {/* <div className="container-filtros">
            {
              <FormControl
                onChange={(e) =>
                  props.filtro(e.target.value.toLowerCase().trim())
                }
                placeholder="FIND YOUR PRODUCT"
                aria-describedby="inputGroup-sizing-sm"
              />
            }
          </div> */}
          <div className="productos-container">
            {props.auxiliar.length > 0 ? (
              props.auxiliar.map((producto) => (
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
    auxiliar: state.productoReducer.auxiliar,
    cart: state.cartReducer.cart,
  }
}

const mapDispatchToProps = {
  listaProductos: productoAction.fetchearProductos,
  filtro: productoAction.filtro,
}

export default connect(mapStateToProps, mapDispatchToProps)(Productos)
