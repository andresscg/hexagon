import React, {useState} from "react"
import Register from "./Register"
import Login from "./Login"
import {Button, Modal} from "react-bootstrap"
import modalAction from "../../redux/actions/modalAction"
import {connect} from "react-redux"
import Loader from "react-spinners/HashLoader"
import "../../styles/SignForm.css"

function LoginModal(props) {
  return (
    <div>
      <Modal
        show={props.showModal}
        fullscreen={"sm-down"}
        onHide={props.showCloseModal}
      >
        <div className={props.isLoading ? "loader--true" : "loader--false"}>
          <Loader size={200} color={"D0021B"} className="loader" />
        </div>
        <Modal.Header closeButton>
          <h1 className="modal-title">Welcome to Hexagon</h1>
        </Modal.Header>
        {props.registerLogin ? <Login /> : <Register />}

        {/*  <button className="btn btns-primary"onClick={props.HandleLoginRegisterModal}>
          {props.registerLogin ? "Go To Registration" : "Go To Login"}
        </button> */}
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
  showModal: state.modalReducer.showModal,
  registerLogin: state.modalReducer.registerLogin,
})

const mapDispatchToProps = {
  showCloseModal: modalAction.showCloseModal,
  HandleLoginRegisterModal: modalAction.HandleLoginRegisterModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
