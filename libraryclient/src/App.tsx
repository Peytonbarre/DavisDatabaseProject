import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Fines } from "./pages/Fines";
import { Borrower } from "./pages/Borrower";
import { Search } from "./pages/Search";
import { Navbar } from "./components/Navbar";
import { Signup } from "./pages/Signup";

function App() {
  const location = useLocation();

  return (
    <div>
      <Navbar/>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fines" element={<Fines />} />
          <Route path="/borrower" element={<Borrower />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;