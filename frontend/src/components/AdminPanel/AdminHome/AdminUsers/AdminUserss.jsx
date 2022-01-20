import "./AdminUsers.css"
import {DataGrid} from "@mui/x-data-grid"
import {DeleteOutline} from "@material-ui/icons"
import {Link} from "react-router-dom"
import {useEffect, useState} from "react"
import axios from "axios"

export default function AdminUsers() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/modificar")
      .then((res) => setData(res.data.response))
  }, [])

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id))
  }

  const columns = [
    {field: "_id", headerName: "ID", width: 90},
    {
      field: "firstName",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.photo} alt="" />
            {params.row.firstName}
          </div>
        )
      },
    },
    {field: "email", headerName: "Email", width: 200},
    {
      field: "admin",
      headerName: "Admin",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/users/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        )
      },
    },
  ]

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  )
}
