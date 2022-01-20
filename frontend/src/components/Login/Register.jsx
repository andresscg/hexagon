import React, {useState, useEffect} from "react"
import axios from "axios"
import GoogleLogin from "react-google-login"
import {connect} from "react-redux"
import authAction from "../../redux/actions/authAction"
import "../../styles/SignForm.css"
import {Link} from "react-router-dom"
import modalAction from "../../redux/actions/modalAction"

function Register(props) {
  const responseGoogle = (res) => {
    props.userRegister({
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      password: res.profileObj.googleId,
      email: res.profileObj.email,
      photo: res.profileObj.imageUrl,
      google: true,
      country: "Google",
    })
  }

  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/states")
      .then((res) => setCountries(res.data.data))
  }, [])

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
    photo: "",
    country: "",
  })

  const handlePhoto = (e) => {
    setNewUser({...newUser, photo: e.target.files[0]})
  }

  const handleChange = (e) => {
    setNewUser({...newUser, [e.target.name]: e.target.value})
  }

  function handleRegister(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("firstName", newUser.name)
    formData.append("password", newUser.password)
    formData.append("lastName", newUser.lastname)
    formData.append("country", newUser.country)
    formData.append("photo", newUser.photo)
    formData.append("email", newUser.email)
    formData.append("google", false)
    if (formData.get("email") && formData.get("password")) {
      props.loginPending()
      props.userRegister(formData)
    }
  }
  return (
    <div className="register-body">
      <h2 className="register-title">Register</h2>
      <p className="register-subtitle">
        If you have an account,{" "}
        <span
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            fontWeight: 800,
            color: "#fff",
          }}
          onClick={props.HandleLoginRegisterModal}
        >
          Login!
        </span>
      </p>
      <form
        className="register-form"
        onSubmit={handleRegister}
        encType="multipart/form-data"
      >
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
              className="btn-signup"
              accept=".png, .jpg, .jpeg"
              onChange={handlePhoto}
            ></input>
          </div>
          <div className="input-group ">
            <label htmlFor="country">Country</label>
            <select
              type="text"
              id="country"
              name="country"
              className="btn-signup"
              // ref={country}
              defaultValue="none"
              onChange={handleChange}
              required
            >
              <option value="none" disabled defaultChecked>
                Choose a state
              </option>
              {countries?.map((state) => {
                return (
                  <option value={state.name} key={state.key}>
                    {state.name}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="register-btns">
          <input type="submit" className="btn-submit" value="Register" />
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
  HandleLoginRegisterModal: modalAction.HandleLoginRegisterModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
