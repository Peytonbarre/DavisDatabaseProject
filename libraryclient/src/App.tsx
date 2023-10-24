import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Fines } from "./pages/Fines";
import { Borrower } from "./pages/Borrower";
import { Search } from "./pages/Search";
import { Landing } from "./pages/Landing";
import { Navbar } from "./components/Navbar";

function App() {
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  return (
    <div>
      {isLandingPage ? null : <Navbar />}
      <Container>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/fines" element={<Fines />} />
          <Route path="/borrower" element={<Borrower />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;