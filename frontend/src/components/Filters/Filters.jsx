import React, {useEffect, useState} from "react"
import productoAction from "../../redux/actions/productoAction"
import {connect} from "react-redux"
import "../../styles/Filters.css"
import Productos from "../../pages/Productos"
import {Button, FormControl} from "react-bootstrap"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import SideBarFilter from "./SideBarFilter"
import {BsFillGrid3X3GapFill} from "react-icons/bs"
import {FaList} from "react-icons/fa"

function Filters(props) {
  const [grid, setGrid] = useState(false)
  const {width} = useWindowDimensions()
  useEffect(() => {
    !props.auxiliar[1] && props.listaProductos()
    props.search("")
  }, [])

  return (
        <div className="shop__main">
          <p>Find what you're looking for:</p>
            <div className="filter-contaniner__find">
              <div className="shop__container">
                <FormControl
                  onChange={(e) => props.search(e.target.value.toLowerCase().trim())}
                  placeholder="FIND YOUR PRODUCT"
                  aria-describedby="inputGroup-sizing-sm"
                />
                <div className="shop__side-bar">
                    <SideBarFilter
                      productos={props.productos}
                      sort={props.sortProductos}
                    />
                </div>
                <div className="shop__top-bar--sort">
                  <Button onClick={() => setGrid(false)}>
                    <FaList onClick={() => setGrid(false)} />
                  </Button>
                  <Button onClick={() => setGrid(true)}>
                    <BsFillGrid3X3GapFill onClick={() => setGrid(true)} />
                  </Button>
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
