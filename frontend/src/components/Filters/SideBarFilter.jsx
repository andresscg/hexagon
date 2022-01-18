import React, {useEffect, useState} from "react"
import PhonesFilter from "./PhonesFilter"
import SliderPriceFilter from "./SliderPriceFilter"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import {RiCoinFill} from "react-icons/ri"
import {FaCoins} from "react-icons/fa"
import {FaSortAlphaDownAlt} from "react-icons/fa"
import {FaSortAlphaDown} from "react-icons/fa"
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown"
import {BsFillGrid3X3GapFill} from "react-icons/bs"
import {FaList} from "react-icons/fa"
import "../../styles/sideBarFilter.css"
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha"
import {AiFillLike, AiFillDislike} from "react-icons/ai"
import {Button} from "react-bootstrap"

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
      <Button onClick={() => handleSort("price")}>
        {!sortPrice ? <FaCoins /> : <RiCoinFill />}
      </Button>
      <Button onClick={() => handleSort("like")}>
        {!sortLike ? <AiFillLike /> : <AiFillDislike />}
      </Button>
      <Button onClick={() => handleSort("alf")}>
        {!sortName ? <FaSortAlphaDownAlt /> : <FaSortAlphaDown />}
      </Button>
    </>
  )
}
