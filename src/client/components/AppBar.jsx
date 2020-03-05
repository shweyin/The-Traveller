import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import srv from '../srv'

const AppBar = () => {
  const [logged, setLogged] = useState(false)

  srv.on('login', () => setLogged(true))
  srv.on('logout', () => setLogged(false))

  return (
    <Navbar bg="light" expand="md" className="mb-5">
      <Navbar.Brand href="#">The Traveler</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-100">
          <NavDropdown title="Explore">
            <NavDropdown.Item href="#explore-location">By Location</NavDropdown.Item>
            <NavDropdown.Item href="#explore-mood">By Mood</NavDropdown.Item>
            {/* <NavDropdown.Item href="#explore-ranking">By Ranking</NavDropdown.Item> */}
            {/* <NavDropdown.Item href="#explore-budget">By Budget</NavDropdown.Item> */}
            <NavDropdown.Item href="#explore-popularity">Popularity</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#/explore">Explore All</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#forums">Forums</Nav.Link>
          <Nav.Link href="#about" className="mr-auto">About</Nav.Link>
          {logged
            ? <>
              <Nav.Link href="#user-profile">User Profile</Nav.Link>
              <Nav.Link onClick={() => {
                srv.logout()
                  .then(() => location.hash = '#')
                  .catch(console.log)
              }}>Sign out</Nav.Link>
            </>
            : <><Nav.Link href="#sign-in">Sign In</Nav.Link></>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppBar
