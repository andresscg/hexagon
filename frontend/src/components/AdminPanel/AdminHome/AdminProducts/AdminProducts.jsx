import {Link} from "react-router-dom"
import Chart from "../Chart/Chart"
import "./AdminProducts.css"
import {Publish} from "@material-ui/icons"
import store from "../../../../redux/store/store"
import {DataGrid} from "@mui/x-data-grid"
import {DeleteOutline} from "@material-ui/icons"
import {useEffect, useState} from "react"
import {connect, useDispatch} from "react-redux"
import {productRows} from "./dummyData"

import authAction from "../../../../redux/actions/authAction"
import {Table} from "react-bootstrap"
import ListProduct from "./ListProduct"

function AdminProducts(props) {
  const [data, setData] = useState([])
  useEffect(() => {
    props
      .getUsers()
      .then((res) => setData(res.data.response))
      .catch((error) => console.log(error))
  }, [])

  console.log(data)
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 1 &&
          data.map((user, index) => {
            return <ListProduct user={user} key={index} />
          })}
      </tbody>
    </Table>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.authReducer.users,
  }
}

const mapDispatchToProps = {
  getUsers: authAction.getUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts)
