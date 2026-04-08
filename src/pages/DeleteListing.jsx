import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DeleteListing() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("listings")
      .delete()
      .eq("delete_token", token);

    if (error) {
      alert("Erreur suppression ❌");
      console.error(error);
    } else {
      alert("Annonce supprimée ✅");
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Supprimer l’annonce ?</h2>
      <p>⚠️ Cette action est définitive</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleDelete}
          disabled={loading}
          style={{ marginRight: "10px" }}
        >
          {loading ? "Suppression..." : "Oui supprimer"}
        </button>

        <button onClick={() => navigate("/")}>
          Annuler
        </button>
      </div>
    </div>
  );
}