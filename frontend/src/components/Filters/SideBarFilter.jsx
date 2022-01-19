import React, {useEffect, useState} from "react"
import "../../styles/sideBarFilter.css"
import {Button} from "react-bootstrap"
import {FaList} from "react-icons/fa"
import {RiCoinFill} from "react-icons/ri"
import {BsFillGrid3X3GapFill} from "react-icons/bs"
import {AiFillLike, AiFillDislike} from "react-icons/ai"
import {FaCoins, FaSortAlphaDown, FaSortAlphaDownAlt} from "react-icons/fa"

export default function SideBarFilter(props) {
  const [sortName, setSortName] = useState(false)
  const [sortPrice, setSortPrice] = useState(false)
  const [sortLike, setSortLike] = useState(false)

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
      <div className="layout-products">
        <Button onClick={() => props.setGrid(false)}>
          <FaList onClick={() => props.setGrid(false)} />
        </Button>
        <Button onClick={() => props.setGrid(true)}>
          <BsFillGrid3X3GapFill onClick={() => props.setGrid(true)} />
        </Button>
      </div>
    </>
  )
}
