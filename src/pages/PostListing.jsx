
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

  // 🔥 Upload sur Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      return data.secure_url;
    } catch (err) {
      console.error("Erreur upload Cloudinary", err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.whatsapp) return alert("WhatsApp obligatoire");
    if (!images.length) return alert("Ajoute au moins une image");

    try {
      // 🔹 Upload de toutes les images
      const uploadedImages = await Promise.all(images.map((img) => uploadImage(img)));

      // 🔹 Création d'un token de suppression aléatoire
      const deleteToken = Math.random().toString(36).substring(2, 12);

      // 🔹 Publication sur Supabase
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/listings`, {
        method: "POST",
        headers: {
          "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation",
        },
        body: JSON.stringify({
          type_logement: form.type,
          city: form.city,
          district: form.district,
          price: Number(form.price),
          duration: form.duration,
          rooms: Number(form.rooms),
          whatsapp: form.whatsapp,
          images: uploadedImages,
          delete_token: deleteToken,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      // 🔹 Génération du lien de suppression
      const deleteUrl = `${window.location.origin}/delete/${deleteToken}`;
      const waMessage = `Ton logement est publié ! Pour supprimer ton annonce si nécessaire : ${deleteUrl}`;
      const waLink = `https://wa.me/${form.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(waMessage)}`;

      // 🔹 Ouvre WhatsApp dans un nouvel onglet
      window.open(waLink, "_blank");

      alert("Annonce publiée 🎉");

      // 🔹 Réinitialiser le formulaire
      setForm({
        type: "",
        city: "",
        district: "",
        price: "",
        duration: "mois",
        rooms: 1,
        whatsapp: "",
      });
      setImages([]);
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la publication : " + err.message);
    }
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