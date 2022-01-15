import React from "react"
import {BsStarFill, BsStarHalf, BsStar} from "react-icons/bs"

const Calificacion = ({value, text, color}) => {
  console.log(value)

  return (
    <div className="calificacion">
      <span style={{color}}>
        {value >= 1 ? (
          <BsStarFill />
        ) : value >= 0.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span style={{color}}>
        {value >= 2 ? (
          <BsStarFill />
        ) : value >= 1.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span style={{color}}>
        {value >= 3 ? (
          <BsStarFill />
        ) : value >= 2.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span style={{color}}>
        {value >= 4 ? (
          <BsStarFill />
        ) : value >= 3.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span style={{color}}>
        {value >= 5 ? (
          <BsStarFill />
        ) : value >= 4.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    </div>
  )
}

Calificacion.defaultProps = {
  color: "#f8e825",
}
export default Calificacion
