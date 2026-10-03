/* ==========================================================================
   ROAMLY — DETAILS PAGES (destination-details.html / hotel-details.html)
   ========================================================================== */

function initDestinationDetailsPage() {
  const root = document.querySelector("#destination-detail-root");
  if (!root) return;

  const dest = getDestinationById(getQueryParam("id"));
  if (!dest) {
    root.innerHTML = `<div class="empty-state"><h3>Destination not found</h3><p>It may have been removed. <a href="destinations.html">Browse all destinations</a>.</p></div>`;
    return;
  }

  document.title = `${dest.name}, ${dest.country} — Roamly`;
  document.querySelector("#dest-hero-img").src = dest.heroImage;
  document.querySelector("#dest-hero-img").alt = dest.name;
  document.querySelector("#dest-name").textContent = `${dest.name}, ${dest.country}`;
  document.querySelector("#dest-meta").innerHTML =
    `<span>📍 ${dest.region}</span><span>🏛️ ${dest.places} places to explore</span>`;
  document.querySelector("#dest-description").textContent = dest.description;
  document.querySelector("#dest-best-time").textContent = dest.bestTime;
  document.querySelector("#dest-avg-price").textContent = formatMoney(dest.avgPrice) + " / night avg.";

  document.querySelector("#dest-attractions").innerHTML =
    dest.attractions.map(a => `<span class="chip">${a}</span>`).join("");

  const favBtn = document.querySelector("#dest-fav-btn");
  favBtn.dataset.favType = "destinations";
  favBtn.dataset.favId = dest.id;
  const active = isFavorite("destinations", dest.id);
  favBtn.classList.toggle("is-active", active);
  favBtn.innerHTML = active ? "♥ Saved" : "♡ Save";

  const hotels = getHotelsByDestination(dest.id);
  const hotelsGrid = document.querySelector("#dest-hotels-grid");
  hotelsGrid.innerHTML = hotels.length
    ? hotels.map(hotelCardHTML).join("")
    : `<div class="empty-state" style="grid-column:1/-1"><h3>No hotels listed yet</h3><p>Check back soon for stays in ${dest.name}.</p></div>`;

  initFavoriteButtons();
}

function initHotelDetailsPage() {
  const root = document.querySelector("#hotel-detail-root");
  if (!root) return;

  const hotel = getHotelById(getQueryParam("id"));
  if (!hotel) {
    root.innerHTML = `<div class="empty-state"><h3>Hotel not found</h3><p>It may have been removed. <a href="hotels.html">Browse all hotels</a>.</p></div>`;
    return;
  }

  document.title = `${hotel.name} — Roamly`;
  document.querySelector("#hotel-gallery-main").src = hotel.gallery[0];
  document.querySelector("#hotel-gallery-main").alt = hotel.name;
  const sideImgs = document.querySelectorAll(".gallery__side img");
  sideImgs[0].src = hotel.gallery[1] || hotel.gallery[0];
  sideImgs[1].src = hotel.gallery[2] || hotel.gallery[0];

  document.querySelector("#hotel-name").textContent = hotel.name;
  document.querySelector("#hotel-meta").innerHTML =
    `<span class="rating"><span class="stars">${buildStars(hotel.rating)}</span> ${hotel.rating}</span><span>📍 ${hotel.location}</span>`;
  document.querySelector("#hotel-description").textContent = hotel.description;

  document.querySelector("#hotel-amenities").innerHTML = hotel.amenities.map(a => `
    <div class="amenity-item"><span class="icon">${AMENITY_ICONS[a] || "✓"}</span> ${a}</div>
  `).join("");

  document.querySelector("#hotel-rooms").innerHTML = hotel.rooms.map(r => `
    <div class="room-row">
      <div><h4>${r.name}</h4><p style="margin:0">Up to ${r.capacity} guests</p></div>
      <div class="price">${formatMoney(r.price)}<span style="font-family:var(--font-body);font-size:var(--step-xs);color:var(--color-ink-soft)"> / night</span></div>
    </div>
  `).join("");

  const favBtn = document.querySelector("#hotel-fav-btn");
  favBtn.dataset.favType = "hotels";
  favBtn.dataset.favId = hotel.id;
  const active = isFavorite("hotels", hotel.id);
  favBtn.classList.toggle("is-active", active);
  favBtn.innerHTML = active ? "♥" : "♡";

  initBookingCard(hotel);
  initFavoriteButtons();
}

function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut) - new Date(checkIn);
  return Math.max(0, Math.round(ms / 86400000));
}

function initBookingCard(hotel) {
  const form = document.querySelector("#booking-card-form");
  const checkIn = form.querySelector("#bc-checkin");
  const checkOut = form.querySelector("#bc-checkout");
  const guests = form.querySelector("#bc-guests");
  const rooms = form.querySelector("#bc-rooms");
  const errorMsg = form.querySelector(".error-msg");
  const priceEl = document.querySelector("#bc-price-display");
  const nightsLine = document.querySelector("#bc-nights-line");
  const roomsLine = document.querySelector("#bc-rooms-line");
  const taxesLine = document.querySelector("#bc-taxes-line");
  const totalLine = document.querySelector("#bc-total-line");
  const reserveBtn = document.querySelector("#bc-reserve-btn");

  const today = new Date().toISOString().split("T")[0];
  checkIn.min = today;
  checkOut.min = today;

  priceEl.innerHTML = `${formatMoney(hotel.price)}<span> / night</span>`;

  function updateSummary() {
    const nights = nightsBetween(checkIn.value, checkOut.value);
    const numRooms = Number(rooms.value || 1);
    const subtotal = nights * hotel.price * numRooms;
    const taxes = Math.round(subtotal * 0.1);
    const total = subtotal + taxes;

    let error = "";
    if (checkIn.value && checkOut.value) {
      if (new Date(checkOut.value) <= new Date(checkIn.value)) {
        error = "Check-out must be after check-in.";
      }
    }
    if (checkIn.value && new Date(checkIn.value) < new Date(today)) {
      error = "Check-in date can't be in the past.";
    }

    checkOut.closest(".field")?.classList.toggle("has-error", !!error);
    errorMsg.textContent = error;

    nightsLine.textContent = `${nights} night${nights === 1 ? "" : "s"}`;
    roomsLine.textContent = `${numRooms} room${numRooms > 1 ? "s" : ""}`;
    taxesLine.textContent = formatMoney(taxes);
    totalLine.textContent = formatMoney(total || 0);

    reserveBtn.disabled = !(nights > 0 && !error);
    return { nights, numRooms, subtotal, taxes, total };
  }

  [checkIn, checkOut, guests, rooms].forEach(el => el.addEventListener("input", updateSummary));
  updateSummary();

  reserveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const { nights, numRooms, total } = updateSummary();
    if (!(nights > 0)) { showToast("Please choose valid check-in and check-out dates"); return; }

    saveDraftBooking({
      hotelId: hotel.id,
      checkIn: checkIn.value,
      checkOut: checkOut.value,
      guests: Number(guests.value || 1),
      rooms: numRooms,
      nights,
      pricePerNight: hotel.price,
      totalPrice: total
    });
    window.location.href = "booking.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "destination-details") initDestinationDetailsPage();
  if (page === "hotel-details") initHotelDetailsPage();
});
