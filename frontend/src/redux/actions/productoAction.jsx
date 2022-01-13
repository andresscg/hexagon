import axios from "axios"

const token = localStorage.getItem("token")
const tokenHeader = {
  headers: {
    Authorization: "Bearer " + token,
  },
}
const rootUrl = "http://localhost:4000/api/"
const addProduct = rootUrl + "productos"

const productoAction = {
  fetchearProductos: () => {
    return async (dispatch, getState) => {
      const response = await axios.get("http://localhost:4000/api/productos")
      dispatch({
        type: "FETCH_PRODUCTOS",
        payload: {productos: response.data.respuesta},
      })
      console.log(response)
      return response.data
    }
  },

  fetchUnProducto: (id) => {
    return (dispatch, getState) => {
      axios
        .get("http://localhost:4000/api/productos/" + id)
        .then((respuesta) =>
          dispatch({type: "FETCH_UN_PRODUCTO", payload: respuesta.data})
        )
    }
  },

  likeDislike: (token, id, idUsuario) => {
    console.log(token)
    return async () => {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/productos/like/` + id,
          {idUsuario},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
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
          addProduct,
          {imagen, nombre, descripcion, marca, categoria, stock},
          tokenHeader
        )
        console.log(response)
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
}
export default productoAction
