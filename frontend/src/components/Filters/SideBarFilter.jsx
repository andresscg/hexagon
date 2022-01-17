import React, {useState} from "react"
import PhonesFilter from "./PhonesFilter"
import SliderPriceFilter from "./SliderPriceFilter"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import SortIcon from "@mui/icons-material/Sort"
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown"
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha"
import {BsFillGrid3X3GapFill} from "react-icons/bs"
import {FaList} from "react-icons/fa"

export default function SideBarFilter(props) {
  const [sortName, setSortName] = useState(false)
  const [sortPrice, setSortPrice] = useState(false)
  const [sortLike, setSortLike] = useState(false)

  const categories = [
    ...new Set(props.productos.map((producto) => producto.categoria)),
  ]

  const brands = [...new Set(props.productos.map((producto) => producto.marca))]

  return (
    <>
      <PhonesFilter data={brands} name={"Brands"} /> {/* Marca */}
      <PhonesFilter data={categories} name={"Categories"} /> {/* Categorias */}
      {props.productos.length > 0 && (
        <SliderPriceFilter productos={props.productos} />
      )}
      <>
        <p>Ordernar por:</p>

        <div className="shop__top-bar--sort">
          <p
            style={{cursor: "pointer"}}
            onClick={() => setSortPrice(!sortPrice)}
          >
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
    </>
  )
}
