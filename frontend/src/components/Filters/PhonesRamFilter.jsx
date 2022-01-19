import React from "react"

export default function PhonesRamFilter() {
  return (
    <div>
      <label htmlFor="ram">Memory Ram</label>
      <select name="ram" id="ram">
        <option value="ram-1gb">1 GB</option>
        <option value="ram-2gb">2 GB</option>
        <option value="ram-3gb">3 GB</option>
        <option value="ram-4gb">4 GB</option>
        <option value="ram-6gb">6 GB</option>
        <option value="ram-8gb">8 GB</option>
        <option value="ram-12gb">12 GB</option>
        <option value="ram-16gb">16 GB</option>
      </select>
    </div>
  )
}
