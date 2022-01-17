import React, {useEffect} from "react"
import productoAction from "../../redux/actions/productoAction"
import {connect} from "react-redux"
import "../../styles/Filters.css"
import "../../styles/ShopContainer.css"
import SideBarDrawer from "./SideBarDrawer"
import Productos from "../../pages/Productos"
import {FormControl} from "react-bootstrap"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import SideBarFilter from "./SideBarFilter"

function Filters(props) {
  const {height, width} = useWindowDimensions()
  console.log(width)
  useEffect(() => {
    props.fetchearProductos()
  }, [])

  return (
    <div className="shop__main">
      <FormControl
        onChange={(e) => props.filtro(e.target.value.toLowerCase().trim())}
        placeholder="FIND YOUR PRODUCT"
        aria-describedby="inputGroup-sizing-sm"
      />
      <div className="shop__container" style={{height: "100vh"}}>
        <div className="shop__side-bar">
          {width >= 1500 ? (
            <SideBarFilter productos={props.productos} />
          ) : (
            <SideBarDrawer productos={props.productos} filtro={props.filtro} />
          )}
        </div>
        <div className="shop__content">
          <Productos />
        </div>
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
