import {combineReducers} from "redux"
import authReducer from "./authReducer"
import modalReducer from "./modalReducer"
import productoReducer from "./productoReducer"

const rootReducer = combineReducers({
  authReducer: authReducer,
  productoReducer: productoReducer,
  modalReducer: modalReducer,
})

export default rootReducer
