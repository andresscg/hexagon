import React, {useState} from "react"
import Calificacion from "./Calificacion"
import {Link} from "react-router-dom"
import productoAction from "../redux/actions/productoAction"
import {connect} from "react-redux"
import {useCart} from "react-use-cart"
import Swal from "sweetalert2"
import "../styles/Producto.css"
import {Button} from "react-bootstrap"
import {Checkbox} from "@mui/material"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"
import Favorite from "@mui/icons-material/Favorite"

const Producto = (props) => {
  const [likeIcon, setLikeIcon] = useState(true)
  const [likeProducts, setlikeProduct] = useState(props.producto.likes)

  const label = {
    inputProps: {"aria-label": `${likeIcon ? "Like!" : "Dislike :c"}`},
  }
  const {addItem, removeItem, items} = useCart()
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer)
      toast.addEventListener("mouseleave", Swal.resumeTimer)
    },
  })

  const producto = {
    id: props.producto._id,
    price: props.producto.precio,
    image: props.producto.imagen,
    product: props.producto.nombre,
    stock: props.producto.contadorStock,
    rating: props.producto.calificacion,
  }

  const likeDislikeProduct = async () => {
    setLikeIcon(false)
    if (!props.isAuth) {
      Toast.fire({
        icon: "error",
        title: "You need to be logged in to like",
      })
    } else {
      let response = await props.likeDislike(props.producto._id, props.user._id)
      setlikeProduct(response)
    }
    setLikeIcon(true)
  }

  let likes = likeProducts.includes(props.user && props.user._id) ? (
    <Favorite style={{color: "red", fontSize: 35}} />
  ) : (
    <FavoriteBorder style={{color: "red", fontSize: 35}} />
  )
  // let likes = "❤️" && "🤍"

  return (
    <>
      <div className="card-container">
        <div
          className="like-container"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <div
            className="boton-like"
            onClick={likeIcon ? likeDislikeProduct : null}
          >
            <p className="like">{likes}</p>
            <p>{likeProducts.length}</p>
          </div>
        </div>
        <div className={props.grid ? "info-container-grid" : "info-container"}>
          <div className={props.grid ? "img-container-grid" : "img-container"}>
            <Link to={`/shop/${props.producto._id}`}>
              <img src={props.producto.imagen} variant="top" />
            </Link>
          </div>
          <div
            className={props.grid ? "text-container-grid" : "text-container"}
          >
            <Link to={`/shop/${props.producto._id}`}>
              <p className="text-container__title">{props.producto.nombre}</p>
            </Link>
            <div
              className={
                props.grid
                  ? "price-card__container-grid"
                  : "price-card__container"
              }
            >
              <div className="price-container">
                <p>${props.producto.precio}</p>
              </div>
              <div
                className={
                  props.grid ? "addcart-container-grid " : "addcart-container "
                }
              >
                {items.some((p) => p.id === producto.id) ? (
                  <button
                    onClick={() => removeItem(producto.id)}
                    className="btn-card button6"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addItem(producto)}
                    className="btn-card  button6 button6add"
                    disabled={!props.producto.contadorStock}
                  >
                    {!props.producto.contadorStock
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                )}
                <button className="btn-card  button6 button6sim">
                  <Link to={`/shop/${props.producto._id}`}>See Details</Link>
                </button>
              </div>
            </div>
          </div>
          <div className={props.grid ? "fav-container-grid" : "fav-container"}>
            <div
              className={props.grid ? "row-container-grid" : "row-container"}
            >
              <div
                className={
                  props.grid
                    ? "addcart-container__noexiste-grid "
                    : "addcart-container__noexiste "
                }
              >
                {items.some((p) => p.id === producto.id) ? (
                  <button
                    onClick={() => removeItem(producto.id)}
                    className="btn-card button6"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addItem(producto)}
                    className="btn-card button6 button6add"
                    disabled={!props.producto.contadorStock}
                  >
                    {!props.producto.contadorStock
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                )}
                <button className="btn-card button6 button6sim">
                  <Link to={`/shop/${props.producto._id}`}>See Details</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.isAuth,
    user: state.authReducer.user,
  }
}

const mapDispatchToProps = {
  likeDislike: productoAction.likeDislike,
}

export default connect(mapStateToProps, mapDispatchToProps)(Producto)
