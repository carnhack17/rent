import { useState } from "react";
import SwipeCard from "./SwipeCard";
import "../styles/Swipe.css"; // à créer pour plein écran et animations

export default function SwipeContainer({ listings }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    if (currentIndex < listings.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevCard = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSwipe = (direction) => {
    switch (direction) {
      case "up":
        nextCard();
        break;
      case "down":
        prevCard();
        break;
      case "right":
        const whatsapp = listings[currentIndex].whatsapp;
        window.open(`https://wa.me/${whatsapp.replace(/\D/g, "")}`, "_blank");
        break;
      case "left":
        alert("Afficher les autres images du logement");
        break;
      default:
        break;
    }
  };

  return (
    <div className="swipe-container">
      {listings.map((listing, i) => (
        <SwipeCard
          key={listing.id}
          listing={listing}
          visible={i === currentIndex}
          onSwipe={handleSwipe}
        />
      ))}
    </div>
  );
}