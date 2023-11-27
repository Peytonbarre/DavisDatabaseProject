import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface CurrentFines {
  title: string;
  days_late: string;
  fineAmt: string;
}

export function Fines() {
  const navigate = useNavigate();
  const [currentFines, setCurrentFines] = useState<CurrentFines[]>([]);

  useEffect(() => {
    if (localStorage.getItem('key') === '') {
      navigate('/');
    }
    displayFines();
  }, []);

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

  return (
    <div>
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
      <Button variant="primary" size="sm" className="mt-3">
        Update
      </Button>
    </div>
  );
}
