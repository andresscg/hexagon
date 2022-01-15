import React, {useEffect, useState} from "react"
import {useParams} from "react-router"
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap"
import Calificacion from "../components/Calificacion"
import {connect} from "react-redux"
import productoAction from "../redux/actions/productoAction"
import {useCart} from "react-use-cart"

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
  })

  return (
    <div className="producto-container">
      <p className="btn btn-dark" onClick={() => window.history.back()}>
        Regresar
      </p>
      <Row>
        <Col md={6}>
          <Image src={producto.image} alt={producto.product} fluid />
        </Col>
        <Col md={3}>
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
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>$ {producto.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Estado:</Col>
                  <Col>{producto.stock > 0 ? "In Stock" : "out of stock"}</Col>
                </Row>
              </ListGroupItem>

              {props.producto.contadorStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Cantidad</Col>
                    <Col>
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
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroupItem>
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
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    producto: state.productoReducer.producto,
    cart: state.cartReducer.cart,
  }
}
const mapDispatchToProps = {
  fetchUnProducto: productoAction.fetchUnProducto,
}
export default connect(mapStateToProps, mapDispatchToProps)(PaginaProducto)
