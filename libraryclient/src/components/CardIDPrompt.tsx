import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

interface CardIDPromptProps {
  onClickFunction: (cardID: string) => void;
  triggerToast: () => void;
}

export function CardIDPrompt({ onClickFunction, triggerToast }: CardIDPromptProps) {
  const [cardID, setCardID] = useState('');
  const [invalidID, setInvalidID] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardID(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/checkingID/${cardID}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data) {
            setInvalidID(false);
          onClickFunction(cardID);
          triggerToast();
        } else {
            setInvalidID(true);
            console.log("Try again!");
        }
      } else {
        console.log('Error getting the response');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="position-fixed d-flex align-items-center justify-content-center vh-100"
      style={{
        background: 'rgba(255, 0, 0, 0.5)',
        zIndex: 1000,
      }}
    >
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
        <Card
          className="w-50"
          style={{
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            height: '15%',
          }}
        >
          <Card.Title className="mt-3 ms-3 mb-0">Enter CardID</Card.Title>
          <Card.Body className="mt-1">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search..."
                className="me-2 rounded-pill"
                aria-label="Search"
                value={cardID}
                onChange={handleInput}
              />
              <Button className="rounded-pill" variant="outline-success" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
            {invalidID && (<p className='text-danger mt-2'>Error: Not a valid CardID (Does not exist)</p>)}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
