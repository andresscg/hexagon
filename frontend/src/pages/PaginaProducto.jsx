import React, {useEffect, useState} from "react"
import {useParams} from "react-router"
import { Link } from "react-router-dom"
import {ListGroup, Card, Button, Form} from "react-bootstrap"
import Calificacion from "../components/Calificacion"
import {connect} from "react-redux"
import productoAction from "../redux/actions/productoAction"
import {useCart} from "react-use-cart"
import "../styles/paginaProducto.css"
import Carrousel from "../components/Carrousel"

const PaginaProducto = (props) => {
 
  let {id} = useParams()
  const [qty, setQty] = useState(1)
 

  const {addItem, items, removeItem} = useCart()

  const producto = {
    id: props.producto._id,
    price: props.producto.precio,
    image: props.producto.imagen,
    product: props.producto.nombre,
    stock: props.producto.contadorStock,
    rating: props.producto.calificacion,
    reviews: props.producto.numReseñas,
  }

  useEffect(() => {
    props.fetchUnProducto(id)
    props.fetchProductos()
  },[])

  return (
    <div className="producto-pagina__container">
     
      <div className="producto-informacion__container">
        <div className="producto-imagen__container">
          <img src={producto.image} alt={producto.product} />
        </div>
        <div className="producto-informacion">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{producto.product}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Calificacion
                value={producto.rating}
                text={`${producto.reviews} reseñas`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: {producto.price}</ListGroup.Item>
            <ListGroup.Item>
              Descripcion: {props.producto.descripcion}
            </ListGroup.Item>
          </ListGroup>
          <div className="pricing-container">
            <Card className="pricing">
              <ListGroup variant="flush">
                <div className="fila">
                  <p>Price:</p>
                  <p>
                    <strong>$ {producto.price}</strong>
                  </p>
                </div>
                <div className="fila">
                  <p>Estado:</p>
                  <p>{producto.stock > 0 ? "In Stock" : "out of stock"}</p>
                </div>

                {props.producto.contadorStock > 0 && (
                  <div className="fila">
                    <p>Cantidad</p>
                    <div>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(producto.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                  </div>
                )}

                <div className="addcart-btn__container">
                  {items.some((p) => p.id === producto.id) ? (
                    <Button
                      onClick={() => removeItem(producto.id)}
                      variant="danger"
                      className="btn-block"
                      type="button"
                    >
                      Remove from Cart
                    </Button>
                  ) : (
                    <Button
                      onClick={() => addItem(producto, qty)}
                      className="btn-block"
                      type="button"
                      disabled={!props.producto.contadorStock}
                    >
                      {!props.producto.contadorStock
                        ? "Out of Stock"
                        : "Add to Cart"}
                    </Button>
                  )}
                </div>
              </ListGroup>
            </Card>
          </div>
      <Carrousel />
        </div>
      </div>
      <Button >
          <Link to="/filters" className="text-light">
            Back to Products
          </Link>
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    producto: state.productoReducer.producto,
  }
}
const mapDispatchToProps = {
  fetchUnProducto: productoAction.fetchUnProducto,
  fetchProductos: productoAction.fetchearProductos,
}
export default connect(mapStateToProps, mapDispatchToProps)(PaginaProducto)
