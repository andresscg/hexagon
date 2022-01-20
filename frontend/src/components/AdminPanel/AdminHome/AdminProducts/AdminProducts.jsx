import {Link} from "react-router-dom"
import Chart from "../Chart/Chart"
import "./AdminProducts.css"
import {Publish} from "@material-ui/icons"
import store from "../../../../redux/store/store"
import {DataGrid} from "@mui/x-data-grid"
import {DeleteOutline} from "@material-ui/icons"
import {useEffect, useState} from "react"
import {connect, useDispatch} from "react-redux"

import productoAction from "../../../../redux/actions/productoAction"
import {Table} from "react-bootstrap"
import ListProduct from "./ListProduct"

function AdminProducts(props) {
  const [data, setData] = useState([])
  /* useEffect(() => {
    props
      .fetchearProductos()
      .then((res) => setData(res.respuesta))
      .catch((error) => console.log(error))
  }, []) */

  return (
    <>
      <Link to="newproduct" className="newProduct__btn">New Product</Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="table__head">Image</th>
            <th className="table__head">Product</th>
            <th className="table__head">Category</th>
            <th className="table__head">Description</th>
            <th className="table__head">Buttons</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 1 &&
            data.map((user, index) => {
              return <ListProduct user={user} key={index} />
            })}
        </tbody>
      </Table>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.authReducer.users,
  }
}

const mapDispatchToProps = {
  fetchearProductos: productoAction.fetchearProductos,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts)
