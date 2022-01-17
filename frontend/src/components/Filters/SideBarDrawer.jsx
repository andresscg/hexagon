import * as React from "react"

import {Container} from "@mui/material"
import {Navbar, Offcanvas} from "react-bootstrap"
import SideBarFilter from "./SideBarFilter"

export default function SwipeableTemporaryDrawer(props) {
  return (
    <Navbar bg="light" expand={false}>
      <Container fluid>
        <Navbar.Toggle />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Filtros!
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <SideBarFilter productos={props.productos} />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}
