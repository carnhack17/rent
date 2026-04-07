import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostListing from "./pages/PostListing";
import SearchRent from "./pages/SearchRent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-listing" element={<PostListing />} />
        <Route path="/search-rent" element={<SearchRent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;