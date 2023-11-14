import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export function Borrower() {
    return(
        <div className="d-flex justify-content-center align-items-center mt-5">
            <Card className="align-items-center" style={{ width: '30rem' }}>
                {/* <div style={{height: '200px', width: '200px', background: 'gray', borderRadius: '200px'}} className="my-5"></div> */}
                <img src={require('../assets/profilephoto.jpg')} style={{height: '200px', width: '200px', borderRadius: '200px', border: "5px solid gray"}} className="mt-5 mb-4"/>
                <h2 className="mb-4 text-left" style={{fontWeight: '700'}}>Example Name</h2>
                <h4 className="text-left" style={{fontWeight: '400'}}>Card ID: 100923</h4>
                <h4 className="text-left" style={{fontWeight: '400'}}>Ssn: 104-213-1452</h4>
                <h5 className="text-left" style={{fontWeight: '400'}}>Address: 28123 Birdview Lane</h5>
                <h5 className="mb-5 text-left" style={{fontWeight: '400'}}>Phone: 104-213-1452</h5>
            </Card>
        </div>
    );
}