import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DeleteListing() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteItem = async () => {
      await supabase
        .from("listings")
        .delete()
        .eq("delete_token", token);

      alert("Annonce supprimée ✅");
      navigate("/");
    };

    deleteItem();
  }, [token]);

  return <p style={{ textAlign: "center" }}>Suppression...</p>;
}