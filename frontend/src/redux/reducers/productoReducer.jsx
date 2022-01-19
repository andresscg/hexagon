const initialState = {
  productos: [],
  auxiliar: [],
  producto: [],
  categories: [],
  brands: [],
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
        productos: action.payload.productos.filter(
          (producto) => producto.contadorStock >= 1
        ),
        auxiliar: action.payload.productos.filter(
          (producto) => producto.contadorStock >= 1
        ),
        filtered: action.payload.productos.filter(
          (producto) => producto.contadorStock >= 1
        ),
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
    case "CATEGORIES":
      return {
        ...state,
        categories: action.payload.data,
      }
    case "BRANDS":
      return {
        ...state,
        brands: action.payload.data,
      }
    case "FILTERS":
      const ranged = state.productos.filter(
        (a) => a.precio >= state.min && a.precio <= state.max
      )
      const sorted = ranged.slice().sort(state.sort)
      let filteredByCategories = sorted.filter((el) =>
        state.categories.length > 0
          ? state.categories.indexOf(el.categoria) >= 0
          : true
      )
      let filteredByBrands = filteredByCategories.filter((el) =>
        state.brands.length > 0 ? state.brands.indexOf(el.marca) >= 0 : true
      )

      const filtered = filteredByBrands.filter((producto) =>
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
