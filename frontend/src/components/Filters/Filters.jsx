import React, {useEffect} from "react"
import productoAction from "../../redux/actions/productoAction"
import {connect} from "react-redux"
import "../../styles/Filters.css"
import "../../styles/ShopContainer.css"
import TopBarFilter from "./TopBarFilter"
import SideBarFilter from "./SideBarFilter"
import Productos from "../../pages/Productos"

function Filters(props) {
  useEffect(() => {
    props.fetchearProductos()
  }, [])

  return (
    <div className="shop__container" style={{height: "100vh", display: "grid"}}>
      <div className="shop__side-bar">
        <SideBarFilter productos={props.productos} />
      </div>
      <div className="shop__top-bar">
        <TopBarFilter productos={props.productos} />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
