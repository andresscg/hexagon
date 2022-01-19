import React from "react"

export default function ShippingFilter() {
  return (
    <div>
      <label htmlFor="shipping">Shipping</label>
      <select name="shipping" id="shipping">
        <option value="shipping-nacional" defaultChecked>
          Nacional
        </option>
        <option value="shipping-capital">Capital</option>
        <option value="shipping-provincia">Provincia</option>
        <option value="shipping-interior">Interior</option>
        <option value="shipping-internacional">Internacional</option>
      </select>
    </div>
  )
}
