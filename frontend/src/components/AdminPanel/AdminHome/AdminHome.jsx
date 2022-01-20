import authAction from "../../../redux/actions/authAction"
import AdminContent from "./AdminContent/AdminContent"
import Chart from "./Chart/Chart"
import {connect} from "react-redux"
import {useEffect} from "react"
import UsersLG from "./Users/UsersLG/UsersLG"
import UsersSM from "./Users/UsersSM/UsersSM"

function AdminHome(props) {
  useEffect(() => {
    props.getUsersByDate()
  }, [])
  return (
    <div style={{flex: 4, paddingTop: "15vh"}}>
      <button onClick={props.getUsersByDate}>USERS</button>
      <AdminContent />
      <Chart
        data={props.usersByDate}
        title="Users Analytics"
        grid
        dataKey="usersThisDay"
      />
      <div style={{display: "flex"}}>
        <UsersLG />
        <UsersSM />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    usersByDate: state.authReducer.usersByDate,
  }
}

const mapDispatchToProps = {
  getUsersByDate: authAction.getUsersByDate,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)
