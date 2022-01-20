import authAction from "../../../redux/actions/authAction"
import AdminContent from "./AdminContent/AdminContent"
import Chart from "./Chart/Chart"
import {connect} from "react-redux"
import {useEffect} from "react"
import UsersLG from "./AdminUsers/UsersLG/UsersLG"
import UsersSM from "./AdminUsers/UsersSM/UsersSM"

function AdminHome(props) {
  useEffect(() => {
    props.getUsersByDate()
  }, [])
  return (
    <div style={{flex: 4}}>
      <AdminContent />
      <Chart
        data={props.usersByDate}
        title="Users Analytics"
        grid
        dataKey="usersThisDay"
      />
      <div className="user-lgsm__container">
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
