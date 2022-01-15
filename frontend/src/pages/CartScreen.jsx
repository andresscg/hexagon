import React, {useState} from "react"
import {
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap"
import {AiFillDelete} from "react-icons/ai"
import Calificacion from "../components/Calificacion"
import Paypal from "../components/Paypal"
import {useCart} from "react-use-cart"
import {useNavigate} from "react-router-dom"

export default function CartScreen(props) {
  const {
    emptyCart,
    removeItem,
    items,
    totalItems,
    updateItemQuantity,
    cartTotal,
  } = useCart()

  let navigate = useNavigate()
  totalItems === 0 && navigate("/shop", {replace: true})

  console.log(items)

  const [paypal, setPaypal] = useState(false)
  let fecha = new Date()

  const validar = () => {
    setPaypal(true)
  }

  return (
    <div className="home">
      <h2>Cart Items</h2>
      <div className="productContainer" style={{zIndex: -100}}>
        <ListGroup>
          {items.map((prop) => (
            <ListGroupItem key={prop.id}>
              <Row>
                <Col md={2}>
                  <Image src={prop.image} alt={prop.product} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prop.product}</span>
                </Col>
                <Col md={2}>
                  <span>{prop.price}</span>
                </Col>
                <Col md={2}>
                  <Calificacion value={prop.rating} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prop.quantity}
                    onChange={(e) => {
                      updateItemQuantity(prop.id, Number(e.target.value))
                    }}
                  >
                    {[...Array(prop.stock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    onClick={() => {
                      removeItem(prop.id)
                    }}
                    variant="light"
                    className="btn-block"
                    type="button"
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({totalItems}) items</span>
        <span style={{fontWeight: 700, fontSIze: 20}}>
          {" "}
          Total: &#36;{cartTotal}
        </span>

        <Button
          className="my-4"
          type="button"
          onClick={emptyCart}
          disabled={totalItems === 0}
        >
          Borrar carrito
        </Button>
      </div>
      <div className="filters summary container d-flex flex-column">
        <h3>¿Como pagáras?</h3>
        <span className="title">Subtotal ({totalItems}) items</span>
        <span style={{fontWeight: 700, fontSIze: 20}}> Total:{cartTotal}</span>
        <div className="d-flex flex-row gap-5">
          <label htmlFor="debito">Debito</label>
          <input type="radio" id="debito" name="formapago" onClick />
          <label htmlFor="tarjeta">Tarjeta</label>
          <input type="radio" id="tarjeta" name="formapago" />
          <label htmlFor="paypal">Paypal</label>
          <input type="radio" id="paypal" name="formapago" />
        </div>
        <Button
          className="my-4"
          type="button"
          onClick={validar}
          disabled={totalItems === 0}
        >
          Proceed to Checkout
        </Button>

        {paypal && (
          <Paypal
            description={`Compra del dia ${fecha.toLocaleDateString()}en Hexagon`}
            total={cartTotal}
          />
        )}
      </div>
    </div>
  )
}
