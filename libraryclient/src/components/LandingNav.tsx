import React from "react";
import { Navbar as ReactNavBar, Container, Nav} from 'react-bootstrap';

export function LandingNav(){
    return(
        <ReactNavBar className = "bg-white shadow-sm mb-3">
            <Container>
                <ReactNavBar.Brand href="/">
                    <img src= "../book-open.svg" alt="Book icon"></img>   Library System
                </ReactNavBar.Brand>
                <Nav>
                    {/* Change this to single-page */}
                    <Nav.Link href="#team">Our Team</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Container>
        </ReactNavBar>
    )
}