const initialState = {
  productos: [],
  auxiliar: [],
  producto: [],
}

const productoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTOS":
      return {
        ...state,
        productos: action.payload.productos,
        auxiliar: action.payload.productos,
        producto: action.payload.productos,
      }

    case "FETCH_UN_PRODUCTO":
      return {
        ...state,
        producto: action.payload.respuesta,
        success: action.payload.success,
      }
    case "SEARCH":
      const filtered = state.productos.filter((producto) =>
        producto.nombre
          .toLowerCase()
          .includes(action.payload.search.toLowerCase())
      )
      return {
        ...state,
        auxiliar: filtered,
      }

    default:
      return state
  }
}

export default productoReducer
