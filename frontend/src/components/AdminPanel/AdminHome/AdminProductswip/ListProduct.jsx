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
<<<<<<< HEAD:frontend/src/components/AdminPanel/AdminHome/AdminUsers/ListUser.jsx
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
=======
      <td>
        <img
          width={100}
          style={{objectFit: "cover"}}
          src={user.imagen}
          alt={`producto ${user.nombre}`}
        />
      </td>
      <td>{user.nombre}</td>
      <td>{user.categoria}</td>
      <td>
        <p>{!show ? toShow : content}</p>
        {content?.length > 70 && (
          <Button onClick={() => setShow(!show)}>
            {!show ? <BiShow /> : <BiHide />}
          </Button>
        )}
>>>>>>> fda4e8a3f0890056f038016da963b0cfddd7fdfe:frontend/src/components/AdminPanel/AdminHome/AdminProductswip/ListProduct.jsx
      </td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>

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
