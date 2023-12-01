import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface CurrentFines {
  card_id: string;
  title: string;
  days_late: string;
  fineAmt: string;
}

interface BorrowerFine {
  card_id: string;
  fineAmt: string;
}

export function Fines() {
  const navigate = useNavigate();
  const [currentFines, setCurrentFines] = useState<CurrentFines[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [validCardID, setValidCardID] = useState('');
  const [borrowerFine, setBorrowerFine] = useState<BorrowerFine[]>([]);

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
      if (validCardID !== '') {
        const response = await fetch(`/fines/activeFines/${localStorage.getItem('key')}`);
        if (response.ok) {
          const finedata: [string, string, string, string][] = await response.json();
          const finesArray: CurrentFines[] = (
            await Promise.all(
              finedata.map(async (fineData) => {
                const [paid, loan_id, fine_amt, card_id] = fineData;
                const loanResponse = await fetch(`/book-loans/getBookData/${loan_id}`);
                const loanData: string[][] = await loanResponse.json();
                if (loanResponse.ok) {
                  const dueDate = new Date(loanData[0][1]);
                  const currentDateClone = new Date(currentDate);
                  const isOverdue = currentDateClone > dueDate;
                  const timeDifference = isOverdue
                    ? getDaysDifference(dueDate, currentDateClone)
                    : 0;

                  return {
                    card_id: card_id,
                    title: loanData[0][0],
                    days_late: String(timeDifference - 1),
                    fineAmt: String(0.25 * (timeDifference - 1)),
                  };
                }
                return null;
              }),
            )
          ).filter((fine): fine is CurrentFines => fine !== null);

          setCurrentFines(finesArray);
        }
      } else {
        const response = await fetch(`/fines/activeFines`);
        if (response.ok) {
          const finedata: [string, string, string, string][] = await response.json();
          const finesArray: CurrentFines[] = (
            await Promise.all(
              finedata.map(async (fineData) => {
                const [paid, loan_id, fine_amt, card_id] = fineData;
                console.log('HERE' + loan_id);
                const loanResponse = await fetch(`/book-loans/getBookData/${loan_id}`);
                const loanData: string[][] = await loanResponse.json();
                if (loanResponse.ok) {
                  const dueDate = new Date(loanData[0][1]);
                  const currentDateClone = new Date(currentDate);
                  const isOverdue = currentDateClone > dueDate;
                  const timeDifference = isOverdue
                    ? getDaysDifference(dueDate, currentDateClone)
                    : 0;

                  return {
                    card_id: card_id,
                    title: loanData[0][0],
                    days_late: String(timeDifference - 1),
                    fineAmt: String(0.25 * (timeDifference - 1)),
                    // fineAmt: String(parseFloat(loanData[0][2] + 0.25 * timeDifference)),
                  };
                }
                return null;
              }),
            )
          ).filter((fine): fine is CurrentFines => fine !== null);
          setCurrentFines(finesArray);
          updateBorrower(finesArray);
        }
      }
    } catch (error) {
      console.error('Error displaying fines: ' + error);
    }
  };

  const updateBorrower = (finesArray: CurrentFines[]) => {
    const summedFinesByCard: { [key: string]: number } = {};

    finesArray.forEach((fine) => {
      const { card_id, fineAmt } = fine;
      const numericFineAmount = parseFloat(fineAmt);
      if (!summedFinesByCard[card_id]) {
        summedFinesByCard[card_id] = numericFineAmount;
      } else {
        summedFinesByCard[card_id] += numericFineAmount;
      }
    });
    const fineSums: BorrowerFine[] = Object.keys(summedFinesByCard).map((card_id) => ({
      card_id,
      fineAmt: String(summedFinesByCard[card_id]),
    }));
    setBorrowerFine(fineSums);
    console.log(borrowerFine);
  };

  function getDaysDifference(date1: Date, date2: Date) {
    const oneDay = 24 * 60 * 60 * 1000;
    const utcDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utcDate2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const timeDifference = utcDate2 - utcDate1;
    const daysDifference = Math.floor(timeDifference / oneDay);

    return daysDifference;
  }

  const payGroupFine = async (Loan_id: string, payment: string) => {
    const response = await fetch(`/payFines/${Loan_id}, ${payment}`, {method: 'PUT'});
    if(response.ok){
      const data = await response.json();
      console.log("PAYMENT: " + data);
    }
  }

  return (
    <div>
      <Card className="mt-4 px-3">
        <Card.Body>
          <Row>
            <h3>Current Fines</h3>
          </Row>
          {borrowerFine.map((borrower, index2) => (
            <Row key={index2}>
              <h4 className="p-0 mt-3">Borrower: {borrower.card_id}</h4>
              <Table striped bordered hover className="mb-0">
                <thead>
                  <tr>
                    <th>Card ID</th>
                    <th>Title</th>
                    <th>Days Late</th>
                    <th>Total Fine</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFines
                    .filter((fine) => {
                      console.log('Fine:', fine);
                      console.log('Borrower ID:', borrower.card_id);
                      return String(fine.card_id) === borrower.card_id;
                    })
                    .map((fine, index) => (
                      <tr key={index}>
                        <td>{fine.card_id}</td>
                        <td>{fine.title}</td>
                        <td>{fine.days_late}</td>
                        <td className="text-danger">${fine.fineAmt}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Button className="mt-0 rounded-0" variant="outline-primary">
                Pay Fines: ${borrower.fineAmt}
              </Button>
            </Row>
          ))}
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
