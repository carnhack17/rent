
import { useState } from "react";

export default function ClientFilter({ onFilter }) {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [duration, setDuration] = useState("mois");
  const [type, setType] = useState("Appartement");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ city, district, priceRange, duration, type });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
      {/* Ville */}
      <input
        type="text"
        placeholder="Ville (obligatoire)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
      />

      {/* Quartier */}
      <input
        type="text"
        placeholder="Quartier (optionnel)"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
      />

      {/* Prix */}
      <select
        value={priceRange.join("-")}
        onChange={(e) =>
          setPriceRange(e.target.value.split("-").map(Number))
        }
        style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
      >
        <option value="0-50000">0 - 50 000</option>
        <option value="50000-100000">50 000 - 100 000</option>
        <option value="100000-150000">100 000 - 150 000</option>
        <option value="150000-200000">150 000 - 200 000</option>
        <option value="200000-250000">200 000 - 250 000</option>
        <option value="250000-300000">250 000 - 300 000</option>
        <option value="300000-350000">300 000 - 350 000</option>
        <option value="350000-400000">350 000 - 400 000</option>
        <option value="400000-450000">400 000 - 450 000</option>
        <option value="450000-500000">450 000 - 500 000</option>
      </select>

      {/* Durée */}
      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
      >
        <option value="jour">Courte durée (/jour)</option>
        <option value="mois">Longue durée (/mois)</option>
      </select>

      {/* Type */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
      >
        <option value="Appartement">Appartement</option>
        <option value="Studio">Studio</option>
        <option value="Maison">Maison</option>
        <option value="Villa">Villa</option>
      </select>

      <button type="submit" style={{ width: "100%", padding: "10px", marginTop: "5px" }}>
        Filtrer
      </button>
    </form>
  );
}