
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientFilter from "../components/filter/ClientFilter";
import { supabase } from "../lib/supabaseClient";

export default function SearchPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFilter = async (filters) => {
    setLoading(true);

    const { city, district, priceRange, duration, type } = filters;
    const [minPrice, maxPrice] = priceRange;

    // 🔹 Requête filtrée Supabase
    let query = supabase.from("listings").select("*").eq("city", city);

    if (district) query = query.ilike("district", `%${district}%`);
    if (type) query = query.eq("type_logement", type);
    if (duration) query = query.eq("duration", duration);
    query = query.gte("price", minPrice).lte("price", maxPrice);

    const { data: listings, error } = await query;

    setLoading(false);

    if (error) {
      console.error(error);
      return alert("Erreur lors de la récupération des annonces");
    }

    // 🔥 Naviguer vers SwipeRent avec les annonces filtrées
    navigate("/swipe", { state: { listings, filters } });
  };

  return (
    <div style={{ padding: "20px" }}>
      {loading ? <p>Chargement...</p> : <ClientFilter onFilter={handleFilter} />}
    </div>
  );
}