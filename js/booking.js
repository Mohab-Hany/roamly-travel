/* ==========================================================================
   ROAMLY — BOOKING & CONFIRMATION PAGES
   ========================================================================== */

function generateBookingId() {
  const num = Math.floor(10000 + Math.random() * 89999);
  return `RM-${num}`;
}

function initBookingPage() {
  const root = document.querySelector("#booking-root");
  if (!root) return;

  const draft = getDraftBooking();
  if (!draft) {
    root.innerHTML = `<div class="empty-state"><h3>No booking in progress</h3><p>Start by choosing a hotel and your dates. <a href="hotels.html">Browse hotels</a>.</p></div>`;
    return;
  }

  const hotel = getHotelById(draft.hotelId);
  if (!hotel) return;

  document.querySelector("#summary-hotel-img").src = hotel.thumb;
  document.querySelector("#summary-hotel-name").textContent = hotel.name;
  document.querySelector("#summary-hotel-location").textContent = hotel.location;
  document.querySelector("#summary-dates").textContent = `${draft.checkIn} → ${draft.checkOut}`;
  document.querySelector("#summary-guests").textContent = `${draft.guests} guest${draft.guests > 1 ? "s" : ""}, ${draft.rooms} room${draft.rooms > 1 ? "s" : ""}`;

  const taxes = Math.round(draft.totalPrice - draft.pricePerNight * draft.nights * draft.rooms);
  document.querySelector("#summary-price-per-night").textContent = `${formatMoney(draft.pricePerNight)} × ${draft.nights} night${draft.nights > 1 ? "s" : ""} × ${draft.rooms} room${draft.rooms > 1 ? "s" : ""}`;
  document.querySelector("#summary-subtotal").textContent = formatMoney(draft.totalPrice - taxes);
  document.querySelector("#summary-taxes").textContent = formatMoney(taxes);
  document.querySelector("#summary-total").textContent = formatMoney(draft.totalPrice);

  const profile = getProfile();
  const form = document.querySelector("#booking-form");
  form.firstName.value = profile.firstName || "";
  form.lastName.value = profile.lastName || "";
  form.email.value = profile.email || "";
  form.phone.value = profile.phone || "";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    ["firstName", "lastName", "email", "phone"].forEach(name => {
      const input = form[name];
      const field = input.closest(".field");
      const filled = input.value.trim().length > 0;
      const emailOk = name !== "email" || /^\S+@\S+\.\S+$/.test(input.value);
      field.classList.toggle("has-error", !filled || !emailOk);
      if (!filled || !emailOk) valid = false;
    });
    if (!valid) { showToast("Please check the highlighted fields"); return; }

    const booking = {
      bookingId: generateBookingId(),
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImage: hotel.thumb,
      location: hotel.location,
      checkIn: draft.checkIn,
      checkOut: draft.checkOut,
      guests: draft.guests,
      rooms: draft.rooms,
      nights: draft.nights,
      totalPrice: draft.totalPrice,
      guestName: `${form.firstName.value} ${form.lastName.value}`,
      email: form.email.value,
      phone: form.phone.value,
      status: "upcoming",
      createdAt: new Date().toISOString()
    };

    saveBooking(booking);
    clearDraftBooking();
    window.location.href = `confirmation.html?id=${booking.bookingId}`;
  });
}

function initConfirmationPage() {
  const root = document.querySelector("#confirmation-root");
  if (!root) return;

  const booking = getBookingById(getQueryParam("id"));
  if (!booking) {
    root.innerHTML = `<div class="empty-state"><h3>Booking not found</h3><p><a href="index.html">Back to home</a></p></div>`;
    return;
  }

  document.querySelector("#confirm-id").textContent = booking.bookingId;
  document.querySelector("#confirm-hotel").textContent = booking.hotelName;
  document.querySelector("#confirm-location").textContent = booking.location;
  document.querySelector("#confirm-dates").textContent = `${booking.checkIn} → ${booking.checkOut} (${booking.nights} nights)`;
  document.querySelector("#confirm-guests").textContent = `${booking.guests} guests, ${booking.rooms} room(s)`;
  document.querySelector("#confirm-total").textContent = formatMoney(booking.totalPrice);
  document.querySelector("#confirm-name").textContent = booking.guestName;
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "booking") initBookingPage();
  if (page === "confirmation") initConfirmationPage();
});
