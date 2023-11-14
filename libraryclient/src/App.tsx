import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Fines } from "./pages/Fines";
import { Borrower } from "./pages/Borrower";
import { Search } from "./pages/Search";
import { Landing } from "./pages/Landing";
import { Navbar } from "./components/Navbar";
import { LandingNav } from "./components/LandingNav";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

function App() {
  const location = useLocation();

  const isLandingPage = location.pathname === "/" 
  const isLoginPage = location.pathname === "/login" || "/signup"

  return (
    <div>
      {/* Might need to validate this logic lol */}
      {isLandingPage ? <LandingNav/> : isLoginPage ? <></> : <Navbar/>}
      <Container>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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