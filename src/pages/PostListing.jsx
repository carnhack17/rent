import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cities } from "../lib/cities";
import louerImg from "../assets/images/louer.jpg";
import "../styles/Form.css";

export default function PostListing() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    city: "",
    district: "",
    price: "",
    duration: "mois",
    rooms: 1,
    whatsapp: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 6) {
      alert("Maximum 6 images");
      return;
    }
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.whatsapp) return alert("WhatsApp obligatoire");
    if (!images.length) return alert("Ajoute au moins une image");

    console.log({ ...form, images });
    alert("Annonce publiée 🎉");
  };

  return (
    <div className="form-page" style={{ backgroundImage: `url(${louerImg})` }}>
      <form className="form-card" onSubmit={handleSubmit}>

        <button type="button" onClick={() => navigate(-1)} className="back">
          ← Retour
        </button>

        <h2>Louer son bien</h2>

        <select name="type" onChange={handleChange} required>
          <option value="">Type de logement</option>
          <option>Appartement</option>
          <option>Studio</option>
          <option>Maison</option>
        </select>

        <select name="city" onChange={handleChange} required>
          <option value="">Ville</option>
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>

        <input
          name="district"
          placeholder="Ex: Cocody, Yopougon..."
          onChange={handleChange}
        />

        {/* ✅ PRIX LIBRE */}
        <input
          type="number"
          name="price"
          placeholder="Prix (ex: 75000)"
          onChange={handleChange}
          required
        />

        <select name="duration" onChange={handleChange}>
          <option value="mois">Longue durée (/mois)</option>
          <option value="jour">Courte durée (/jour)</option>
        </select>

        <input
          type="number"
          name="rooms"
          min={1}
          placeholder="Nombre de pièces"
          onChange={handleChange}
        />

        <input
          name="whatsapp"
          placeholder="WhatsApp (ex: +225...)"
          pattern="[0-9+ ]+"
          onChange={handleChange}
          required
        />

        {/* ✅ BOUTON IMAGE UX */}
        <label className="file-input">
          📸 Choisir les images
          <input type="file" multiple accept="image/*" onChange={handleImages} hidden />
        </label>

        <p className="hint">1 image minimum, 6 maximum</p>

        <div className="preview">
          {images.map((img, i) => (
            <img key={i} src={URL.createObjectURL(img)} />
          ))}
        </div>

        <button className="submit">Publier mon logement</button>
      </form>
    </div>
  );
}