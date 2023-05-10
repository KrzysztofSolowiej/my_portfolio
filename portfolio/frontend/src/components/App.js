import React, { Component } from 'react';
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import HomePage from "./HomePage";
import Footer from "./Footer";
import '../../static/css/index.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const appDiv = document.getElementById("app");
render(<App />, appDiv);


function App() {
    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">My portfolio</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <NavDropdown title="Projects" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/rothko">Rothko project</NavDropdown.Item>
                                <NavDropdown.Item href="/first-project">First project</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#" disabled>Electronics</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div><HomePage /></div>
            <div>
                <Footer />
            </div>
        </div>
    );
}
export default App;
