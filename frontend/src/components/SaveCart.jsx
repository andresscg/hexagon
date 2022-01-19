import React from "react"
import {useContext} from "react"
import {Cart} from "../context/Context"
export default function SaveCart() {
  const stateCart = useContext(Cart)
  localStorage.setItem("cart", JSON.stringify(stateCart[0].cart))
  return <></>
}
