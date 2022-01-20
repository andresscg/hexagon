import {Description} from "@material-ui/icons"
import React, {useState} from "react"
import {Button} from "react-bootstrap"
import {BiShow, BiHide} from "react-icons/bi"
import {FaEdit} from "react-icons/fa"
import {MdOutlineHideSource} from "react-icons/md"
import {RiDeleteBin5Fill} from "react-icons/ri"
import {Link} from "react-router-dom"

export default function ListProduct({user, index}) {
  const [show, setShow] = useState(false)
  const content = user.descripcion
  const toShow = content ? content.substring(0, 50) : ""
  return (
    <tr>
      <td>
        <Link to={`/admin/users/${user._id}`}>
          <img
            width={100}
            src={
              user?.photo.indexOf("googleusercontent") >= 0
                ? user?.photo
                : "https://i.imgur.com/o2bJt64.png"
            }
            alt={user.firstName}
          />
        </Link>
      </td>{" "}
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>
        <p>{!show ? toShow : content}</p>
        {content?.length > 50 && (
          <Button onClick={() => setShow(!show)}>
            {!show ? <BiShow /> : <BiHide />}
          </Button>
        )}
      </td>
      <td>
        <Button variant="warning">
          <FaEdit />
        </Button>
        <Button variant="dark">
          <MdOutlineHideSource />
        </Button>
        <Button variant="danger">
          <RiDeleteBin5Fill />
        </Button>
      </td>
    </tr>
  )
}
