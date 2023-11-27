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

interface CurrentFines {
  title: string;
  days_late: string;
  fineAmt: string;
}

export function Home() {
  const navigate = useNavigate();
  const [currentLoans, setCurrentLoans] = useState<CurrentLoans[]>([]);
  const [currentFines, setCurrentFines] = useState<CurrentFines[]>([]);

  useEffect(() => {
    if (localStorage.getItem('key') === '') {
      navigate('/');
    }

    fetchData();
    displayFines();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/book-loans/currentLoans/${localStorage.getItem('key')}`);
      if (response.ok) {
        const data: string[][] = await response.json();
        console.log('Data from server:', data);

        const uniqueLoanList: CurrentLoans[] = filterUniqueBooks(data);
        setCurrentLoans(uniqueLoanList);
        updateFines(uniqueLoanList);
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

  const displayFines = async () => {
    try {
      const response = await fetch(`/fines/activeFines/${localStorage.getItem('key')}`);
      if (response.ok) {
        const finedata: { paid: string; fine_amt: string; loan_id: string }[] =
          await response.json();
        const finesArray: CurrentFines[] = (
          await Promise.all(
            finedata.map(async (fine) => {
              console.log(fine);
              const loanResponse = await fetch(`/book-loans/getBookData/${fine.loan_id}`);
              const loanData: string[][] = await loanResponse.json();
              if (loanResponse.ok) {
                const date = new Date(loanData[0][1]);
                const currentDate = new Date();
                const timeDifference = new Date(Math.abs(date.getTime() - currentDate.getTime()));
                const timeDifference2 = timeDifference.getDate() - 1;
                return {
                  title: loanData[0][0],
                  days_late: String(timeDifference2),
                  fineAmt: loanData[0][2],
                };
              }
              return null;
            }),
          )
        ).filter((fine): fine is CurrentFines => fine !== null);
        setCurrentFines(finesArray);
      }
    } catch (error) {
      console.error('Error displaying fines: ' + error);
    }
  };

  const updateFines = async (data: CurrentLoans[]) => {
    try {
      const reponse = data.map(async (loan) => {
        const loanID = await getLoanID(loan.isbn);
        console.log(loanID);
        const singleResponse = await fetch(`/fines/updateFines/${loanID}`, { method: 'PUT' });
      });
    } catch (error) {
      console.error('error updating fines: ' + error);
    }
  };

  const getLoanID = async (isbn: string) => {
    try {
      const response = await fetch(`/book-loans/getLoanId/${isbn},${localStorage.getItem('key')}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Error getting loanID response');
        return '';
      }
    } catch (error) {
      console.error('error updating fines: ' + error);
      return '';
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
                <Col key={index}>
                  <Card className="hover-shadow">
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
        <Row md={1} x={1} lg={2} className="g-3 mb-5">
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
                        <th>Days Late</th>
                        <th>Total Fine</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentFines.map((fine, index) => (
                        <tr key={index}>
                          <td>{fine.title}</td>
                          <td>{fine.days_late}</td>
                          <td className="text-danger">${fine.fineAmt}</td>
                        </tr>
                      ))}
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
                          <td className="text-danger">0</td>
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
