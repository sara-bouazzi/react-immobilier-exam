// src/components/Properties.jsx
import React, { useEffect, useState } from "react";
import Property from "./Property";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  // Filtrer les propriétés par prix
  const filteredProperties = properties.filter((p) => {
    const price = p.price;
    return (
      (!min || price >= parseInt(min)) &&
      (!max || price <= parseInt(max))
    );
  });

  return (
    <div>
      <h2>Liste des Propriétés</h2>
      
      {/* Formulaire de recherche */}
      <div>
        <input
          type="number"
          placeholder="Prix min"
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prix max"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
      </div>
      
      {filteredProperties.map((property) => (
        <Property key={property.id} property={property} />
      ))}
    </div>
  );
}

export default Properties;
