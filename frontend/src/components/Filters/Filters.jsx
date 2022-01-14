import React, {useRef} from "react"
import "../../styles/Filters.css"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"
import Favorite from "@mui/icons-material/Favorite"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material"
import {useTheme} from "@emotion/react"

const minDistance = 0
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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
]

export default function Filters() {
  const [value1, setValue1] = React.useState([20, 37])
  const [moreFilters, setMoreFilters] = React.useState()
  const theme = useTheme()
  const [personName, setPersonName] = React.useState([])
  const handleChangeselect = (event) => {
    const {
      target: {value},
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]])
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)])
    }
  }

  return (
    <div style={{height: "100vh", display: "grid", placeContent: "center"}}>
      <div>
        <label htmlFor="brand">Brand</label>
        <select name="brand" id="brand">
          <option value="brand-all">All</option>
          <option value="brand-motorola">Motorola</option>
          <option value="brand-samsung">Samsung</option>
          <option value="brand-alcatel">Alcatel</option>
          <option value="brand-iphone">IPhone</option>
        </select>
      </div>

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

      <div>
        <p onClick={() => setMoreFilters(!moreFilters)}>
          {moreFilters ? "-" : "+"} Filtros
        </p>
        {moreFilters && (
          <>
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
            <div>
              <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="demo-multiple-chip-label">Processor</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChangeselect}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Processor"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </>
        )}
      </div>

      <p>Lista</p>
      <p>Cuadricula</p>
      <Box sx={{width: 300}}>
        <Slider
          getAriaLabel={() => "Minimum distance"}
          value={value1}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          disableSwap
        />
      </Box>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={"+"}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={"+"}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion disabled>
          <AccordionSummary
            expandIcon={"+"}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Disabled Accordion</Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    </div>
  )
}
