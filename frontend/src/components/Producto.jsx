import React, {useState} from "react"
import {Button} from "react-bootstrap"
import Calificacion from "./Calificacion"
import {Link} from "react-router-dom"
import productoAction from "../redux/actions/productoAction"
import cartAction from "../redux/actions/cartAction"
import {connect} from "react-redux"

const Producto = (props) => {
  const [likeIcon, setLikeIcon] = useState(true)
  const [likeProducts, setlikeProduct] = useState(props.producto.likes)

  const likeDislikeProduct = async () => {
    setLikeIcon(false)
    /* if (!token) {
      alert("Loagueate para meter el like")
    } else {
      let response = await props.likeDislike(
        token,
        props.producto._id,
        props.user._id
      )
      setlikeProduct(response)
    }
    setLikeIcon(true) */
  }

  let likes = likeProducts.includes(props.user && props.user._id) ? "❤" : "🤍"

  return (
    <>
      <div className="card-container">
        <div className="card-container_menor">
          <div className="info-container">
            <div className="img-container">
              <Link to={`/producto/${props.producto._id}`}>
                <img src={props.producto.imagen} variant="top" />
              </Link>
            </div>
            <div className="text-container">
              <Link to={`/producto/${props.producto._id}`}>
                {props.producto.nombre}
              </Link>
              <div>
                <div className="price-container">
                  <p>${props.producto.precio}</p>
                </div>
                <Calificacion
                  value={props.producto.calificacion}
                  text={`${props.producto.numReseñas} reseñas`}
                />
              </div>
            </div>
            <div className="fav-container">
              <div className="like-container">
                <button
                  className="boton-like"
                  onClick={likeIcon ? likeDislikeProduct : null}
                >
                  <p className="like">{likes}</p>
                </button>
                <p>{likeProducts.length}</p>
              </div>
              <div className="price-container">
                <p>${props.producto.precio}</p>
              </div>
            </div>
          </div>
          <div className="text-container">
            <Link to={`/producto/${props.producto._id}`}>
              <h3>{props.producto.nombre}</h3>
            </Link>
            <div>
              <Calificacion
                value={props.producto.calificacion}
                text={`${props.producto.numReseñas} reseñas`}
              />
            </div>
          </div>
        </div>
        {props.cart.some((p) => p.item._id === props.producto._id) ? (
          <Button
            onClick={() => props.removeFromCart(props.producto)}
            variant="danger"
            className="btn-block"
            type="button"
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            onClick={() => props.addToCart(props.producto, props.user._id)}
            className="btn-block"
            type="button"
            disabled={!props.producto.contadorStock}
          >
            {!props.producto.contadorStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        )}
      </div>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    cart: state.cartReducer.cart,
  }
}

const mapDispatchToProps = {
  likeDislike: productoAction.likeDislike,
  addToCart: cartAction.addToCart,
  removeFromCart: cartAction.removeFromCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Producto)
