import React, {useState} from "react"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import SortIcon from "@mui/icons-material/Sort"
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown"
import {BsFillGrid3X3GapFill} from "react-icons/bs"
import {FaList} from "react-icons/fa"
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha"
export default function TopBarFilter() {
  const [sortName, setSortName] = useState(false)
  const [sortPrice, setSortPrice] = useState(false)
  const [sortLike, setSortLike] = useState(false)
  return (
    <>
      <p>Ordernar por:</p>
      <div className="shop__top-bar--sort">
        <p style={{cursor: "pointer"}} onClick={() => setSortPrice(!sortPrice)}>
          {sortPrice ? "Menor" : "Mayor"} precio{" "}
          {!sortPrice ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </p>
        <SortIcon
          style={{cursor: "pointer"}}
          onClick={() => setSortPrice(!sortPrice)}
        />
      </div>
      <div className="shop__top-bar--sort">
        <p style={{cursor: "pointer"}} onClick={() => setSortLike(!sortLike)}>
          {sortLike ? "Menor" : "Mayor"} gustados{" "}
          {!sortLike ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </p>
        <ThumbsUpDownIcon
          style={{cursor: "pointer"}}
          onClick={() => setSortLike(!sortLike)}
        />
      </div>
      <div className="shop__top-bar--sort">
        <p style={{cursor: "pointer"}} onClick={() => setSortName(!sortName)}>
          Alfabeticamente{" "}
          {!sortName ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </p>
        <SortByAlphaIcon
          style={{cursor: "pointer"}}
          onClick={() => setSortName(!sortName)}
        />
      </div>
      <div className="shop__top-bar--sort">
        <p>Ver en lista</p>
        <FaList />
        <p>Ver en grilla</p>
        <BsFillGrid3X3GapFill />
      </div>
    </>
  )
}
