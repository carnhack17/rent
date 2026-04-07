import { motion } from "framer-motion";

export default function SwipeCard({ data, onSwipe }) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x > 100) onSwipe("right");
        else if (info.offset.x < -100) onSwipe("left");
        else if (info.offset.y < -100) onSwipe("up");
        else if (info.offset.y > 100) onSwipe("down");
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "75vh",
        borderRadius: "24px",
        overflow: "hidden",
        backgroundImage: `url(${data.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      }}
    >
      {/* Overlay sombre */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%)",
        }}
      />

      {/* Contenu */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: "20px",
          color: "white",
        }}
      >
        {/* Prix */}
        <h2 style={{ fontSize: "24px", margin: 0 }}>
          {data.price}
        </h2>

        {/* Type */}
        <p style={{ margin: "5px 0", fontSize: "16px" }}>
          {data.type}
        </p>

        {/* Ville / quartier */}
        <p style={{ margin: "5px 0", opacity: 0.9 }}>
          {data.city} {data.district && `• ${data.district}`}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
          {data.features?.map((f, i) => (
            <span
              key={i}
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "5px 10px",
                borderRadius: "10px",
                fontSize: "12px",
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}