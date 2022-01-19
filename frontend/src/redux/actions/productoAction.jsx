import axios from "axios"

const token = localStorage.getItem("token")
const tokenHeader = {
  headers: {
    Authorization: "Bearer " + token,
  },
}
const rootUrl = "https://hexagon-techstore.herokuapp.com/api/"
const addorGetProduct = rootUrl + "productos/"
const like = addorGetProduct + "like/"

const productoAction = {
  fetchearProductos: () => {
    return async (dispatch, getState) => {
      const response = await axios.get(addorGetProduct)
      dispatch({
        type: "FETCH_PRODUCTOS",
        payload: {productos: response.data.respuesta},
      })
      return response.data
    }
  },
  sortProductos: (buleano, sort) => {
    return async (dispatch, getState) => {
      if (sort === "alf") {
        let des = (a, b) => a.nombre.localeCompare(b.nombre)
        let asc = (b, a) => a.nombre.localeCompare(b.nombre)

        if (!buleano) {
          dispatch({
            type: "SORT",
            payload: des,
          })
        } else {
          dispatch({
            type: "SORT",
            payload: asc,
          })
        }
      }
      if (sort === "price") {
        let des = (a, b) => a.precio - b.precio
        let asc = (b, a) => a.precio - b.precio
        if (!buleano) {
          dispatch({
            type: "SORT",
            payload: des,
          })
        } else {
          dispatch({
            type: "SORT",
            payload: asc,
          })
        }
      }
      if (sort === "like") {
        let des = (a, b) => a.likes.length - b.likes.length
        let asc = (b, a) => a.likes.length - b.likes.length
        if (!buleano) {
          dispatch({
            type: "SORT",
            payload: des,
          })
        } else {
          dispatch({
            type: "SORT",
            payload: asc,
          })
        }
      }
    }
  },
  rangePrice: (max, min) => {
    return (dispatch, getState) => {
      dispatch({
        type: "RANGE_PRICE",
        payload: {max: max, min: min},
      })
    }
  },
  search: (search) => {
    return (dispatch, getState) => {
      dispatch({
        type: "SEARCH",
        payload: {search: search},
      })
    }
  },
  selectFilter: (data, selector) => {
    return (dispatch, getState) => {
      if (selector === "Brands")
        dispatch({
          type: "BRANDS",
          payload: {data: data},
        })
      if (selector === "Categories")
        dispatch({
          type: "CATEGORIES",
          payload: {data: data},
        })
    }
  },
  filters: () => {
    return (dispatch) => {
      dispatch({type: "FILTERS"})
    }
  },
  fetchUnProducto: (id) => {
    return (dispatch, getState) => {
      axios
        .get(addorGetProduct + id)
        .then((respuesta) =>
          dispatch({type: "FETCH_UN_PRODUCTO", payload: respuesta.data})
        )
    }
  },

  likeDislike: (id, idUsuario) => {
    const token = localStorage.getItem("token")
    return async () => {
      try {
        const response = await axios.put(
          like + id,
          {idUsuario},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        console.log(response.data)
        return response.data.response
      } catch (error) {
        console.log(error)
      }
    }
  },
  addProduct: (imagen, nombre, descripcion, marca, categoria, stock) => {
    return async () => {
      try {
        const response = await axios.post(
          addorGetProduct,
          {imagen, nombre, descripcion, marca, categoria, stock},
          tokenHeader
        )
      } catch (error) {
        console.log(error)
      }
    }
  },
  filtro: (search) => {
    return (dispatch, getState) => {
      dispatch({
        type: "SEARCH",
        payload: {
          search: search,
        },
      })
    }
  },
  sold: (items, order) => {
    return async (dispatch, getState) => {
      await axios.put("https://hexagon-techstore.herokuapp.com/api/productos", {
        items: items,
        order: order,
      })
    }
  },
}
export default productoAction
