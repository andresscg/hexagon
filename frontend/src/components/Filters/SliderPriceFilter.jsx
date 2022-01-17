import {Slider} from "@mui/material"
import {Box} from "@mui/system"
import {connect} from "react-redux"

import React, {useEffect, useState} from "react"
import productoAction from "../../redux/actions/productoAction"
function SliderPriceFilter(props) {
  useEffect(() => {
    props.rangePrice(maxPrice, minPrice)
  }, [])
  const maxPrice = props.productos.sort((b, a) => a.precio - b.precio)[0].precio
  const minPrice = props.productos.sort((a, b) => a.precio - b.precio)[0].precio
  const [value1, setValue1] = useState([minPrice, maxPrice])

  const handleChange1 = (event, newValue, activeThumb) => {
    props.rangePrice(value1[1], value1[0])

    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minPrice), value1[1]])
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minPrice)])
    }
  }

  return (
    <div>
      <Box sx={{width: 300}}>
        <Slider
          getAriaLabel={() => "Minimum distance"}
          value={value1}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          disableSwap
          min={minPrice}
          max={maxPrice}
          step={1000}
        />
      </Box>
    </div>
  )
}

const mapDispatchToProps = {
  rangePrice: productoAction.rangePrice,
}
export default connect(null, mapDispatchToProps)(SliderPriceFilter)
