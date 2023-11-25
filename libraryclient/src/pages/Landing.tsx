import React from 'react';
import { Image, Button, Row, Col } from 'react-bootstrap';

export function Landing() {
  return (
    <div className="App">
      {/* <div className="p-5 mb-4 bg-white rounded-3 shadow-sm"> */}
      <div className="p-5 mb-4 bg-light rounded-3" style={{ overflow: 'hidden' }}>
        <div className="container-fluid py-5 d-flex align-items-center justify-content-center">
          <Row>
            <Col md={8}>
              <h1 className="display-5 fw-bold">Read Smarter</h1>
              <p className="fs-4">
                Optimize your library experience with our user-friendly tool. Reserve books, check
                availability, and manage fines seamlessly, all in one place. Discover the
                convenience of efficient library management today.
              </p>
              <Button className="mt-4" variant="primary" href="/signup">
                Get Started
              </Button>
              <Button className="mt-4 ms-3" variant="secondary" href="/login">
                Log in
              </Button>
            </Col>
            <Col md={4} className="d-flex align-items-center justify-content-center">
              <Image src={require('../assets/woman-reading.png')} rounded fluid />
            </Col>
          </Row>
          {/* TODO add sources */}
          {/* <a href="https://storyset.com/people">People illustrations by Storyset</a> */}
        </div>
      </div>
    </div>
  );
}
