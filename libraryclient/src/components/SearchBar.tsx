import React, { ChangeEvent, useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  onSearch: () => void;
  setSearchTerm: (term: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function SearchBar({ onSearch, setSearchTerm, onKeyDown }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    //SE LOGIC
  }, [searchInput]);

  const handleSearch = async () => {
    setSearchTerm(searchInput);
    await onSearch();
  };

  return (
    <Row>
      <Col sm={12}>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search..."
            className="me-2 rounded-pill"
            aria-label="Search"
            value={searchInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
            <Button className="rounded-pill" variant="outline-primary" onClick={handleSearch}>
                Search
            </Button>
        </Form>
      </Col>
    </Row>
  );
}
