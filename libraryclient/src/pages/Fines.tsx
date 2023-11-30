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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [validCardID, setValidCardID] = useState('');

  useEffect(() => {

    displayFines();
  }, [currentDate]);

  const increaseDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const decreaseDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const displayFines = async () => {
    try {
      if(validCardID !== ''){
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
                  const dueDate = new Date(loanData[0][1]);
                  const currentDateClone = new Date(currentDate);
                  const isOverdue = currentDateClone > dueDate;
                  const timeDifference = isOverdue
                    ? getDaysDifference(dueDate, currentDateClone)
                    : 0;
                  return {
                    title: loanData[0][0],
                    days_late: String(timeDifference-1),
                    fineAmt: String(0.25*(timeDifference-1)),
                    // fineAmt: String(parseFloat(loanData[0][2] + 0.25*timeDifference)),
                  };
                }
                return null;
              }),
            )
          ).filter((fine): fine is CurrentFines => fine !== null);
          setCurrentFines(finesArray);
        }
      }else{
        const response = await fetch(`/fines/activeFines`);
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
                  const dueDate = new Date(loanData[0][1]);
                  const currentDateClone = new Date(currentDate);
                  const isOverdue = currentDateClone > dueDate;
                  const timeDifference = isOverdue
                    ? getDaysDifference(dueDate, currentDateClone)
                    : 0;
                  return {
                    title: loanData[0][0],
                    days_late: String(timeDifference-1),
                    fineAmt: String(0.25*(timeDifference-1)),
                    // fineAmt: String(parseFloat(loanData[0][2] + 0.25*timeDifference)),
                  };
                }
                return null;
              }),
            )
          ).filter((fine): fine is CurrentFines => fine !== null);
          setCurrentFines(finesArray);
        }
      }
    } catch (error) {
      console.error('Error displaying fines: ' + error);
    }
  };

  function getDaysDifference(date1: Date, date2: Date) {
    const oneDay = 24 * 60 * 60 * 1000; 
    const utcDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utcDate2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const timeDifference = utcDate2 - utcDate1;
    const daysDifference = Math.floor(timeDifference / oneDay);
  
    return daysDifference;
  }

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
      <div className="d-flex align-items-center justify-content-center mt-2">
        <Button variant="primary" size="sm" className="mt-3 me-3" onClick={decreaseDate}>
          Prev Day
        </Button>
        <h5 className="mt-3 me-3 mb-0">{currentDate.toDateString()}</h5>
        <Button variant="primary" size="sm" className="mt-3" onClick={increaseDate}>
          Next Day
        </Button>
      </div>
    </div>
  );
}
