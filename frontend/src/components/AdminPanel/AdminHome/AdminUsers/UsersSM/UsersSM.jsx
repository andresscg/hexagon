import "./UsersSM.css"
import {Visibility} from "@material-ui/icons"
import {useEffect} from "react"
import axios from "axios"
import {useState} from "react"
import {Link} from "react-router-dom"

export default function UsersSM() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .post("https://hexagon-techstore.herokuapp.com/api/user/getUserLimited", {
        limit: 5,
      })
      .then((res) => setData(res.data.response))
  }, [])

  console.log(data)

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {data?.map((user) => (
          <li className="widgetSmListItem">
            <img
              src={
                user?.photo.indexOf("googleusercontent") >= 0
                  ? user?.photo
                  : "https://i.imgur.com/o2bJt64.png"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">
                {user.firstName + " " + user.lastName}
              </span>
              <span className="widgetSmUserTitle">
                {user.admin ? "Developer" : "User"}
              </span>
            </div>
            <Link to={"/admin/users/" + user._id} className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
