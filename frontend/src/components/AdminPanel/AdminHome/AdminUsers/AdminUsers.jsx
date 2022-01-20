import "./AdminUsers.css"
import {useEffect} from "react"
import {connect} from "react-redux"

import authAction from "../../../../redux/actions/authAction"
import {Table} from "react-bootstrap"
import ListProduct from "./ListUser"

function AdminUsers(props) {
  useEffect(() => {
    props.getUsers()
  }, [])

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Img</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {props?.users?.map((user, index) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
