import React, {useState, useContext, useEffect} from "react"
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
import {connect} from "react-redux"
import Calificacion from "../components/Calificacion"
import cartAction from "../redux/actions/cartAction"
import Paypal from "../components/Paypal"


const CartScreen = (props) => {
  const [total, setTotal] = useState()
  const[paypal, setPaypal] = useState(false)
  let fecha = new Date()
  const validar = () =>{
    setPaypal(true)
  }
  useEffect(() => {
    setTotal(
      props.cart.reduce(
        (acc, curr) => acc + Number(curr.item.precio) * curr.qty,
        0
      )
    )
  }, [props.cart])

  return (
    <div className="home">
      <h2>Cart Items</h2>
      <div className="productContainer">
        <ListGroup key={props.cart._id}>
          {props.cart.map((prop) => (
            <ListGroupItem key={prop.item._id}>
              <Row>
                <Col md={2}>
                  <Image
                    src={prop.item.imagen}
                    alt={prop.item.nombre}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={2}>
                  <span>{prop.item.nombre}</span>
                </Col>
                <Col md={2}>
                  <span>${prop.item.precio}</span>
                </Col>
                <Col md={2}>
                  <Calificacion rating={prop.item.calificacion} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prop.qty}
                    onChange={(e) => {
                      props.changeCartQty(prop.item._id, e.target.value)
                    }}
                  >
                    {[...Array(prop.item.contadorStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    onClick={() => {
                      props.removeFromCart(prop)
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
      <div className="filters summary container d-flex flex-column">
        <h3>¿Como pagáras?</h3>
        <span className="title">Subtotal ({props.cart.length}) items</span>
        <span style={{fontWeight: 700, fontSIze: 20}}> Total:${total}</span>
        <div className="d-flex flex-row gap-5">
        <label htmlFor="debito">Debito</label>
        <input type="radio" id="debito" name="formapago" onClick/>
        <label htmlFor="tarjeta">Tarjeta</label>
        <input type="radio" id="tarjeta" name="formapago"/>
        <label htmlFor="paypal">Paypal</label>
        <input type="radio" id="paypal" name="formapago"/>
        </div> 
        <Button className="my-4" type="button" onClick={validar} disabled={props.cart.length === 0}>
          Proceed to Checkout
        </Button>    
        {paypal && <Paypal description={`Compra del dia ${fecha.toLocaleDateString()}en Hexagon`} total={total}/>}   
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
  }
}

const mapDispatchToProps = {
  removeFromCart: cartAction.removeFromCart,
  changeCartQty: cartAction.changeCartQty,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)
