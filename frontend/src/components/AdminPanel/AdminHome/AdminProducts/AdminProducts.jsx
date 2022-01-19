import {Link} from "react-router-dom"
import "./AdminProducts.css"
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
