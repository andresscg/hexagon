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
  const {width} = useWindowDimensions()
  useEffect(() => {
    !props.auxiliar[1] && props.listaProductos()
    props.search("")
  }, [])

  return (
    <div className="shop__main">
      <FormControl
        onChange={(e) => props.search(e.target.value.toLowerCase().trim())}
        placeholder="FIND YOUR PRODUCT"
        aria-describedby="inputGroup-sizing-sm"
      />
      <div className="shop__container" style={{height: "100vh"}}>
        <div className="shop__side-bar">
          {width >= 1300 ? (
            <SideBarFilter
              productos={props.productos}
              sort={props.sortProductos}
            />
          ) : (
            <SideBarDrawer
              productos={props.productos}
              sort={props.sortProductos}
            />
          )}
        </div>
        <div className="shop__content">
          <Productos products={props.sorted} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
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
