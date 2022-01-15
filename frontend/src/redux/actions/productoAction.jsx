import axios from "axios"

const token = localStorage.getItem("token")
const tokenHeader = {
  headers: {
    Authorization: "Bearer " + token,
  },
}
const rootUrl = "https://hexagon-techstore.herokuapp.com/api/"
const addorGetProduct = rootUrl + "productos"
const like = addorGetProduct + "/like/"

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

  fetchUnProducto: (id) => {
    return (dispatch, getState) => {
      axios
        .get(addorGetProduct + id)
        .then((respuesta) =>
          dispatch({type: "FETCH_UN_PRODUCTO", payload: respuesta.data})
        )
    }
  },

  likeDislike: (token, id, idUsuario) => {
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
}
export default productoAction
