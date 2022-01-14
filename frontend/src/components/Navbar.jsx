import React, {useEffect, useContext} from "react"
import {Nav, Dropdown, Badge, Button} from "react-bootstrap"
import {FaShoppingCart} from "react-icons/fa"
import {AiFillDelete} from "react-icons/ai"
import "../styles/Navbar.css"
// import Logout from "./Login/Logout"
import {Link} from "react-router-dom"
import "../styles/Navbar.css"
import modalAction from "../redux/actions/modalAction"
import {connect} from "react-redux"
import authAction from "../redux/actions/authAction"
// import {DropdownButton} from "react-bootstrap"
// import LikedProducts from "./likedProducts"
// import EmailVerification from "./EmailVerification"
import cartAction from "../redux/actions/cartAction"

const Navbar = (props) => {
  useEffect(() => {
    if (!props.token) {
      props.tokenVerify()
    }
  }, [props.isLoading, props.token])
  return (
    <>
      <div className="nav-container">
        <img src="../../assets/logo.png" alt="logo" className="nav__logo" />
        <div className="nav__menu--navigation">
          <Link to="/" className="nav__menu--item">
            Home
          </Link>
          <Link to="/shop" className="nav__menu--item">
            Shop
          </Link>
          <Link to="/contact" className="nav__menu--item">
            Contact
          </Link>
        </div>
        <div className="nav__menu--sign">
          {!props.isLoading && props.isAuth ? (
            <>
              <button
                onClick={() => props.logout()}
                className="nav__menu__sign-btn"
              >
                Log Out
              </button>
              <div className="user__info">
                <div
                  style={{backgroundImage: `url(${props.user?.photo})`}}
                  className="nav__menu__photo"
                />
                <p className="user__name">{props.user?.firstName}</p>
              </div>
            </>
          ) : (
            <button
              onClick={() => props.showCloseModal()}
              className="nav__menu__sign-btn"
            >
              Login/Register
            </button>
          )}
          {!props.isLoading && props.isAuth && props.user?.admin && (
            <Link to={"/admin"}>Admin</Link>
          )}
        </div>
        {props.token && (
          <Nav>
            <Dropdown>
              <Dropdown.Toggle>
                <FaShoppingCart color="white" fontSize="25px" />
                <Badge>{props.cart.length}</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{minWidth: 370}}>
                {props.cart.length > 0 ? (
                  <>
                    {props.cart.map((prod) => (
                      <span className="cartitem" key={prod._id}>
                        <img
                          src={prod.imagen}
                          className="cartItemImg"
                          alt={prod.nombre}
                        />

                        <div className="cartItemDetail">
                          <span>{prod.nombre}</span>
                          <span>${prod.precio}</span>
                        </div>

                        <AiFillDelete
                          fontSize="20px"
                          style={{cursor: "pointer"}}
                          onClick={() => {
                            props.removeFromCart(prod)
                          }}
                        />
                      </span>
                    ))}
                    <Link to="/cart">
                      <Button style={{width: "95%", margin: "0 10px"}}>
                        Go To Cart
                      </Button>
                    </Link>
                  </>
                ) : (
                  <span style={{padding: 10}}>Cart is Empty</span>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        )}
      </div>
      {/* <div className="nav__menu--sign">
        {!props.isLoading && props.isAuth ? (
          <>
            <button onClick={() => props.logout()}>LOGOUT</button>
            <img src={props.user.photo} width={50} heigth={50} />
          </>
        ) : (
          <button onClick={() => props.showCloseModal()}>Login/Register</button>
        )}

        {!props.isLoading && props.isAuth && props.user?.admin && (
          <Link to={"/admin"}>Admin</Link>
        )}
        {!props.isLoading && props.isAuth && !props.user?.EmailVerification && (
          <EmailVerification />
        )}
      </div>
      <DropdownButton id="dropdown-basic-button" title="Favorites">
        {props.productos?.map((producto, index) => (
          <LikedProducts key={index} producto={producto} />
        ))}
      </DropdownButton>
      <Link className="btn btn-dark" to="/Productos">
        productos
      </Link> */}
    </>
  )
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.authReducer.user,
    isAuth: state.authReducer.isAuth,
    isLoading: state.authReducer.isLoading,
    token: state.authReducer.token,
    productos: state.productoReducer.productos,
    cart: state.cartReducer.cart,
  }
}

const mapDispatchToProps = {
  showCloseModal: modalAction.showCloseModal,
  tokenVerify: authAction.tokenVerify,
  logout: authAction.logout,
  removeFromCart: cartAction.removeFromCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
