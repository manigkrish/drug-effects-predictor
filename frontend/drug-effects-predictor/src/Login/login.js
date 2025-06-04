import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your custom CSS file for additional styling

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const [sessionVar, setsessionVar] = useState(false)

  const handleEmailChange = (event) => {
    event.preventDefault();
    setemail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    event.preventDefault();
    setpassword(event.target.value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    try {
      console.log(email)
      console.log(password)
      // const response = await fetch('https://localhost:5000/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      const response = await fetch(`http://127.0.0.1:5000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email, password:password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("email",email)
        setsessionVar(true);
        console.log(response)
        navigate('/home');
      } else {
        console.error('Error Login:', response.statusText);
      }
    } catch (error) {
      console.error('Some error occurred:', error);
    }
  };

// if(localStorage.getItem("email") === null){
  return (
    <div>
        <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
      <LinkContainer to="/">
            <Navbar.Brand>PharmaCutieCal</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              {/* Add more navigation links as needed */}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="justify-content-center align-items-center custom-flex-width" style={{ minHeight: "100vh", width: "30vw", marginTop: "10%", marginBottom: "10%" }}>
        <Row>
          <Col md={12} className="mx-auto">
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={(e) => handleEmailChange(e)} placeholder="Enter email" required />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e) => handlePasswordChange(e)} placeholder="Password" required />
                  </Form.Group>


                  <Button className="w-100 mb-3" type="submit">Log In</Button>
                  <div className="text-center mb-3">
                    <span className="mr-2">Don't have an account?    </span>
                    <Link to="/signup">Signup</Link>

                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
// }else{
//   navigate('/home');
// }
}

export default Login;