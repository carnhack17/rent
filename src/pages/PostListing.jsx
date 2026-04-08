import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cities } from "../lib/cities";
import clientImg from "../assets/images/louer.jpg";
import "../styles/Form.css";
import { supabase } from "../lib/supabaseClient";

// Génère un token unique pour suppression
const generateToken = () => {
  return Math.random().toString(36).substring(2) + Date.now();
};

// Upload image sur Cloudinary
const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Erreur upload Cloudinary");

  const data = await res.json();
  return data.secure_url;
};

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.whatsapp) return alert("WhatsApp obligatoire");
    if (!images.length) return alert("Ajoute au moins une image");

    try {
      // Upload des images sur Cloudinary
      const uploadedUrls = await Promise.all(images.map(uploadImage));

      // Génération token suppression
      const token = generateToken();

      // Insert dans Supabase
      const { data, error } = await supabase
        .from("listings")
        .insert([{
          type_logement: form.type,
          city: form.city,
          district: form.district,
          price: form.price,
          duration: form.duration,
          rooms: form.rooms,
          whatsapp: form.whatsapp,
          images: uploadedUrls,
          delete_token: token
        }])
        .select();

      if (error) throw error;

      const listingId = data[0].id;
      const viewLink = `${window.location.origin}/listing/${listingId}`;
      const deleteLink = `${window.location.origin}/delete/${token}`;
      const phone = form.whatsapp.replace(/[^\d]/g, "");

      const message = encodeURIComponent(
        `Bonjour 👋\nVotre annonce est en ligne ✅\n\n📌 Voir : ${viewLink}\n🗑 Supprimer : ${deleteLink}\n⚠️ Conservez ce lien en sécurité`
      );

      // Ouvre WhatsApp avec message
      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

      alert("Annonce publiée 🎉");

    } catch (err) {
      console.error(err);
      alert("Erreur lors de la publication");
    }
  };

  return (
    <div className="form-page" style={{ backgroundImage: `url(${clientImg})` }}>
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