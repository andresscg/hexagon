import React, {useEffect} from "react"
import Producto from "../components/Producto"
import {Row, Col, Container, InputGroup, FormControl} from "react-bootstrap"
import {connect} from "react-redux"
import productoAction from "../redux/actions/productoAction"

const Productos = (props) => {
  useEffect(() => {
    props.listaProductos()
  }, [])

  return (
    <>
      <Container>
        <h1>Ultimos Productos</h1>
        <InputGroup size="sm">
          <FormControl
            onChange={(e) => props.filtro(e.target.value.toLowerCase().trim())}
            placeholder="FIND YOUR PRODUCT"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <Row>
          {props.auxiliar.map((producto) => (
            <Col key={producto._id} sm={12} md={6} lg={4} xl={3}>
              <Producto producto={producto} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auxiliar: state.productoReducer.auxiliar,
    cart: state.cartReducer.cart,
  }
}

const mapDispatchToProps = {
  listaProductos: productoAction.fetchearProductos,
  filtro: productoAction.filtro,
}

export default connect(mapStateToProps, mapDispatchToProps)(Productos)
