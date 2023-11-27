import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Borrower {
  name: string;
  ssn: string;
  address: string;
  phone: string;
}

export function Borrower() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<Borrower>();

  useEffect(() => {
    if (localStorage.getItem('key') === '') {
      navigate('/');
    }

    getUserData();
  }, []);

  const buttonHandler = () => {
    localStorage.setItem('key', '');
    navigate('/');
  };

  const getUserData = async () => {
    try {
      const response = await fetch(`/borrowerINFO/${localStorage.getItem('key')}`);
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

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Card className="align-items-center" style={{ width: '30rem' }}>
        {/* <div style={{height: '200px', width: '200px', background: 'gray', borderRadius: '200px'}} className="my-5"></div> */}
        <img
          src={require('../assets/profilephoto.jpg')}
          style={{
            height: '200px',
            width: '200px',
            borderRadius: '200px',
            border: '5px solid gray',
          }}
          className="mt-5 mb-4"
        />
        <h2 className="mb-4 text-left" style={{ fontWeight: '700' }}>
          {userData?.name}
        </h2>
        <h4 className="text-left" style={{ fontWeight: '400' }}>
          Card-Id: {localStorage.getItem('key')}
        </h4>
        <h5 className="text-left" style={{ fontWeight: '400' }}>
          Address: {userData?.address}
        </h5>
        <h5 className="mb-4 text-left" style={{ fontWeight: '400' }}>
          Phone: {userData?.phone}
        </h5>
        <Button variant="danger" className="mb-5" onClick={buttonHandler}>
          Sign Out
        </Button>
      </Card>
    </div>
  );
}
