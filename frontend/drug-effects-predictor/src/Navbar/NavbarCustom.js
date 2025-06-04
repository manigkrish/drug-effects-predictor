import React from 'react'
import { Container, Form, Button, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
function NavbarCustom() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login')
        // Here you would handle the actual logout process, like clearing the user session
        alert('Logging out...');
      };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
      <LinkContainer to="/home">
            <Navbar.Brand>PharmaCutieCal</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/home">
                <Nav.Link >Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/myprofile">
                <Nav.Link >Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dashboard">
                <Nav.Link >Dashboard</Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to="/"> */}
                {/* <Nav.Link >About Us</Nav.Link> */}
            {/* </LinkContainer> */}
            {/* Add more navigation links as needed */}
          </Nav>
          <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarCustom