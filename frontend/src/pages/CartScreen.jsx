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
import "../styles/CartScreen.css"

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
    <div className="home" style={{backgroundImage: "url(/assets/bg2.webp)"}}>
      <h2 className="text-light">Cart Items</h2>
      <div
        className="productContainer mx-auto container bg-light text-dark"
        style={{zIndex: -100}}
      >
        <ListGroup className="cart-items__container">
          {items.map((prop) => (
            <ListGroupItem key={prop.id}>
              <Row className="justify-content-center">
                <Col md={2}>
                  <Image
                    src={prop.image}
                    alt={prop.product}
                    fluid
                    rounded
                    className="product-img"
                  />
                </Col>
                <Col md={2}>
                  <span>{prop.product}</span>
                </Col>
                <Col md={2}>
                  <span>$ {prop.itemTotal}</span>
                </Col>
                <Col md={1} className="p-auto">
                  <Form.Control
                    className="w-100"
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
                  <button
                    onClick={() => {
                      removeItem(prop.id)
                    }}
                    className="trash-btn"
                  >
                    <AiFillDelete fontSize="20px" />
                  </button>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary costumize container d-flex flex-column bg-light text-dark">
        <span className="title">Subtotal ({totalItems}) items</span>
        <span style={{fontWeight: 700, fontSIze: 20}}>
          {" "}
          Total: &#36; {cartTotal}
        </span>

        <Button
          className="m-auto my-2"
          type="button"
          onClick={emptyCart}
          disabled={totalItems === 0}
        >
          Clear Cart
        </Button>
      </div>
      <Row className="filters summary d-flex flex-column container mx-auto costumize bg-light text-dark py-3 align-items-center">
        <h3 className="text-dark">How would you like to pay?</h3>
        <div className="d-flex flex-column my-2">
          <span className="title">Subtotal ({totalItems}) items</span>
          <span className="text-uppercase fs-4 fw-bold">
            {" "}
            Total: ${cartTotal}
          </span>
        </div>
        <div className="d-flex justify-content-center flex-wrap gap-1 wrapping">
          <div class="form-check d-flex justify-content-center px-1 mx-1">
            <input
              type="radio"
              id="debito"
              name="formapago"
              class="form-check-input mx-1"
              onClick
            />
            <label htmlFor="debito" disabled>
              Debit
            </label>
          </div>
          <div class="form-check d-flex justify-content-center px-1  mx-1">
            <input
              type="radio"
              id="tarjeta"
              name="formapago"
              class="form-check-input mx-1"
            />
            <label htmlFor="tarjeta" disabled>
              Credit Card
            </label>
          </div>
          <div class="form-check d-flex justify-content-center px-1  mx-1">
            <input
              type="radio"
              id="paypal"
              name="formapago"
              class="form-check-input mx-1"
            />
            <label htmlFor="paypal">Paypal</label>
          </div>
        </div>
        <div>
          <Button
            className="my-2"
            type="button"
            onClick={validar}
            disabled={totalItems === 0}
          >
            Proceed to Checkout
          </Button>
        </div>

        {paypal && (
          <Paypal
            description={`Compra del dia ${fecha.toLocaleDateString()}en Hexagon`}
            total={cartTotal}
          />
        )}
      </Row>
    </div>
  )
}
