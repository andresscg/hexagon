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

  // const email = useRef()
  // const password = useRef()
  // const name = useRef()
  // const lastname = useRef()
  // const country = useRef()

  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    name: '',
    lastname: '',
    photo: '',
    country: '',
  })

  const handlePhoto = e => {
    setNewUser({...newUser, photo: e.target.files[0]})
  }

  const handleChange = e => {
    setNewUser({...newUser, [e.target.name]: e.target.value})
  }

  function handleRegister(e) {
    e.preventDefault()
    console.log(newUser)
    const formData = new FormData()
    formData.append('name', newUser.name)
    formData.append('password', newUser.password)
    formData.append('lastname', newUser.lastname)
    formData.append('country', newUser.country)
    formData.append('photo', newUser.photo)
    formData.append('email', newUser.email)
    console.log(formData.get('name'))
    if (formData.get('email') && formData.get('password')) {
      props.loginPending()
      let response = props.userRegister(formData)
      console.log(response)
    }
  }
  return (
    <div className="register-body">
      <h3 className="register-title">Make an account</h3>
      <p className="register-subtitle">If you don't have an account, create a new one!</p>
      <form className="register-form" onSubmit={handleRegister} encType="multipart/form-data">
        <div className="register-inputs">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              id="name"
              name="name"
              className="btn-signup"
              // ref={name}
              onChange={handleChange}
              minLength="3"
              maxLength="20"
            ></input>
          </div>

          <div className="input-group">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="btn-signup"
              onChange={handleChange}
              // ref={lastname}
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
              name="email"
              onChange={handleChange}
              className="btn-signup"
              // ref={email}
              required
            ></input>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="btn-signup"
              // ref={password}
              onChange={handleChange}
              minLength="8"
              maxLength="20"
              required
            ></input>
          </div>
          <div className="input-group">
            <label htmlFor="photo">Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              // className="btn-signup"
              accept=".png, .jpg, .jpeg"
              onChange={handlePhoto}
            ></input>
          </div>
          <div className="input-group ">
            <label htmlFor="country">State</label>
            <select
              type="text"
              id="country"
              name="country"
              className="btn-signup"
              // ref={country}
              onChange={handleChange}
              required
            >
              {usStates.map(state => {
                return (
                  <option value={state.name} key={state.key}>{state.name}</option>
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