const initialState = {
  productos: [],
  auxiliar: [],
  producto: [],
  min: 0,
  max: 1,
  search: "",
  sort: (a, b) => a.nombre.localeCompare(b.nombre),
  filtered: [],
}

const productoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTOS":
      return {
        ...state,
        productos: action.payload.productos,
        auxiliar: action.payload.productos,
        filtered: action.payload.productos,
        producto: action.payload.productos,
      }

    case "FETCH_UN_PRODUCTO":
      return {
        ...state,
        producto: action.payload.respuesta,
        success: action.payload.success,
      }

    case "RANGE_PRICE":
      return {
        ...state,
        min: action.payload.min,
        max: action.payload.max,
      }
    case "SEARCH":
      return {
        ...state,
        search: action.payload.search,
      }
    case "SORT":
      return {
        ...state,
        sort: action.payload,
      }
    case "FILTERS":
      const ranged = state.productos.filter(
        (a) => a.precio >= state.min && a.precio <= state.max
      )
      const sorted = ranged.slice().sort(state.sort)

      const filtered = sorted.filter((producto) =>
        producto.nombre.toLowerCase().includes(state.search.toLowerCase())
      )
      return {
        ...state,
        filtered: filtered,
      }
    default:
      return state
  }
}

export default productoReducer
