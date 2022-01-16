import React, {useEffect} from "react"
import {useParams} from "react-router"
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap"
import Calificacion from "../components/Calificacion"
import {connect} from "react-redux"
import productoAction from "../redux/actions/productoAction"
import '../styles/paginaProducto.css'

const PaginaProducto = (props) => {
  let {id} = useParams()

  useEffect(() => {
    props.fetchUnProducto(id)
  })

  return (
    <div className="producto-pagina__container">
      <div className="producto-informacion__container">
        <div className="producto-imagen__container">
          <img
            src={props.producto.imagen}
            alt={props.producto.nombre}
          />
        </div>
        <div className="producto-informacion">
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
              <ListGroup.Item>Price: ${props.producto.precio}</ListGroup.Item>
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
                        <strong>$ {props.producto.precio}</strong>
                      </p>
                    </div>
                    <div className="fila">
                      <p>Estado:</p>
                      <p>
                        {props.producto.contadorStock > 0
                          ? "In Stock"
                          : "out of stock"}
                      </p>
                    </div>

                  {props.producto.contadorStock > 0 && (
                      <div className="fila">
                        <p>
                          Cantidad
                        </p>
                        <div>
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
                        </div>
                      </div> 
                  )}
                  <div className="addcart-btn__container">
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
                  </div>
                </ListGroup>
              </Card>
            </div>
        </div>
      </div>
      <p className="btn btn-primary" onClick={() => window.history.back()}>
        Back
      </p>
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
