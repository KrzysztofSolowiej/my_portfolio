import React from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <Navbar bg="light" expand="lg" variant="light" style={{ marginTop: '7rem' }}>
            <Container>
                <Row className="d-flex flex-row justify-content-around">
                    <Col md={4} className="text-left">
                        <p>Contact: krsolowiej@gmail.com</p>
                    </Col>

                    <Col md={4} className="text-left">
                        <a href="https://github.com/KrzysztofSolowiej"><img
                            src="..\static\images\pngwing.png"
                            alt="First slide"
                            style={{ width: '30px', height: 'auto', display: 'block', margin: 'auto', paddingTop: '10px' }}
                        /> </a>
                    </Col>
                    <Col md={4} className="text-center">
                        <img
                            src="..\static\images\by.png"
                            alt="First slide"
                            style={{ width: '100px', height: 'auto', display: 'block', margin: 'auto', paddingTop: '10px' }}
                        />
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}

export default Footer;
