import "./App.css"
import Router from "./routes/router"
import "./App.css"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import LoginModal from "./components/Login/LoginModal"
import authAction from "./redux/actions/authAction"
import {connect} from "react-redux"
import React from "react"
import {CartProvider} from "react-use-cart"

function App(props) {
  React.useEffect(() => {
    if (!props.isAuth) {
      props.tokenVerify()
    }
  }, [props.isLoading, props.isAuth])

  return (
    <>
      <CartProvider>
        <ToastContainer />
        <LoginModal />
        <Router />
      </CartProvider>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.authReducer.isLoading,
    isAuth: state.authReducer.isAuth,
  }
}

const mapDispatchToProps = {
  tokenVerify: authAction.tokenVerify,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
