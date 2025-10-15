// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import AccountPage from "./pages/AccountPage";
import FooterPage from "./pages/FooterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/about" element={<div style={{padding:20}}>About page (static)</div>} />
        <Route path="/contact" element={<div style={{padding:20}}>Contact page (static)</div>} />
      </Routes>

      <FooterPage />
    </Router>
  );
}

export default App;
