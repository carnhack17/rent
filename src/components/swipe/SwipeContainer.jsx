import React from "react";
import { filterListings } from "../lib/filterListings";

const filtered = filterListings(listings, filters);
export default function SwipeContainer({ listings = [] }) {
  return (
    <div className="swipe-container" style={{ minHeight: "100vh" }}>
      {/* Ici on intégrera React-Tinder-Card pour swiper les logements */}
      {listings.length ? (
        listings.map((l) => (
          <div
            key={l.id}
            className="swipe-card"
            style={{
              backgroundImage: `url(${l.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "80vh",
              margin: "0 auto 20px",
              borderRadius: "10px",
            }}
          >
            <div className="card-info">
              <h3>{l.type}</h3>
              <p>{l.price}</p>
              <p>{l.city}{l.district && ` - ${l.district}`}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Aucune annonce trouvée</p>
      )}
    </div>
  );
}