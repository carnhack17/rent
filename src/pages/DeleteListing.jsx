
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

export default function DeleteListing() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deleteListing = async () => {
      const { data, error } = await supabase
        .from("listings")
        .delete()
        .eq("delete_token", token);

      if (error) {
        alert("Erreur suppression");
      } else {
        alert("Annonce supprimée ✅");
      }

      navigate("/");
    };

    deleteListing();
  }, [token]);

  return <p style={{ textAlign: "center" }}>Suppression en cours...</p>;
}