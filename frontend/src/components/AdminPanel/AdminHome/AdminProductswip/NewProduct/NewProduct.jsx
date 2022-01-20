import {useRef, useState} from "react"
import {useDispatch} from "react-redux"
import productoAction from "../../../../../redux/actions/productoAction"
import "./NewProduct.css"

export default function NewProduct() {
  const [errorAlert, setErrorAlert] = useState(false)
  const imagen = useRef()
  const nombre = useRef()
  const descripcion = useRef()
  const marca = useRef()
  const categoria = useRef()
  const stock = useRef()
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()

    if (
      imagen.current.value &&
      nombre.current.value &&
      descripcion.current.value &&
      marca.current.value &&
      categoria.current.value &&
      stock.current.value
    ) {
      setErrorAlert(false)
      dispatch(
        productoAction.addProduct(
          imagen.current.value,
          nombre.current.value,
          descripcion.current.value,
          marca.current.value,
          categoria.current.value,
          stock.current.value
        )
      )
    } else {
      setErrorAlert(true)
    }
  }
  return (
    <>
      <div className="newProduct">
        {errorAlert && <h1>Error</h1>}
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm" onSubmit={handleSubmit}>
          <div className="addProductItem">
            <label>Image</label>
            <input ref={imagen} type="text" id="file" placeholder="Img URL" />
          </div>
          <div className="addProductItem">
            <label>Name</label>
            <input ref={nombre} type="text" placeholder="Apple Airpods" />
          </div>
          <div className="addProductItem">
            <label>Descripcion</label>
            <input
              ref={descripcion}
              type="text"
              placeholder="Describe this product"
            />
          </div>
          <div className="addProductItem">
            <label>Marca</label>
            <input
              ref={marca}
              type="text"
              placeholder="Brand of this product"
            />
          </div>
          <div className="addProductItem">
            <label>Categoria</label>
            <input
              ref={categoria}
              type="text"
              placeholder="Category of this product"
            />
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <input
              ref={stock}
              type="number"
              min={0}
              max={10000}
              placeholder="Stock of this product"
            />
          </div>
          <button type="submit" className="addProductButton">
            Create
          </button>
        </form>
      </div>
    </>
  )
}
