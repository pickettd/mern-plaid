import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import NavItem from "react-bootstrap/NavItem";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  return (
    <>
      <Navbar expand="lg">
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
          <Nav>
            {/*<LinkContainer to="/">
              <Nav.Link href="#home">Home</Nav.Link>
            </LinkContainer>*/}
            <div className="mr-auto navbar-nav">
              <LinkContainer to="/spend-story">
                <Nav.Link href="#">spend</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/save-story">
                <Nav.Link href="#">save</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/borrow-story">
                <Nav.Link href="#">borrow</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/plan-story">
                <Nav.Link href="#">plan</Nav.Link>
              </LinkContainer>
            </div>
            <NavDropdown
              title="User"
              id="basic-nav-dropdown"
              className="ml-auto dropdown-menu-right"
            >
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Bank Accounts
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
