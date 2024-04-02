// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequestList from "./components/RequestList";
// import RequestForm from "./components/RequestForm";
import About from "./components/About";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RequestList />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
