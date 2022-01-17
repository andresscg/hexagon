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
      var filt = [1, 2, 3, 4].filter(
        function (e) {
          return this.indexOf(e) >= 0
        },
        [2, 4]
      )
      console.log(filt)
      /* const filteredByCategories = sorted.filter((item) =>
        state.categories.includes(item.categoria)
      )
      const filteredByBrands = filteredByCategories.filter((item) =>
        state.brands.includes(item.marca)
      ) */
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
