/* ==========================================================================
   ROAMLY — FILTERS
   Small composable predicate helpers shared by destinations.js and hotels.js
   ========================================================================== */

function filterByRegion(list, region) {
  if (!region || region === "All") return list;
  return list.filter(d => d.region === region);
}

function filterByPriceMax(list, max, priceField = "price") {
  if (!max) return list;
  return list.filter(item => item[priceField] <= Number(max));
}

function filterByMinRating(list, min) {
  if (!min) return list;
  return list.filter(item => item.rating >= Number(min));
}

function filterByAmenities(list, selectedAmenities) {
  if (!selectedAmenities || selectedAmenities.length === 0) return list;
  return list.filter(hotel => selectedAmenities.every(a => hotel.amenities.includes(a)));
}

function sortHotels(list, sortBy) {
  const sorted = [...list];
  switch (sortBy) {
    case "price-asc": return sorted.sort((a, b) => a.price - b.price);
    case "price-desc": return sorted.sort((a, b) => b.price - a.price);
    case "rating-desc": return sorted.sort((a, b) => b.rating - a.rating);
    default: return sorted;
  }
}
