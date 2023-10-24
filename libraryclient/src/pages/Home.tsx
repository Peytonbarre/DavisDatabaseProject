import React from 'react';
import { ListGroup, Button, Col, Container, Form, Row, Card } from 'react-bootstrap';

export function Home() {
  return (
    <Container className="mt-5">
      <Row>
        <Col sm={12}>
          <h2>Search for Books</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2 rounded-pill"
              aria-label="Search"
            />
            <Button className="rounded-pill" variant="outline-primary">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <h2 className="mt-5">Current Book Loans</h2>
      <Card>
        <Card.Body>
          <Row md={2} xs={1} lg={3} className="g-3">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Book #1</Card.Title>
                  <Card.Subtitle>Author #1</Card.Subtitle>
                  <Card.Text>Other information about the book</Card.Text>
                  <Card.Img></Card.Img>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Book #2</Card.Title>
                  <Card.Subtitle>Author #2</Card.Subtitle>
                  <Card.Text>Other information about the book</Card.Text>
                  <Card.Img></Card.Img>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Book #3</Card.Title>
                  <Card.Subtitle>Author #3</Card.Subtitle>
                  <Card.Text>Other information about the book</Card.Text>
                  <Card.Img></Card.Img>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row md={2} x={1} lg={2} className="g-3">
        <Col>
          <h2 className="mt-5">Current Fines</h2>
          <Card>
            <Card.Body>
              <ListGroup horizontal>
                <ListGroup.Item>Title</ListGroup.Item>
                <ListGroup.Item>Author</ListGroup.Item>
                <ListGroup.Item>Days Late</ListGroup.Item>
                <ListGroup.Item>Total Fine</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h2 className="mt-5">Upcoming Due-Dates</h2>
          <Card>
            <Card.Body>
              <ListGroup horizontal className="w-100">
                <ListGroup.Item className='flex-fill'>Title</ListGroup.Item>
                <ListGroup.Item className='flex-fill'>Author</ListGroup.Item>
                <ListGroup.Item className='flex-fill'>Checked Out</ListGroup.Item>
                <ListGroup.Item className='flex-fill'>Date Due</ListGroup.Item>
                <ListGroup.Item className='flex-fill'>Days Left</ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal>
                <ListGroup.Item className='flex-fill'>Harry Potter</ListGroup.Item>
                <ListGroup.Item className='flex-fill'>j.K Rowling</ListGroup.Item>
                <ListGroup.Item className='flex-fill'>9/12</ListGroup.Item>
                <ListGroup.Item className='flex-fill'>9/15</ListGroup.Item>
                <ListGroup.Item className='flex-fill'>3</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
