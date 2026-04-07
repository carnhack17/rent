
export function filterListings(listings, filters) {
  let results = [...listings];

  // 📍 Ville
  if (filters.city) {
    results = results.filter(l => l.city === filters.city);
  }

  // 📍 Quartier
  if (filters.district) {
    results = results.filter(l =>
      l.district?.toLowerCase().includes(filters.district.toLowerCase())
    );
  }

  // 🏠 Type
  if (filters.type) {
    results = results.filter(l => l.type === filters.type);
  }

  // 🛏️ Pièces
  if (filters.rooms) {
    results = results.filter(l => l.rooms >= filters.rooms);
  }

  // 💰 PRIX (TRÈS IMPORTANT)
  if (filters.price) {
    const [min, max] = filters.price
      .replaceAll(" ", "")
      .split("-")
      .map(Number);

    results = results.filter(l => l.price >= min && l.price <= max);
  }

  // ⏱️ Durée
  if (filters.duration) {
    results = results.filter(l => l.duration === filters.duration);
  }

  return results;
}