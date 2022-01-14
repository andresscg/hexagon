import {Dropdown} from "react-bootstrap"
import React from "react"
import {connect} from "react-redux"

const LikedProducts = (props) => {
  return (
    <>
      <Dropdown.Item>{props.producto.nombre} </Dropdown.Item>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  }
}

export default connect(mapStateToProps)(LikedProducts)
