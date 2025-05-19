// src/components/ReservationForm.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ReservationForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { property } = location.state;

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const duration = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );

    const total = duration * property.price;

    // Marquer la propriété comme non disponible
    fetch(`http://localhost:3001/properties/${property.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ available: false }),
    });

    // Afficher le message
    setMessage(
      `Mr/Mme ${name}, votre réservation pour ${property.title} est confirmée pour un prix de ${total} DT.`
    );

    // Rediriger vers / après 5 secondes
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  return (
    <div>
      <h2>Réservation de : {property.title}</h2>
      {message ? (
        <p>{message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <button type="submit">Valider</button>
        </form>
      )}
    </div>
  );
}

export default ReservationForm;
