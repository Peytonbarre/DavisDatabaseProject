import React, { useEffect } from 'react';
import { Button, Card, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function Fines() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('key') === '') {
      navigate('/');
    }
  }, []);

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
                  <th>Author</th>
                  <th>Days Late</th>
                  <th>Total Fine</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Harry Potter</td>
                  <td>Jk rowling</td>
                  <td>8</td>
                  <td className="text-danger">$65.34</td>
                </tr>
                <tr>
                  <td>Book Title 2</td>
                  <td>Book Author 2</td>
                  <td>2</td>
                  <td className="text-danger">$25.33</td>
                </tr>
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
