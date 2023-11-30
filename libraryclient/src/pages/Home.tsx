import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Table,
  Button,
  Form,
  ToggleButton
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/cardStyling.css";
import { ToastContainer, toast } from "react-toastify";

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
  const [checkedIn, setCheckedIn] = useState<{ [isbn: string]: boolean }>({});
  const [currentFines, setCurrentFines] = useState<CurrentFines[]>([]);
  const [cardID, setCardID] = useState("");
  const [validCardID, setValidCardID] = useState("");

  useEffect(() => {
    fetchData();
    displayFines();
  }, []);

  const fetchData = async () => {
    if (validCardID !== "") {
      try {
        const response = await fetch(`/book-loans/currentLoans/${validCardID}`);
        if (response.ok) {
          const data: string[][] = await response.json();
          const uniqueLoanList: CurrentLoans[] = filterUniqueBooks(data);
          setCurrentLoans(uniqueLoanList);
          updateFines(uniqueLoanList);
        } else {
          console.error("Error getting current loans response");
        }
      } catch (error) {
        console.error("Error fetching current loans: " + error);
      }
    } else {
      try {
        const response = await fetch(`/book-loans/allActiveBookLoans`);
        if (response.ok) {
          const data: string[][] = await response.json();
          const uniqueLoanList: CurrentLoans[] = filterUniqueBooks(data);
          setCurrentLoans(uniqueLoanList);
          updateFines(uniqueLoanList);
        } else {
          console.error("Error getting current loans response");
        }
      } catch (error) {
        console.error("Error fetching current loans: " + error);
      }
    }
  };

  const filterUniqueBooks = (data: string[][]): CurrentLoans[] => {
    const uniqueBooks: Map<string, CurrentLoans> = new Map();
    data.forEach(([isbn, title, author, date_in, date_out]) => {
      if (!uniqueBooks.has(isbn)) {
        uniqueBooks.set(isbn, {
          isbn,
          title,
          author,
          date_in,
          date_out,
        });
      }
    });
    return Array.from(uniqueBooks.values());
  };

  const handleCheckIn = async (loan: CurrentLoans) => {
    if (validCardID !== "") {
      try {
        const loanIDRequest = await fetch(
          `/book-loans/getLoanId/${loan.isbn},${validCardID}`
        );
        if (loanIDRequest.ok) {
          const loanID = await loanIDRequest.json();
          const response = await fetch(
            `/book-loans/checkInBook/${loan.isbn},${loanID},0`,
            {
              method: "PUT",
            }
          );
          if (response.ok) {
            toast.success("Book checked in");
            window.location.reload();
          } else {
            console.error("Error checking in book");
          }
        } else {
          console.error("Problem getting loan ID");
        }
      } catch (error) {
        console.error("Error getting loanID: " + error);
      }
    } else {
      try {
        const loanIDRequest = await fetch(`/book-loans/allActiveBookLoans`);
        if (loanIDRequest.ok) {
          const loanID = await loanIDRequest.json();
          const response = await fetch(
            `/book-loans/checkInBook/${loan.isbn},${loanID},125`,
            {
              method: "PUT",
            }
          );
          if (response.ok) {
            toast.success("Book checked in");
            window.location.reload();
          } else {
            console.error("Error checking in book");
          }
        } else {
          console.error("Problem getting loan ID");
        }
      } catch (error) {
        console.error("Error getting loanID: " + error);
      }
    }
  };

  const displayFines = async () => {
    if (validCardID !== "") {
      try {
        const response = await fetch(`/fines/activeFines/${validCardID}`);
        if (response.ok) {
          const finedata: {
            paid: string;
            fine_amt: string;
            loan_id: string;
          }[] = await response.json();
          const finesArray: CurrentFines[] = (
            await Promise.all(
              finedata.map(async (fine) => {
                const loanResponse = await fetch(
                  `/book-loans/getBookData/${fine.loan_id}`
                );
                const loanData: string[][] = await loanResponse.json();
                if (loanResponse.ok) {
                  const date = new Date(loanData[0][1]);
                  const currentDate = new Date();
                  const timeDifference = new Date(
                    Math.abs(date.getTime() - currentDate.getTime())
                  );
                  const timeDifference2 = timeDifference.getDate() - 1;
                  return {
                    title: loanData[0][0],
                    days_late: String(timeDifference2),
                    fineAmt: loanData[0][2],
                  };
                }
                return null;
              })
            )
          ).filter((fine): fine is CurrentFines => fine !== null);
          setCurrentFines(finesArray);
        }
      } catch (error) {
        console.error("Error displaying fines: " + error);
      }
    } else {
      try {
        const response = await fetch(`/fines/activeFines`);
        if (response.ok) {
          const finedata: {
            paid: string;
            fine_amt: string;
            loan_id: string;
          }[] = await response.json();
          const finesArray: CurrentFines[] = (
            await Promise.all(
              finedata.map(async (fine) => {
                const loanResponse = await fetch(
                  `/book-loans/getBookData/${fine.loan_id}`
                );
                const loanData: string[][] = await loanResponse.json();
                if (loanResponse.ok) {
                  const date = new Date(loanData[0][1]);
                  const currentDate = new Date();
                  const timeDifference = new Date(
                    Math.abs(date.getTime() - currentDate.getTime())
                  );
                  const timeDifference2 = timeDifference.getDate() - 1;
                  return {
                    title: loanData[0][0],
                    days_late: String(timeDifference2),
                    fineAmt: loanData[0][2],
                  };
                }
                return null;
              })
            )
          ).filter((fine): fine is CurrentFines => fine !== null);
          setCurrentFines(finesArray);
        }
      } catch (error) {
        console.error("Error displaying fines: " + error);
      }
    }
  };

  const updateFines = async (data: CurrentLoans[]) => {
    try {
      const reponse = data.map(async (loan) => {
        const loanID = await getLoanID(loan.isbn);
        const singleResponse = await fetch(`/fines/updateFines/${loanID}`, {
          method: "PUT",
        });
      });
    } catch (error) {
      console.error("error updating fines: " + error);
    }
  };

  const getLoanID = async (isbn: string) => {
    try {
      if (validCardID !== "") {
        const response = await fetch(
          `/book-loans/getLoanId/${isbn},${validCardID}`
        );
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error("Error getting loanID response");
          return "";
        }
      } else {
        const response = await fetch(
          `/book-loans/getLoanIdAll/${isbn}`
        );
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error("Error getting loanID response");
          return "";
        }
      }
    } catch (error) {
      console.error("error updating fines: " + error);
      return "";
    }
  };

  const handleCardIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardID(event.target.value);
  };

  const handleSubmitCardID = async () => {
    try {
      const response = await fetch(`/checkingID/${cardID}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          toast.success("User info displayed");
          setValidCardID(cardID);
          fetchData();
          displayFines();
        } else {
          toast.error("User not found");
        }
      } else {
        console.log("Error getting the response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (isbn: string) => {
    setCheckedIn((prev) => ({ ...prev, [isbn]: !prev[isbn] }));
  };

  const handleCheckInButton = async () => {
    try {
      const checkedInBooks = Object.keys(checkedIn).filter((isbn) => checkedIn[isbn]);
      if (checkedInBooks.length === 0) {
        toast.warning('No books selected');
        return;
      } else {
        await Promise.all(
          checkedInBooks.map(async (isbn) => {
            const loanIDResponse = await fetch(`/book-loans/getLoanIdAll/${isbn}`)
            if(loanIDResponse.ok){
              const loanID = await loanIDResponse.json();
              const response = await fetch(
                `/book-loans/checkInBook/${isbn},${loanID}`,
                {
                  method: 'PUT',
                },
              );
              if (response.ok) {
                setCheckedIn((prev) => ({ ...prev, [isbn]: false }));
              } else {
                console.error('Error checking out book');
              }
            }
          }),
        );
        await fetchData();
        await displayFines();
        await new Promise((resolve) => {
          toast.success('Books have been checked in', {
            onClose: resolve,
          });
        });
      }
    } catch (error) {
      console.error('Error checking out: ' + error);
    }
  }

  return (
    <>
      <ToastContainer />
      <Container className="mt-4">
        <Row>
          <Col sm={12} className="mt-2">
            <h2>Dashboard</h2>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm={12}>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Filter by CardID..."
                className="me-2 rounded-pill"
                aria-label="Search"
                value={cardID}
                onChange={handleCardIDChange}
              />
              <Button
                className="rounded-pill"
                variant="outline-primary"
                onClick={handleSubmitCardID}
              >
                Filter
              </Button>
            </Form>
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
            <Row className="mb-3">
              <Col md='auto'>
                <h3>Current Book Loans</h3>
              </Col>
              <Col>
                <Button variant="success" onClick={handleCheckInButton}>Check-In Cart</Button>
              </Col>
            </Row>
            <Row md={2} xs={1} lg={3} className="g-3">
              {currentLoans.map((result, index) => (
                <Col key={index}>
                  <Card className="hover-shadow">
                    <Card.Img
                      variant="top"
                      src={`https://pictures.abebooks.com/isbn/${result.isbn}.jpg`}
                      style={{
                        maxHeight: "200px",
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{result.title}</Card.Title>
                      <Card.Subtitle>{result.author}</Card.Subtitle>
                      <Card.Text>{result.isbn}</Card.Text>
                      <div className="w-100 d-flex">
                        <Button className='me-3' onClick={() => handleCheckIn(result)}>
                          Check-In
                        </Button>
                        <ToggleButton
                          id={`toggle-check-${result.isbn}`}
                          type="checkbox"
                          variant="outline-success"
                          value={checkedIn[result.isbn] ? '1' : (undefined as unknown as string)}
                          checked={checkedIn[result.isbn]}
                          onChange={() => handleAddToCart(result.isbn)}
                        >
                          {checkedIn[result.isbn] ? 'Added to Cart' : 'Add to Cart'}
                        </ToggleButton>
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
