import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { Card, Container, Form } from 'react-bootstrap';

export function Search() {
  return (
    <>
      <SearchBar />
      <Container className="mt-5">
        <Card className='p-3'>
          <div className="d-flex align-items-start">
            <Form.Check aria-label="Checkout book" className="align-self-center"/>
            <Card.Img
              src={require('../assets/BookCover.jpg')}
              style={{ maxWidth: '150px', maxHeight: '300px', objectFit: 'cover', objectPosition: 'top', marginLeft: 16 }}
            ></Card.Img>
            <Card.Body>
              <Card.Title>Book</Card.Title>
              <Card.Subtitle>Author</Card.Subtitle>
              <Card.Text>Some more text</Card.Text>
            </Card.Body>
          </div>
        </Card>
      </Container>
    </>
  );
}
