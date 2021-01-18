import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { signout } from "../../actions";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const renderLoggedIn = () => {
    return (
      <Nav>
        <span
          style={{ cursor: "pointer" }}
          to="/signup"
          className="nav-link"
          onClick={logout}
        >
          Signout
        </span>
      </Nav>
    );
  };
  const renderNonLoggedIn = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            Signin
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
        </li> */}
      </Nav>
    );
  };
  const logout = () => {
    dispatch(signout());
  };
  return (
    <>
    
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="lg"
        bg="dark"
        variant="dark"
        style={{ zIndex: 1 }}
      >
        <Container fluid>
          
          <Link className="navbar-brand" to="/">
            Blog admin app
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>

            {auth.authenticate ? renderLoggedIn() : renderNonLoggedIn()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
