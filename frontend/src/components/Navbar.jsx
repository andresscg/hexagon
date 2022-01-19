import React from "react"
import {Nav, Dropdown, Badge, Button} from "react-bootstrap"
import {FaShoppingCart} from "react-icons/fa"
import {AiFillDelete} from "react-icons/ai"
import "../styles/Navbar.css"
import {Link} from "react-router-dom"
import "../styles/Navbar.css"
import modalAction from "../redux/actions/modalAction"
import {connect} from "react-redux"
import authAction from "../redux/actions/authAction"
import {useCart} from "react-use-cart"

const Navbar = (props) => {
  const {removeItem, totalItems, items} = useCart()

  return (
    <>
      <div className="nav-container">
        <img src="../../assets/logo.png" alt="logo" className="nav__logo" />
        <div className="nav__menu--navigation">
          <button class="custom-btn btn-3">
            <span>
              <Link to="/" className="nav__menu--item">
                Home
              </Link>
            </span>
          </button>
          <button class="custom-btn btn-3">
            <span>
              <Link to="/" className="nav__menu--item">
                Shop
              </Link>
            </span>
          </button>
          <button class="custom-btn btn-3">
            <span>
              <Link to="/" className="nav__menu--item">
                Contact
              </Link>
            </span>
          </button>
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

        <Nav className="cart-fixed">
          <Dropdown>
            <Dropdown.Toggle className="shopping__cart">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge className="cart__number">{totalItems}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{minWidth: 370}} className="cart__dropdown">
              {totalItems ? (
                <>
                  {items.map((prod) => (
                    <span className="cartItem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.product}
                        width={100}
                      />

                      <div className="cartItemDetail" style={{gap: 10}}>
                        <span>{prod.product}</span>
                        <span>${prod.price}</span>
                        <span>
                          {prod.quantity}
                        </span>
                      </div>

                      <AiFillDelete
                        fontSize="20px"
                        style={{cursor: "pointer"}}
                        onClick={() => {
                          removeItem(prod.id)
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
      </div>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    isAuth: state.authReducer.isAuth,
    isLoading: state.authReducer.isLoading,
    token: state.authReducer.token,
    productos: state.productoReducer.productos,
  }
}

const mapDispatchToProps = {
  showCloseModal: modalAction.showCloseModal,
  tokenVerify: authAction.tokenVerify,
  logout: authAction.logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
