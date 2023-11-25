import React, { useState, useEffect } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    bname: '',
    ssn: '',
  });

  useEffect(() => {
    const URLdata = new URLSearchParams(location.search);
    const parameters = Object.fromEntries(URLdata.entries());
    if(parameters.bname && parameters.ssn) {
      setFormData({
        bname: parameters.bname,
        ssn: parameters.ssn,
      });
    }
  }, [location.search]);

  const handleInput = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    if (name === 'ssn') {
      setFormData({ ...formData, [name]: handleSsnInput(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSsnInput = (value: string) => {
    const Ssn = value.replace(/\D/g, '');
    const formattedSsn = Ssn.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
    return formattedSsn;
  };

  const handleSignin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/borrowerLogin/${formData.bname},${formData.ssn}`,
      );
      if (response.ok) {
        console.log('login success');
        const data = await response.json();
        localStorage.setItem('key', data);
        navigate('/home');
      } else {
        console.log('login failed');
      }
    } catch (error) {
      console.error('login error: ' + error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="align-items-center mb-5" style={{ width: '20rem', borderRadius: '20px' }}>
        <h2 className="mb-5 mt-5 text-left" style={{ fontWeight: '700' }}>
          Log In
        </h2>
        <Form>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              name="bname"
              value={formData.bname}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSsn">
            <Form.Label>SSN</Form.Label>
            <Form.Control
              type="text"
              placeholder="111-11-1111"
              name="ssn"
              value={formData.ssn}
              onChange={handleInput}
            />
          </Form.Group>
          <div className="d-grid gap-2 mb-5 mt-5">
            <Button onClick={handleSignin} variant="primary" type="submit">
              Log In!
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
