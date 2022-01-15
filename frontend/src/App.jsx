import "./App.css"
import Router from "./routes/router"
import "./App.css"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import LoginModal from "./components/Login/LoginModal"
import cartAction from "./redux/actions/cartAction"
import {connect} from "react-redux"
import {useEffect} from "react"

import {CartProvider} from "react-use-cart"

function App(props) {
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(props.cart))
  }, [props.cart])
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
    cart: state.cartReducer.cart,
  }
}

const mapDispatchToProps = {
  refreshCart: cartAction.refreshCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
