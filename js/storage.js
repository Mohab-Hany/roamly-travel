/* ==========================================================================
   ROAMLY — STORAGE
   Thin wrapper around localStorage so every other module reads/writes
   through one consistent, JSON-safe API.
   ========================================================================== */

const STORAGE_KEYS = {
  FAVORITES: "roamly_favorites",
  BOOKINGS: "roamly_bookings",
  PROFILE: "roamly_profile",
  DRAFT_BOOKING: "roamly_draft_booking"
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn("Roamly storage read failed for", key, e);
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Roamly storage write failed for", key, e);
  }
}

/* ---------- Favorites ----------
   Shape: { hotels: ["h1","h2"], destinations: ["paris"] } */
function getFavorites() {
  return readJSON(STORAGE_KEYS.FAVORITES, { hotels: [], destinations: [] });
}

function saveFavorites(favorites) {
  writeJSON(STORAGE_KEYS.FAVORITES, favorites);
}

function isFavorite(type, id) {
  const favs = getFavorites();
  return favs[type].includes(id);
}

function toggleFavorite(type, id) {
  const favs = getFavorites();
  const idx = favs[type].indexOf(id);
  if (idx > -1) {
    favs[type].splice(idx, 1);
  } else {
    favs[type].push(id);
  }
  saveFavorites(favs);
  return favs[type].includes(id);
}

/* ---------- Bookings ---------- */
function getBookings() {
  return readJSON(STORAGE_KEYS.BOOKINGS, []);
}

function saveBooking(booking) {
  const bookings = getBookings();
  bookings.unshift(booking);
  writeJSON(STORAGE_KEYS.BOOKINGS, bookings);
}

function getBookingById(id) {
  return getBookings().find(b => b.bookingId === id);
}

/* ---------- Draft booking (carries state from hotel-details -> booking page) ---------- */
function saveDraftBooking(draft) {
  writeJSON(STORAGE_KEYS.DRAFT_BOOKING, draft);
}
function getDraftBooking() {
  return readJSON(STORAGE_KEYS.DRAFT_BOOKING, null);
}
function clearDraftBooking() {
  localStorage.removeItem(STORAGE_KEYS.DRAFT_BOOKING);
}

/* ---------- Profile ---------- */
function getProfile() {
  return readJSON(STORAGE_KEYS.PROFILE, {
    firstName: "Mohab",
    lastName: "Hany",
    email: "mohab@email.com",
    phone: "+20 100 000 0000",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80"
  });
}

function saveProfile(profile) {
  writeJSON(STORAGE_KEYS.PROFILE, profile);
}
