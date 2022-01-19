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
import {useCart} from "react-use-cart"
import {useNavigate} from "react-router-dom"
import "../styles/CartScreen.css"
import ShippingForm from "../components/ShippingForm"

export default function CartScreen(props) {
  const {
    emptyCart,
    removeItem,
    items,
    totalItems,
    updateItemQuantity,
    cartTotal,
    isEmpty,
  } = useCart()

  let navigate = useNavigate()
  isEmpty && navigate("/shop", {replace: true})

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

        <div>
          <ShippingForm cartTotal={cartTotal} />
        </div>
      </Row>
    </div>
  )
}
