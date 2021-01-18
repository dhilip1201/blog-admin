import React from "react";
import "./style.css";
import Header from "../Header";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink to={"/"} exact> Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/blogs"} > Blogs</NavLink>
                </li>
                <li>
                  <NavLink to={"/comments"}> Comments</NavLink>
                </li>
                
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto" ,paddingTop:'60px'}}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
