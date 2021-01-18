import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, login } from "../../actions";
import { Redirect } from "react-router-dom";

/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const signInForm = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
  };
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "100px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={signInForm}>
              <Input
                label="Email"
                type="email"
                placeholder="Enter Valid Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button variant="primary" type="submit">
                Signin
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <div style={{ textAlign: "center" }}>
        <p>
          email: <span style={{ fontWeight: "bold" }}>admin@gmail.com</span>
        </p>
        <p>
          password: <span style={{ fontWeight: "bold" }}>123456</span>
        </p>
      </div>
    </Layout>
  );
};

export default Signin;
