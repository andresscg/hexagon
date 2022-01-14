import {combineReducers} from "redux"
import cartReducer from "./cartReducer"
import authReducer from "./authReducer"
import modalReducer from "./modalReducer"
import productoReducer from "./productoReducer"

const rootReducer = combineReducers({
  authReducer: authReducer,
  productoReducer: productoReducer,
  modalReducer: modalReducer,
  cartReducer: cartReducer,
})

export default rootReducer
