import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Container, Row, Col, Alert,Toast } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {userSignup} from '../../actions'

/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector(state => state.auth);
  const user= useSelector(state => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  const signupForm = (e) => {
    e.preventDefault();
    const user ={firstName, lastName, email, password};
    // console.log(firstName, lastName, email, password);
    dispatch(userSignup(user));


  };
  if(auth.authenticate){
    return <Redirect to={'/'} />
  }
  function AlertDismissibleExample() {
   
  
    if (show) {
      return (
        // <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        //   <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          
        // </Alert>

<Row>
<Col xs={6}  md={{ span: 6, offset: 3} }>
  <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
    <Toast.Header>
      <strong className="mr-auto">Notification</strong>
    </Toast.Header>
    <Toast.Body>{user.message}</Toast.Body>
  </Toast>
</Col>

</Row>
      )
    }
    
  }
  return (
    <Layout>
      
      <Container>
        {
          user.message ? AlertDismissibleExample() : '' 
        }
    
     
        <Row style={{ marginTop: "100px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={signupForm}>
              <Row>
                <Col>
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="Enter First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </Col>
                <Col>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Enter Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </Col>
              </Row>
              <Input
                label="Email"
                type="email"
                placeholder="Enter Valid Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <Button variant="primary" type="submit">
                Signup
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
