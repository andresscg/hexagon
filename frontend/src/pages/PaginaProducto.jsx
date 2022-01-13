import React, {useEffect, useContext} from "react"
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

const PaginaProducto = (props) => {
  let {id} = useParams()

  useEffect(() => {
    props.fetchUnProducto(id)
  }, [])

  return (
    <>
      <p className="btn btn-dark" onClick={() => window.history.back()}>
        Regresar
      </p>
      <Row>
        <Col md={6}>
          <Image
            src={props.producto.imagen}
            alt={props.producto.nombre}
            fluid
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{props.producto.nombre}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Calificacion
                value={props.producto.calificacion}
                text={`${props.producto.numReseñas} reseñas`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: {props.producto.precio}</ListGroup.Item>
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
                    <strong>$ {props.producto.precio}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Estado:</Col>
                  <Col>
                    {props.producto.contadorStock > 0
                      ? "In Stock"
                      : "out of stock"}
                  </Col>
                </Row>
              </ListGroupItem>

              {props.producto.contadorStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Cantidad</Col>
                    <Col>
                      {/* <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(props.producto.contadorStock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Control> */}
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroupItem>
                {props.cart.some((p) => p._id === props.producto._id) ? (
                  <Button
                    /* onClick={() => } */
                    variant="danger"
                    className="btn-block"
                    type="button"
                  >
                    Remove from Cart
                  </Button>
                ) : (
                  <Button
                    /* onClick={() => {
                      
                    }} */
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
    </>
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
