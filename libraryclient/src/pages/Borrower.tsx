import React, { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

interface Borrower {
  name: string;
  ssn: string;
  address: string;
  phone: string;
}

export function Borrower() {
  const [userData, setUserData] = useState<Borrower>();
  const [cardID, setCardID] = useState('');

  useEffect(() => {

  }, []);

  const getUserData = async () => {
    try {
      const response = await fetch(`/borrowerINFO/${cardID}`);
      if (response.ok) {
        const data = await response.json();
        const mappedData: Borrower = {
          name: data.bname,
          ssn: data.ssn,
          address: data.address,
          phone: data.phone,
        };
        setUserData(mappedData);
      } else {
        console.log('Error getting user data response');
      }
    } catch (error) {
      console.error('Error getting user data: ' + error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/checkingID/${cardID}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data) {
          toast.success("User info displayed")
          getUserData()
        } else {
          toast.error("User not found")
        }
      } else {
        console.log('Error getting the response');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardID(event.target.value);
  };

  return (
    <>
    <ToastContainer/>
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Card className="align-items-center" style={{ width: '30rem' }}>
      <Form className="d-flex mt-4">
              <Form.Control
                type="search"
                placeholder="Enter CardID"
                className="me-2 rounded-pill"
                aria-label="Search"
                value={cardID}
                onChange={handleInput}
              />
              <Button className="rounded-pill" variant="outline-success" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
        {/* <div style={{height: '200px', width: '200px', background: 'gray', borderRadius: '200px'}} className="my-5"></div> */}
        <img
          src={require('../assets/profilephoto.jpg')}
          style={{
            height: '200px',
            width: '200px',
            borderRadius: '200px',
            border: '5px solid gray',
          }}
          className="mt-4 mb-4"
        />
        <h2 className="mb-4 text-left" style={{ fontWeight: '700' }}>
          {userData?.name}
        </h2>
        <h5 className="text-left" style={{ fontWeight: '400' }}>
          Address: {userData?.address}
        </h5>
        <h5 className="text-left" style={{ fontWeight: '400' }}>
          Phone: {userData?.phone}
        </h5>
        <h5 className="mb-4 text-left" style={{ fontWeight: '400' }}>
          Ssn: {userData?.ssn}
        </h5>
      </Card>
    </div>
    </>
  );
}
