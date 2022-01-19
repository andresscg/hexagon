import React, {useState} from "react"
import Calificacion from "./Calificacion"
import {Link} from "react-router-dom"
import productoAction from "../redux/actions/productoAction"
import {connect} from "react-redux"
import {useCart} from "react-use-cart"
import Swal from "sweetalert2"
import "../styles/Producto.css"
import {Button} from "react-bootstrap"

const Producto = (props) => {
  const {addItem, removeItem, items} = useCart()
  console.log(props)
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

  const [likeIcon, setLikeIcon] = useState(true)
  const [likeProducts, setlikeProduct] = useState(props.producto.likes)

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

  let likes = likeProducts.includes(props.user && props.user._id) ? "❤" : "🤍";
  // let likes = "❤️" && "🤍"

  return (
    <>
      <div className="card-container">
        <div className={props.grid ? "info-container-grid" : "info-container"
            }>
          <div className={props.grid ? "img-container-grid" : "img-container"
            }>
            <Link to={`/shop/${props.producto._id}`}>
              <img src={props.producto.imagen} variant="top" />
            </Link>
            <div className={props.grid ? "row-container-grid" : "row-container"
            }>
              <button className="btn-card">
                <Link to={`/shop/${props.producto._id}`}>See Details</Link>
              </button>
            <div  className={props.grid ? "addcart-container__noexiste-grid" : "addcart-container__noexiste"
            }>
                {items.some((p) => p.id === producto.id) ? (
                  <button
                    onClick={() => removeItem(producto.id)}
                    className="btn-card"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addItem(producto)}
                    className="btn-card"
                    disabled={!props.producto.contadorStock}
                  >
                    {!props.producto.contadorStock
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div  className={props.grid ? "text-container-grid" : "text-container"
            }>
            <Link to={`/shop/${props.producto._id}`}>
              <p className="text-container__title">{props.producto.nombre}</p>
            </Link>
            <div className={props.grid ? "price-card__container-grid" : "price-card__container"
            }>
              <div className="price-container">
                <p>${props.producto.precio}</p>
              </div>
              <div className={props.grid ? "addcart-container-grid" : "addcart-container"
            }>
                {items.some((p) => p.id === producto.id) ? (
                  <button
                    onClick={() => removeItem(producto.id)}
                    className="btn-card"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addItem(producto)}
                    className="btn-card"
                    disabled={!props.producto.contadorStock}
                  >
                    {!props.producto.contadorStock
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={props.grid ? "fav-container-grid" : "fav-container"
            }>
            <div className="like-container" className={props.grid ? "like-container-grid" : "like-container"
            }>
              <p>{likeProducts.length}</p>
              <button
                className="boton-like"
                onClick={likeIcon ? likeDislikeProduct : null}
              >
                <p className="like">{likes}</p>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.isAuth,
    user: state.authReducer.user,
  }
}

const mapDispatchToProps = {
  likeDislike: productoAction.likeDislike,
}

export default connect(mapStateToProps, mapDispatchToProps)(Producto);
