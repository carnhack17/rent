
import { useLocation } from "react-router-dom";
import SwipeContainer from "../components/swipe/SwipeContainer";

export default function SwipeRent() {
  const location = useLocation();
  const { listings } = location.state || { listings: [] };

  if (!listings.length) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Aucune annonce trouvée.</p>;
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <SwipeContainer listings={listings} />
    </div>
  );
}