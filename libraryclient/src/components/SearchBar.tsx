import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function SearchBar() {
  return (
    <Row>
      <Col sm={12}>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search..."
            className="me-2 rounded-pill"
            aria-label="Search"
          />
          {/* TODO Change this linking system */}
          <Link to="/search">
            <Button className="rounded-pill" variant="outline-primary">
                Search
            </Button>
          </Link>
        </Form>
      </Col>
    </Row>
  );
}
