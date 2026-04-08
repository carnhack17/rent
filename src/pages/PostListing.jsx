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

  // 🔥 Upload Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);

    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.whatsapp) return alert("WhatsApp obligatoire");
    if (!images.length) return alert("Ajoute au moins une image");

    // 🔥 OUVRIR WhatsApp AVANT async
    const waWindow = window.open("", "_blank");

    try {
      const uploadedImages = await Promise.all(images.map(uploadImage));

      const deleteToken = Math.random().toString(36).substring(2, 12);

      // 🔥 INSERT SUPABASE
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/listings`, {
        method: "POST",
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
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

      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      // 🔥 LIENS
      const deleteUrl = `https://rent-nine-taupe.vercel.app/delete/${deleteToken}`;

      const message = encodeURIComponent(
        `Bonjour 👋\n\nTon annonce est en ligne ✅\n\n🗑 Supprimer : ${deleteUrl}\n\n⚠️ Ne partage pas ce lien`
      );

      const phone = form.whatsapp.replace(/\D/g, "");

const waLink = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;

// 🔥 REDIRECTION vers WhatsApp
waWindow.location.href = waLink;

alert("Annonce publiée 🎉");

      navigate("/");

    } catch (err) {
      console.error(err);
      waWindow.close();
      alert("Erreur : " + err.message);
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
          <option value="">Type</option>
          <option>Appartement</option>
          <option>Studio</option>
          <option>Maison</option>
        </select>

        <select name="city" onChange={handleChange} required>
          <option value="">Ville</option>
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>

        <input name="district" placeholder="Quartier" onChange={handleChange} />

        <input type="number" name="price" placeholder="Prix" onChange={handleChange} required />

        <select name="duration" onChange={handleChange}>
          <option value="mois">/mois</option>
          <option value="jour">/jour</option>
        </select>

        <input type="number" name="rooms" min={1} placeholder="Pièces" onChange={handleChange} />

        <input name="whatsapp" placeholder="WhatsApp" onChange={handleChange} required />

        <label className="file-input">
          📸 Images
          <input type="file" multiple onChange={handleImages} hidden />
        </label>

        <div className="preview">
          {images.map((img, i) => (
            <img key={i} src={URL.createObjectURL(img)} />
          ))}
        </div>

        <button className="submit">Publier</button>
      </form>
    </div>
  );
}