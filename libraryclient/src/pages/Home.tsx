import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { Col, Container, Row, Card, Table } from 'react-bootstrap';
import '../assets/cardStyling.css';

export function Home() {
  return (
    <>
        <Container className="mt-4">
        <Row>
          <Col sm={12}>
            <h3>Search for Books</h3>
          </Col>
        </Row>
        <SearchBar />
        <Card className="mt-4">
          <Card.Body>
            <Row>
              <h3>Reccomended Books</h3>
            </Row>
            <Row md={2} xs={1} lg={3} className="g-3">
              <Col>
                <Card className="hover-shadow">
                  <Card.Img
                    variant="top"
                    src={require('../assets/BookCover.jpg')}
                    style={{ maxHeight: '200px', objectFit: 'cover', objectPosition: 'top' }}
                  />
                  <Card.Body>
                    <Card.Title>Book #1</Card.Title>
                    <Card.Subtitle>Author #1</Card.Subtitle>
                    <Card.Text>Other information about the book</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="hover-shadow">
                  <Card.Img
                    variant="top"
                    src={require('../assets/BookCover.jpg')}
                    style={{ maxHeight: '200px', objectFit: 'cover', objectPosition: 'top' }}
                  />
                  <Card.Body>
                    <Card.Title>Book #2</Card.Title>
                    <Card.Subtitle>Author #2</Card.Subtitle>
                    <Card.Text>Other information about the book</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="hover-shadow">
                  <Card.Img
                    variant="top"
                    src={require('../assets/BookCover.jpg')}
                    style={{ maxHeight: '200px', objectFit: 'cover', objectPosition: 'top' }}
                  />
                  <Card.Body>
                    <Card.Title>Book #3</Card.Title>
                    <Card.Subtitle>Author #3</Card.Subtitle>
                    <Card.Text>Other information about the book</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mt-4">
          <Card.Body>
            <Row>
              <h3>Current Book Loans</h3>
            </Row>
            <Row md={2} xs={1} lg={3} className="g-3">
              <Col>
                <Card className="hover-shadow">
                  <Card.Img
                    variant="top"
                    src={require('../assets/BookCover.jpg')}
                    style={{ maxHeight: '200px', objectFit: 'cover', objectPosition: 'top' }}
                  />
                  <Card.Body>
                    <Card.Title>Book #1</Card.Title>
                    <Card.Subtitle>Author #1</Card.Subtitle>
                    <Card.Text>Other information about the book</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="hover-shadow">
                  <Card.Img
                    variant="top"
                    src={require('../assets/BookCover.jpg')}
                    style={{ maxHeight: '200px', objectFit: 'cover', objectPosition: 'top' }}
                  />
                  <Card.Body>
                    <Card.Title>Book #2</Card.Title>
                    <Card.Subtitle>Author #2</Card.Subtitle>
                    <Card.Text>Other information about the book</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="hover-shadow">
                  <Card.Img
                    variant="top"
                    src={require('../assets/BookCover.jpg')}
                    style={{ maxHeight: '200px', objectFit: 'cover', objectPosition: 'top' }}
                  />
                  <Card.Body>
                    <Card.Title>Book #3</Card.Title>
                    <Card.Subtitle>Author #3</Card.Subtitle>
                    <Card.Text>Other information about the book</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Row md={1} x={1} lg={2} className="g-3">
          <Col>
            <Card className="mt-4 px-3">
              <Card.Body>
                <Row>
                  <h3>Current Fines</h3>
                </Row>
                <Row>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Days Late</th>
                        <th>Total Fine</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Harry Potter</td>
                        <td>Jk rowling</td>
                        <td>8</td>
                        <td className="text-danger">$65.34</td>
                      </tr>
                      <tr>
                        <td>Book Title 2</td>
                        <td>Book Author 2</td>
                        <td>2</td>
                        <td className="text-danger">$25.33</td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-4 px-3">
              <Card.Body>
                <Row>
                  <h3>Upcoming Due-Dates</h3>
                </Row>
                <Row>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Checked Out</th>
                        <th>Due Date</th>
                        <th>Days Left</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Hunger Games</td>
                        <td>Suzanne Collins</td>
                        <td>2/14</td>
                        <td>2/25</td>
                        <td className="text-danger">9</td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
