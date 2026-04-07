import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cities } from "../lib/cities";
import clientImg from "../assets/images/chercher.jpg";
import "../styles/Form.css";

export default function SearchRent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    city: "",
    district: "",
    type: "",
    price: "",
    duration: "mois",
    rooms: ""
  });

  const priceOptions = [
    "0-50 000", "50 000-100 000", "100 000-150 000",
    "150 000-200 000", "200 000-250 000", "250 000-300 000",
    "300 000-350 000", "350 000-400 000",
    "400 000-450 000", "450 000-500 000"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Recherche lancée 🔍");

    // 🔥 prochaine étape: navigate("/swipe", { state: form })
  };

  return (
    <div className="form-page" style={{ backgroundImage: `url(${clientImg})` }}>
      <form className="form-card" onSubmit={handleSubmit}>

        <button type="button" onClick={() => navigate(-1)} className="back">
          ← Retour
        </button>

        <h2>Chercher une location</h2>

        <select name="city" onChange={handleChange} required>
          <option value="">Ville</option>
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>

        <input
          name="district"
          placeholder="Ex: Cocody, Yopougon..."
          onChange={handleChange}
        />

        <select name="type" onChange={handleChange}>
          <option value="">Type de logement</option>
          <option>Appartement</option>
          <option>Studio</option>
          <option>Maison</option>
        </select>

        {/* ✅ PRIX PAR TRANCHE */}
        <select name="price" onChange={handleChange}>
          <option value="">Budget</option>
          {priceOptions.map((p) => (
            <option key={p}>
              {p} {form.duration === "jour" ? "/jour" : "/mois"}
            </option>
          ))}
        </select>

        <select name="duration" onChange={handleChange}>
          <option value="mois">Longue durée (/mois)</option>
          <option value="jour">Courte durée (/jour)</option>
        </select>

        <input
          type="number"
          name="rooms"
          placeholder="Nombre de pièces"
          onChange={handleChange}
        />

        <button className="submit">Voir les logements</button>
      </form>
    </div>
  );
}