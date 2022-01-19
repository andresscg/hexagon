import React, {useRef} from "react"
import {connect} from "react-redux"
import authAction from "../../redux/actions/authAction"
import GoogleLogin from "react-google-login"
import modalAction from "../../redux/actions/modalAction"
import "../../styles/SignForm.css"

function Login(props) {
  const responseGoogle = (response) => {
    console.log(response)
    props.userLogin(
      response.profileObj.email,
      response.profileObj.googleId,
      true
    )
  }
  const email = useRef()
  const password = useRef()
  async function handleLogin(e) {
    e.preventDefault()
    if (email.current.value && password.current.value) {
      props.loginPending()
      await props.userLogin(email.current.value, password.current.value)
    }
  }
  return (
    <div className="login-body">
      <div className="login-bg">
        <div className="login-form">
          <h2 className="login-title">Log in</h2>
          <p className="login-subtitle">
            If you don't have have an account,{" "}
            <span
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: 800,
                color: "#fff",
              }}
              onClick={props.HandleLoginRegisterModal}
            >
              Register
            </span>
          </p>
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
            <p className="sing-google">Or You Can:</p>
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
  HandleLoginRegisterModal: modalAction.HandleLoginRegisterModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
