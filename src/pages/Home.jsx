import { useNavigate } from "react-router-dom";
import louerImg from "../assets/images/louer.jpg";
import chercherImg from "../assets/images/chercher.jpg";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div
        className="home-card"
        style={{ backgroundImage: `url(${louerImg})` }}
        onClick={() => navigate("/post-listing")}
      >
        <h2>Louer son bien</h2>
      </div>
      <div
        className="home-card"
        style={{ backgroundImage: `url(${chercherImg})` }}
        onClick={() => navigate("/search-rent")}
      >
        <h2>Chercher une location</h2>
      </div>
    </div>
  );
}