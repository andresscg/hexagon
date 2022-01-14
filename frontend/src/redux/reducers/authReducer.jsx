const initialState = {
  isLoading: true,
  isAuth: false,
  authError: "",
  user: {},
  users: [],
  usersByDate: [],
  token: "",
}

function authReducer(state = initialState, {payload, type}) {
  switch (type) {
    case "auth@@GET_USER_PENDING":
      return {
        ...state,
        isLoading: true,
      }
    case "auth@@GET_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: payload.user,
        token: payload.token,
        authError: payload.authError,
      }
    case "auth@@GET_USER_FAIL":
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        authError: payload.authError,
      }
    case "auth@@NEW_USER":
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: payload.user,
        token: payload.token,
        authError: payload.authError,
      }
    case "auth@@USER":
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: payload.user,
        token: payload.token,
        authError: payload.authError,
      }
    case "auth@@LOGOUT":
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        user: null,
        token: null,
        authError: null,
      }
    case "auth@@ALL_USERS":
      return {
        ...state,
        users: payload,
      }
    case "auth@@ALL_USERS_BY_DATE":
      return {
        ...state,
        usersByDate: payload,
      }
    default:
      return state
  }
}

export default authReducer
