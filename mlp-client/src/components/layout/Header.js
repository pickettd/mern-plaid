import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import NavItem from "react-bootstrap/NavItem";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <NavItem>
            <Navbar.Brand href="/">
              <img
                alt=""
                src=""
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Waiwai
            </Navbar.Brand>
          </NavItem>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/spend-story">
              <Nav.Link href="#">spend</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
