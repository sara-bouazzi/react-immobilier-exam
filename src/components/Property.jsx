import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useEvaluationStore from "../store/useEvaluationStore";


function Property({ property }) {
  const navigate = useNavigate();

  const [showEval, setShowEval] = useState(false);

  const [note, setNote] = useState(1);

const { addEvaluation } = useEvaluationStore();

const handleEval = () => {
  addEvaluation(property.id, note);
};




  const handleReserve = async () => {
    // 1. Incrémenter les vues côté JSON Server
    await fetch(`http://localhost:3001/properties/${property.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        views: property.views + 1
      }),
    });

    // 2. Rediriger vers la page de réservation avec les données à jour
    navigate("/reserve", { state: { property: { ...property, views: property.views + 1 } } });
  };

  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <h4>{property.title}</h4>
      <p>Prix : {property.price} DT</p>
      <p>Disponible : {property.available ? "Oui" : "Non"}</p>
      <p>Vues : {property.views}</p>

      {property.available && (
        <button onClick={handleReserve}>Réserver la propriété</button>
      )}

      <button onClick={() => setShowEval(!showEval)}>
        Ajouter une évaluation  
    </button>


    {showEval && (
  <div>
    <select value={note} onChange={(e) => setNote(Number(e.target.value))}>
      {[1, 2, 3, 4, 5].map((n) => (
        <option key={n} value={n}>{n}</option>
      ))}
    </select>
    <button onClick={handleEval}>Valider</button>
  </div>
)}


    </div>
  );
}

export default Property;
