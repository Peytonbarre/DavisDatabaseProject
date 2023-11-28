import React from "react";
import { Navbar as ReactNavBar, Container, Nav} from 'react-bootstrap';

export function Navbar(){
    return(
        // TODO Change styling
        <ReactNavBar className = "bg-white shadow-sm mb-3">
            <Container>
                <ReactNavBar.Brand href="/">
                    <img src= "../book-open.svg" alt="Book icon"></img>   Library System
                </ReactNavBar.Brand>
                <Nav>
                    <Nav.Link href="/search">Search</Nav.Link>
                    <Nav.Link href="/fines">Fines</Nav.Link>
                    <Nav.Link href="/Borrower">Borrower</Nav.Link>
                </Nav>
            </Container>
        </ReactNavBar>
    )
}