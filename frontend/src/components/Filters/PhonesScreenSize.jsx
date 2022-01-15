import React from "react"

export default function PhonesScreenSize() {
  return (
    <div>
      <label htmlFor="screen-size">Screen size</label>
      <select name="screen-size" id="screen-size">
        <option value="screen-size_1">1″</option>
        <option value="screen-size_2">2″</option>
        <option value="screen-size_3">3″</option>
        <option value="screen-size_4">4″</option>
        <option value="screen-size_5">5″</option>
        <option value="screen-size_6">6″</option>
        <option value="screen-size_7">7″</option>
        <option value="screen-size_8">8″</option>
      </select>
    </div>
  )
}
