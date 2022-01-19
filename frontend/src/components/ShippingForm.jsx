import axios from "axios"
import React, {useEffect, useRef, useState} from "react"
import {Button, Modal} from "react-bootstrap"
import {connect} from "react-redux"
import authAction from "../redux/actions/authAction"
import Paypal from "../components/Paypal"
import productoAction from "../redux/actions/productoAction"

function ShippingForm(props) {
  const country = useRef()
  const state = useRef()
  const city = useRef()
  const name = useRef()
  const address = useRef()
  const phone = useRef()

  const [countries, setCountries] = useState([])
  const [states, setStates] = useState(false)
  const [cities, setCities] = useState([])

  let date = new Date()

  useEffect(() => {
    props.checkAddress()
  }, [props.user, props.isAuth, props.isLoading])

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/states")
      .then((res) => setCountries(res.data.data))

    axios
      .post("https://countriesnow.space/api/v0.1/countries/states", {
        country: props.user?.country,
      })
      .then((res) => setStates(res.data.data))
  }, [props.user])

  function handleCountry(e) {
    setStates(countries.filter((country) => country.name === e.target.value))
  }

  async function handleState(e) {
    console.log("se llama")
    console.log(country.current.value)
    console.log(e.target.value)

    const res = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        country: country.current.value,
        state: e.target.value,
      }
    )

    setCities(res.data.data)
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  const handleShow = () => setShow(true)

  function handleAddress(e) {
    e.preventDefault()
    props.loginPending()
    props.newAddress(
      country.current.value,
      state.current.value,
      city.current.value,
      name.current.value,
      address.current.value,
      phone.current.value
    )
  }

  function handleCheck() {}
  return (
    <>
      {props.user?._id ? (
        props.address?.response?.user !== props.user?._id ? (
          <Button variant="primary" onClick={handleShow}>
            Shipping Address
          </Button>
        ) : (
          <Button variant="primary" onClick={handleShow}>
            Checkout
          </Button>
        )
      ) : (
        <h1>Hola</h1>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {props.address.response?.user !== props.user?._id ? (
          <form onSubmit={handleAddress}>
            <div className="input-group">
              <label htmlFor="name">To</label>
              <input
                required
                type="text"
                id="name"
                defaultValue={props.user?.firstName}
                className="btn-signup"
                ref={name}
                placeholder="E.G.: Adam smith"
                minLength="3"
                maxLength="30"
              ></input>
            </div>
            <div className="input-group ">
              <label htmlFor="country">Country</label>

              <select
                type="text"
                id="country"
                className="btn-signup"
                ref={country}
                defaultValue={props.user?.country}
                onChange={handleCountry}
                required
              >
                {countries?.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="input-group">
                <label htmlFor="state">State</label>
                <select
                  type="text"
                  id="state"
                  className="btn-signup"
                  onChange={handleState}
                  ref={state}
                  required
                >
                  <option value={null} defaultChecked>
                    Choose a state
                  </option>
                  {states[0]
                    ? states[0].states?.map((state) => (
                        <option key={state.name} value={state.name}>
                          {state.name.indexOf("Province") > 0
                            ? state.name.slice(
                                0,
                                state.name.indexOf("Province")
                              )
                            : state.name}
                        </option>
                      ))
                    : states.states?.map((state) => (
                        <option key={state.name} value={state.name}>
                          {state.name.indexOf("Province") > 0
                            ? state.name.slice(
                                0,
                                state.name.indexOf("Province")
                              )
                            : state.name}
                        </option>
                      ))}
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="state">City</label>
                <select
                  type="text"
                  id="state"
                  className="btn-signup"
                  ref={city}
                  required
                >
                  {cities[0] ? (
                    <option value={null} defaultChecked>
                      Choose a city
                    </option>
                  ) : (
                    <option value="none">No city for this state</option>
                  )}
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="address">Address</label>

              <input
                required
                type="text"
                id="address"
                className="btn-signup"
                ref={address}
                minLength="3"
                maxLength="200"
                placeholder="Street address"
              ></input>
            </div>
            <div className="input-group">
              <label htmlFor="name">Phone</label>
              <input
                required
                type="number"
                id="phone"
                className="btn-signup"
                ref={phone}
                minLength="3"
                maxLength="20"
              ></input>
            </div>

            <Button type="submit" variant="primary">
              {props.isLoading ? "Sending..." : "Go to Checkout"}
            </Button>
          </form>
        ) : (
          <Paypal
            sold={props.sold}
            fetchProducts={props.fetchearProductos}
            description={`Compra del dia ${date.toLocaleDateString()}en Hexagon`}
            total={props.cartTotal}
          />
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    isLoading: state.authReducer.isLoading,
    isAuth: state.authReducer.isAuth,
    user: state.authReducer.user,
    address: state.authReducer.address,
  }
}

const mapDispatchToProps = {
  newAddress: authAction.newAddress,
  checkAddress: authAction.checkAddress,
  loginPending: authAction.loginPending,
  fetchearProductos: productoAction.fetchearProductos,
  sold: productoAction.sold,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm)
