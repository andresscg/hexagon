import Sidebar from "./Sidebar/Sidebar"
import {Outlet} from "react-router-dom"

export default function AdminPanel() {
  return (
    <main style={{padding: "15vh 0 0 0", display: "flex"}}>
      <Sidebar />
      <div style={{flex: 3}}>
        <Outlet />
      </div>
    </main>
  )
}
