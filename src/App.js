// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Properties from "./components/Properties";          // Pour la liste des propriétés
import ReservationForm from "./components/ReservationForm";  // Pour le formulaire de réservation

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Agence Immobilière</h1>
        <Routes>
          <Route path="/" element={<Properties />} />
          <Route path="/reserve" element={<ReservationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
