import React from "react"

export default function PromotionFilter() {
  return (
    <div>
      <label htmlFor="promotions">Promotions</label>
      <select name="promotions" id="promotions">
        <option value="promotions-none" defaultChecked>
          None
        </option>
        <option value="promotions-cyber-monday">Cyber Monday</option>
        <option value="promotions-24hs-offer">24hs offer</option>
      </select>
    </div>
  )
}
