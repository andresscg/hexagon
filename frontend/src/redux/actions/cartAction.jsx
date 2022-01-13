const cartAction = {
  addToCart: (product, user_id) => {
    return (dispatch, getState) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: {product: product, user: user_id},
      })
    }
  },
  removeFromCart: (product) => {
    return (dispatch, getState) => {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: product,
      })
    }
  },
  changeCartQty: (id, qty) => {
    return (dispatch, getState) => {
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: {id: id, qty: qty},
      })
    }
  },
  refreshCart: (products) => {
    return (dispatch, getState) => {
      const productsParse = JSON.parse(products)
      console.log(productsParse)
      dispatch({
        type: "REFRESH_CART",
        payload: productsParse,
      })
    }
  },
}

export default cartAction
