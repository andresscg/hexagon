import React, {useEffect, useState} from "react"
import PhonesFilter from "./PhonesFilter"
import SliderPriceFilter from "./SliderPriceFilter"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import {FaSortAlphaDownAlt} from "react-icons/fa"
import {FaSortAlphaDown} from "react-icons/fa"
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown"
import {BsFillGrid3X3GapFill} from "react-icons/bs"
import {AiFillDislike, AiFillLike} from "react-icons/ai"
import {FaList} from "react-icons/fa"
import "../../styles/sideBarFilter.css"

export default function SideBarFilter(props) {
  const [sortName, setSortName] = useState(false)
  const [sortPrice, setSortPrice] = useState(false)
  const [sortLike, setSortLike] = useState(false)

  const categories = [
    ...new Set(props.productos.map((producto) => producto.categoria)),
  ]

  const brands = [...new Set(props.productos.map((producto) => producto.marca))]

  useEffect(() => {
    props.sort(false, "alf")
  }, [])
  function handleSort(sort) {
    if (sort === "alf") {
      setSortName(!sortName)
      setSortPrice(false)
      setSortLike(false)

      props.sort(sortName, sort)
    }
    if (sort === "price") {
      setSortPrice(!sortPrice)
      setSortName(false)
      setSortLike(false)
      props.sort(sortPrice, sort)
    }
    if (sort === "like") {
      setSortLike(!sortLike)
      setSortName(false)
      setSortPrice(false)

      props.sort(sortLike, sort)
    }
  }

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
          <p style={{cursor: "pointer"}} onClick={() => handleSort("price")}>
            {sortPrice ? "Lower" : "Higher "} price{" "}
            {!sortPrice ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </p>
        </div>
        <div className="shop__top-bar--sort">
          <p style={{cursor: "pointer"}} onClick={() => handleSort("alf")}>
            Alphabetically   
          {!sortName ? <FaSortAlphaDownAlt /> :  <FaSortAlphaDown />}
          </p>
        </div>
        <div className="shop__top-bar--sort">
          <p style={{cursor: "pointer"}} onClick={() => handleSort("like")}>
            {sortLike ? "Menor" : "Mayor"} gustados{" "}
            {!sortLike ? <AiFillLike /> : <AiFillDislike />}
          </p>
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
