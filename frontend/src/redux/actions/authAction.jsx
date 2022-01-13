import axios from "axios"
import {toast} from "react-toastify"
const rootUrl = "http://localhost:4000/api/"
const loginUrl = rootUrl + "user/login"
const registerUrl = rootUrl + "user/register"
const allUsers = rootUrl + "user/modificar"
const allUsersByDate = rootUrl + "user/getUsersByDate"

const authAction = {
  loginPending: (email, password) => {
    return (dispatch, getState) => {
      dispatch({
        type: "auth@@GET_USER_PENDING",
      })
    }
  },
  userLogin: (email, password) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(loginUrl, {email, password})
        console.log(response)
        if (response.data.success) {
          getState().modalReducer.showModal = false
          console.log(response)
          localStorage.setItem("token", response.data.token)
          dispatch({
            type: "auth@@USER",
            payload: {
              user: response.data.user,
              authError: response.data.errors,
              token: response.data.token,
            },
          })
        } else {
          toast.error(response.data.errors)
          dispatch({
            type: "auth@@GET_USER_FAIL",
            payload: {
              authError: response.data.errors,
            },
          })
        }
      } catch (error) {
        console.log(error)
        toast.error("Email or password incorrect!")
        dispatch({
          type: "auth@@GET_USER_FAIL",
          payload: {
            authError: "Email or password incorrect!",
          },
        })
      }
    }
  },
  userRegister: (firstName, lastName, password, email, photo, country) => {
    return async (dispatch, getState) => {
      try {
        let response = await axios.post(registerUrl, {
          firstName,
          lastName,
          password,
          email,
          photo,
          country,
        })
        console.log(response)
        if (response.data.success && !response.data.errors) {
          getState().modalReducer.showModal = false
          localStorage.setItem("token", response.data.response.token)
          toast.success(
            "Welcome to HEXAGON " +
              response.data.response.nuevoUsuario.firstName
          )
          dispatch({
            type: "auth@@NEW_USER",
            payload: {
              user: response.data.response.nuevoUsuario,
              token: response.data.response.token,
              authError: response.data.errors,
            },
          })
        } else {
          dispatch({
            type: "auth@@GET_USER_FAIL",
            payload: {authError: response.data.errors},
          })
          response.data.errors.isArray
            ? response.data.errors.map((err) => {
                console.log(err.message)
                toast.error(err.message)
              })
            : toast.error(response.data.errors)
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  tokenVerify: () => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get("http://localhost:4000/api/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(response)
        dispatch({
          type: "auth@@GET_USER_SUCCESS",
          payload: {
            user: response.data.user,
            token: token,
            authError: null,
          },
        })
      } catch (error) {
        if (token) {
          /* localStorage.removeItem("token") */
          dispatch({
            type: "auth@@GET_USER_FAIL",
            payload: {user: null, token: null, authError: error.message},
          })
        } else {
          dispatch({
            type: "auth@@GET_USER_FAIL",
            payload: {user: null, token: null, authError: "no token"},
          })
        }
      }
    }
  },
  logout: () => {
    localStorage.removeItem("token")
    return (dispatch, getState) => {
      dispatch({type: "auth@@LOGOUT", payload: ""})
    }
  },
  getUsers: () => {
    return async (dispatch, getState) => {
      const response = await axios.get(allUsers)
      console.log(response)
      dispatch({type: "auth@@ALL_USERS", payload: response.data.response})
      return response
    }
  },
  getUsersByDate: () => {
    return async (dispatch, getState) => {
      const response = await axios.get(allUsersByDate)
      console.log(response)
      dispatch({
        type: "auth@@ALL_USERS_BY_DATE",
        payload: response.data,
      })
    }
  },
}
export default authAction
