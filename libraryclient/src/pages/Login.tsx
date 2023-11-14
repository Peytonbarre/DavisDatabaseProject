import React from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';

export function Login(){
    return(
        <Container className='d-flex align-items-center justify-content-center vh-100'>
            <Card className="align-items-center mb-5" style={{ width: '20rem', borderRadius: '20px' }}>
                    <h2 className="mb-5 mt-5 text-left" style={{fontWeight: '700'}}>Log In</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="John Doe" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>SSN</Form.Label>
                            <Form.Control type="text" placeholder="111-111-1111" />
                        </Form.Group>
                        <div className='d-grid gap-2 mb-5 mt-5'>
                            <Button variant="primary" type="submit">
                                Log In!
                            </Button>
                        </div>
                    </Form>
            </Card>
        </Container>
    );
}