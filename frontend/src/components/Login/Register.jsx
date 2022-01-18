import React, {useRef, useState, useEffect} from "react"
import axios from "axios"
import GoogleLogin from "react-google-login"
import {connect, useDispatch} from "react-redux"
import authAction from "../../redux/actions/authAction"
import '../../styles/SignForm.css'

function Register(props) {
  /*   localStorage.getItem("token") && !props.token && props.tokenDale()
   */
  const responseGoogle = (res) => {
    props.userRegister(
      res.profileObj.givenName,
      res.profileObj.familyName,
      res.profileObj.googleId,
      res.profileObj.email,
      res.profileObj.imageUrl,
      "Google"
    )
  }

  const [usStates, setUsStates] = useState([])
  useEffect(() => {
    axios.get('https://datausa.io/api/searchLegacy/?limit=100&dimension=Geography&hierarchy=State&q=')
      .then(response => setUsStates(response.data.results.sort((a, b) => {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
      })))
      .catch(error => console.log(error))
  })

  const email = useRef()
  const password = useRef()
  const name = useRef()
  const lastname = useRef()
  const photo = useRef()
  const country = useRef()

  function handleRegister(e) {
    e.preventDefault()
    if (email.current.value && password.current.value) {
      props.loginPending()
      let response = props.userRegister(
        name.current.value,
        lastname.current.value,
        password.current.value,
        email.current.value,
        photo.current.value,
        country.current.value
      )
      console.log(response)
    }
  }
  return (
    <div className="register-body">
      <h3 className="register-title">Make an account</h3>
      <p className="register-subtitle">If you don't have an account, create a new one!</p>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="register-inputs">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              id="name"
              className="btn-signup"
              ref={name}
              minLength="3"
              maxLength="20"
            ></input>
          </div>

          <div className="input-group">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="lastname"
              className="btn-signup"
              ref={lastname}
              minLength="3"
              maxLength="20"
              required
            ></input>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="btn-signup"
              ref={email}
              required
            ></input>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="btn-signup"
              ref={password}
              minLength="8"
              maxLength="20"
              required
            ></input>
          </div>
          <div className="input-group">
            <label htmlFor="photo">Photo</label>
            <input
              type="string"
              id="photo"
              className="btn-signup"
              ref={photo}
              required
            ></input>
          </div>
          <div className="input-group ">
            <label htmlFor="country">State</label>
            <select
              type="text"
              id="country"
              className="btn-signup"
              ref={country}
              required
            >
              {usStates.map(state => {
                return (
                  <option value={state.name}>{state.name}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="register-btns">
          <input
            type="submit"
            className="btn-submit"
            value="Register"
          />
          <GoogleLogin
            clientId="113911854537-8j68k30a4qpl884ffcvk7hvdfmsdlfnc.apps.googleusercontent.com"
            buttonText="Sign Up with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            className="google-btn"
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  }
}
const mapDispatchToProps = {
  loginPending: authAction.loginPending,
  userRegister: authAction.userRegister,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)