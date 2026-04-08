import { useRef } from "react";
import "../styles/SwipeCard.css";

export default function SwipeCard({ listing, visible, onSwipe }) {
  const cardRef = useRef();

  if (!visible) return null;

  const handleKey = (e) => {
    switch (e.key) {
      case "ArrowUp":
        onSwipe("up");
        break;
      case "ArrowDown":
        onSwipe("down");
        break;
      case "ArrowRight":
        onSwipe("right");
        break;
      case "ArrowLeft":
        onSwipe("left");
        break;
      default:
        break;
    }
  };

  // ✅ La première image du bien en arrière-plan
  const bgImage = listing.images && listing.images.length
    ? listing.images[0]
    : "https://via.placeholder.com/800x600?text=Pas+d'image"; // fallback

  return (
    <div
      className="swipe-card"
      ref={cardRef}
      tabIndex={0}
      onKeyDown={handleKey}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="swipe-overlay">
        <h2>{listing.type_logement}</h2>
        <p>
          {listing.city} {listing.district && `- ${listing.district}`}
        </p>
        <p>
          {listing.price} / {listing.duration}
        </p>
        <p>{listing.rooms} pièces</p>
      </div>

      <div className="swipe-hints">
        <span>⬆ Suivant</span>
        <span>⬇ Précédent</span>
        <span>➡ WhatsApp</span>
        <span>⬅ Plus d'images</span>
      </div>
    </div>
  );
}