import React from 'react';
import { Card, Container, Form } from 'react-bootstrap';

export function Signup(){
    return(
        <Container className='d-flex align-items-center justify-content-center vh-100'>
            <Card className="align-items-center mb-5" style={{ width: '20rem' }}>
                    <h2 className="mb-5 mt-5 text-left" style={{fontWeight: '700'}}>Sign Up</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="John Doe" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="800 W. Campbell Road" />
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
                            <Form.Label>SSN</Form.Label>
                            <Form.Control type="text" placeholder="111-111-1111" />
                        </Form.Group>
                    </Form>
            </Card>
        </Container>
    );
}