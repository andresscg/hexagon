const initialState = {
  productos: [],
  auxiliar: [],
  producto: [],
  searched: [],
}

const productoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTOS":
      return {
        ...state,
        productos: action.payload.productos,
        auxiliar: action.payload.productos,
        searched: action.payload.productos,
        producto: action.payload.productos,
      }

    case "FETCH_UN_PRODUCTO":
      return {
        ...state,
        producto: action.payload.respuesta,
        success: action.payload.success,
      }
    case "SEARCH":
      return {
        ...state,
        searched: state.auxiliar.filter((producto) =>
          producto.nombre
            .toLowerCase()
            .includes(action.payload.search.toLowerCase())
        ),
      }

    default:
      return state
  }
}

export default productoReducer
