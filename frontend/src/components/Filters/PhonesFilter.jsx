import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material"
import React from "react"
import {connect} from "react-redux"
import {AiFillCloseCircle} from "react-icons/ai"

import productoAction from "../../redux/actions/productoAction"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function PhonesFilter({data, name, selectFilter}) {
  const [selData, setSelData] = React.useState([])

  const handleChangeselect = (event) => {
    const {
      target: {value},
    } = event
    setSelData(typeof value === "string" ? value.split(",") : value)
  }
  return (
    <div style={{display: "flex"}}>
      <FormControl sx={{m: 1, width: 300}}>
        <InputLabel id="demo-multiple-chip-label">
          {name ? name : "Filter"}
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selData}
          onChange={handleChangeselect}
          onChangeCapture={selectFilter(selData, name)}
          input={<OutlinedInput id="select-multiple-chip" label="Processor" />}
          renderValue={(selected) => (
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <AiFillCloseCircle
        onClick={() => {
          setSelData([])
          selectFilter(selData, name)
        }}
      />
    </div>
  )
}

const mapDispatchToProps = {
  selectFilter: productoAction.selectFilter,
}

export default connect(null, mapDispatchToProps)(PhonesFilter)
