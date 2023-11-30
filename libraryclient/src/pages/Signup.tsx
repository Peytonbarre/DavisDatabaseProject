import React, { useState } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bname: '',
    address: '',
    ssn: '',
    phone: '',
  });

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    let updatedValue = value;
    if (name === 'phone') {
      updatedValue = value.slice(0, 14);
      setFormData({ ...formData, [name]: formatPhoneNumber(updatedValue) });
    } else if (name === 'ssn') {
      updatedValue = value.slice(0, 11);
      setFormData({ ...formData, [name]: formatSsn(updatedValue) });
    } else {
      setFormData({ ...formData, [name]: updatedValue });
    }
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');
    const formattedPhone = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    return formattedPhone;
  };

  const formatSsn = (value: string) => {
    const Ssn = value.replace(/\D/g, '');
    const formattedSsn = Ssn.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
    return formattedSsn;
  };

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // TODO: Change when proxy
      const response = await fetch('/borrower-sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('signup success');
        const cardIDResponse = await fetch(`/borrowerLogin/${formData.bname},${formData.ssn}`);
        if(cardIDResponse.ok){
          const cardIDData = await cardIDResponse.json();
          toast.success('Borrower added with CardID: ' + cardIDData);
        }
      } else {
        toast.error('Signup Failed!')
      }
    } catch (error) {
      console.error('signup error: ' + error);
    }
  };

  return (
    <>
      <ToastContainer/>
      <Container className="d-flex align-items-center justify-content-center h-100 mt-5">
        <Card className="align-items-center mb-5 mt-5" style={{ width: '20rem', borderRadius: '20px' }}>
          <h2 className="mb-5 mt-5 text-left" style={{ fontWeight: '700' }}>
            Registration
          </h2>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Doe"
                name="bname"
                value={formData.bname}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="800 W. Campbell Road"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSSN">
              <Form.Label>SSN</Form.Label>
              <Form.Control
                type="text"
                placeholder="111-11-1111"
                name="ssn"
                value={formData.ssn}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSSN">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="111-111-1111"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="d-grid gap-2 mb-5 mt-5">
              <Button onClick={handleSignup} variant="primary" type="submit">
                Register!
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </>
  );
}
