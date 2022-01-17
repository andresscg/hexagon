import React, {useEffect} from "react"
import productoAction from "../../redux/actions/productoAction"
import {connect} from "react-redux"
import "../../styles/Filters.css"
import "../../styles/ShopContainer.css"
import SideBarDrawer from "./SideBarDrawer"
import Productos from "../../pages/Productos"

function Filters(props) {
  useEffect(() => {
    props.fetchearProductos()
  }, [])

  return (
    <div className="shop__container" style={{height: "100vh"}}>
      <div className="shop__side-bar">
        <SideBarDrawer productos={props.productos} filtro={props.filtro} />
      </div>
      <div className="shop__content">
        <Productos />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    productos: state.productoReducer.productos,
  }
}

const mapDispatchToProps = {
  fetchearProductos: productoAction.fetchearProductos,
  filtro: productoAction.filtro,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
