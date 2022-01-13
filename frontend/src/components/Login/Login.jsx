import React, {useRef} from "react"
import {connect} from "react-redux"
import authAction from "../../redux/actions/authAction"
import GoogleLogin from "react-google-login"
import modalAction from "../../redux/actions/modalAction"
import '../../styles/SignForm.css'

function Login(props) {
  const responseGoogle = (response) => {
    props.userLogin(response.profileObj.email, response.profileObj.googleId)
  }
  const email = useRef()
  const password = useRef()
  function handleLogin(e) {
    e.preventDefault()
    if (email.current.value && password.current.value) {
      props.loginPending()
      props.userLogin(email.current.value, password.current.value)
    }
  }
  return (
    <div className="login-body">
      {/* <img src="??" alt="" className="login-image" /> */}
      <div className="login-bg">
        <div className="login-form">
          <h2 className="login-title">Log in</h2>
          <p className="login-subtitle">If you already have an account, sign in!</p>
          <form onSubmit={handleLogin} className="form-container">
            <div className="form__inputs">
              <input
                type="text"
                className="btn-login"
                placeholder="Email"
                ref={email}
                required={true}
              />
              <input
                type="password"
                className="btn-login"
                placeholder="Password"
                ref={password}
                required={true}
              />
            </div>
            <button type="submit" className="btn-submit">
              Login
            </button>
            <p className="sing-google">
              Or You Can:
            </p>
          <GoogleLogin
            clientId="113911854537-8j68k30a4qpl884ffcvk7hvdfmsdlfnc.apps.googleusercontent.com"
            buttonText="Sign In with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            className="google-btn"
            cookiePolicy={"single_host_origin"}
          />
          </form>
        </div>
      </div>
      {/* <button onClick={() => props.tokenVerify()}>Token</button> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.authReducer.isLoading,
    user: state.authReducer.user,
  }
}
const mapDispatchToProps = {
  userLogin: authAction.userLogin,
  tokenVerify: authAction.tokenVerify,
  loginPending: authAction.loginPending,
  showCloseModal: modalAction.showCloseModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)