import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostListing from "./pages/PostListing";
import SearchRent from "./pages/SearchRent";
import DeleteListing from "./pages/DeleteListing"; // ton fichier existant

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-listing" element={<PostListing />} />
        <Route path="/search-rent" element={<SearchRent />} />
        <Route path="/delete/:token" element={<DeleteListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;