import React from "react";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import NavItem from "react-bootstrap/NavItem";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../../img/waiwai-logo.svg";
import LogoutButton from "../../components/profile/LogoutButton.js";

const Header = (props) => {
  const { isAuthenticated, user } = useAuth0();
  const { name } = user;
  return (
    <>
      <Navbar expand="lg">
        <LinkContainer to="/spend-story">
          <NavItem>
            <Navbar.Brand href="#">
              <img
                alt="Waiwai Logo"
                src={Logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              Waiwai
            </Navbar.Brand>
          </NavItem>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {isAuthenticated ? (
              <>
                {/*<LinkContainer to="/">
              <Nav.Link href="#home">Home</Nav.Link>
            </LinkContainer>
            <div className="mr-auto navbar-nav">
              <LinkContainer to="/spend-story">
                <Nav.Link href="#">spend</Nav.Link>
              </LinkContainer>*/}

                <div className="mr-auto navbar-nav">
                  {/*hover dropdown test
                  <NavDropdown
                    renderMenuOnMount={true}
                    title="spend"
                    id="hover-nav-dropdown"
                    className="dropdown-menu-left"
                  >*/}
                  <LinkContainer to="/spend-story">
                    <Nav.Link href="#">spend story</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/manage-transactions">
                    <Nav.Link href="#">transactions</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/spend-plan">
                    <Nav.Link href="#">plan</Nav.Link>
                  </LinkContainer>

                  {/*Nav to add back in

                  <LinkContainer to="/save-story">
                    <Nav.Link href="#">save</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/borrow-story">
                    <Nav.Link href="#">borrow</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/plan-story">
                    <Nav.Link href="#">plan</Nav.Link>
                  </LinkContainer>*/}
                </div>
                <NavDropdown
                  title={name}
                  id="basic-nav-dropdown"
                  className="ml-auto dropdown-menu-right"
                >
                  <LinkContainer to="/user-profile">
                    <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/bank-accounts">
                    <NavDropdown.Item href="#">Bank Accounts</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item className="notButton" href="#">
                    <LogoutButton />
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  userName: state.auth.user.name,
});

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, {})(Header);
