import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Card, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/cardStyling.css';
import { ToastContainer, toast } from 'react-toastify';

interface CurrentLoans {
  title: string;
  author: string;
  isbn: string;
  date_out: string;
  date_in: string;
}

export function Home() {
  const navigate = useNavigate();
  const [currentLoans, setCurrentLoans] = useState<CurrentLoans[]>([]);

  useEffect(() => {
    if (localStorage.getItem('key') === '') {
      navigate('/');
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/book-loans/currentLoans/${localStorage.getItem('key')}`);
      if (response.ok) {
        const data: string[][] = await response.json();
        console.log('Data from server:', data);

        const uniqueLoanList: CurrentLoans[] = filterUniqueBooks(data);
        setCurrentLoans(uniqueLoanList);
      } else {
        console.error('Error getting current loans response');
      }
    } catch (error) {
      console.error('Error fetching current loans: ' + error);
    }
  };

  const filterUniqueBooks = (data: string[][]): CurrentLoans[] => {
    const uniqueBooks: Map<string, CurrentLoans> = new Map();

    data.forEach(([isbn, title, author, date_in, date_out]) => {
      if (!uniqueBooks.has(isbn)) {
        uniqueBooks.set(isbn, { isbn, title, author, date_in, date_out });
      }
    });

    return Array.from(uniqueBooks.values());
  };

  const handleCheckIn = async (loan: CurrentLoans) => {
    try {
      const loanIDRequest = await fetch(
        `/book-loans/getLoanId/${loan.isbn},${localStorage.getItem('key')}`,
      );
      if (loanIDRequest.ok) {
        const loanID = await loanIDRequest.json();
        const response = await fetch(`/book-loans/checkInBook/${loan.isbn},${loanID},0`, {
          method: 'PUT',
        });
        if (response.ok) {
          toast.success('Book checked in');
          window.location.reload();
        } else {
          console.error('Error checking in book');
        }
      } else {
        console.error('Problem getting loan ID');
      }
    } catch (error) {
      console.error('Error getting loanID: ' + error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Container className="mt-4">
        <Row>
          <Col sm={12} className="mt-2">
            <h2>Dashboard</h2>
          </Col>
        </Row>
        {/* <SearchBar onSearch={handleSearch} setSearchTerm={setSearchTerm}/> */}
        {/* <Card className="mt-4">
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
        </Card> */}

        <Card className="mt-4">
          <Card.Body>
            <Row>
              <h3>Current Book Loans</h3>
            </Row>
            <Row md={2} xs={1} lg={3} className="g-3">
              {currentLoans.map((result, index) => (
                <Col>
                  <Card className="hover-shadow" key={index}>
                    <Card.Img
                      variant="top"
                      src={`https://pictures.abebooks.com/isbn/${result.isbn}.jpg`}
                      style={{ maxHeight: '200px', objectFit: 'cover', objectPosition: 'top' }}
                    />
                    <Card.Body>
                      <Card.Title>{result.title}</Card.Title>
                      <Card.Subtitle>{result.author}</Card.Subtitle>
                      <Card.Text>{result.isbn}</Card.Text>
                      <div className="w-100 d-flex">
                        <Button onClick={() => handleCheckIn(result)}>Check-In</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
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
                      {currentLoans.map((result, index) => (
                        <tr key={index}>
                          <td>{result.title}</td>
                          <td>{result.author}</td>
                          <td>{result.date_in}</td>
                          <td>{result.date_out}</td>
                          <td className="text-danger">9</td>
                        </tr>
                      ))}
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
