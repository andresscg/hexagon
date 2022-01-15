const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: state.cart.concat({
          item: action.payload.product,
          qty: 1,
          user: action.payload.user,
        }),
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.item._id !== action.payload._id),
      }
    case "REFRESH_CART":
      return {
        ...state,
        cart: action.payload || [],
      }
    case "CHANGE_CART_QTY":
      const itemIndex = state.cart.findIndex(
        (e) => e.item._id === action.payload.id
      )
      state.cart[itemIndex].qty = action.payload.qty
      return {
        ...state,
        cart: state.cart.map((el) =>
          el.item.id === action.payload.id ? (el.qty = action.payload.qty) : el
        ),
      }

    default:
      return state
  }
}

export default cartReducer
