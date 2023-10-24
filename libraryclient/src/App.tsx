import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Checkout } from "./pages/Checkout";
import { Settings } from "./pages/Settings";
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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;