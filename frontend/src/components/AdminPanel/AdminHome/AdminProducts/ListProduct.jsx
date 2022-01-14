import React from "react"

export default function ListProduct({user, index}) {
  return (
    <tr>
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
