/* ==========================================================================
   ROAMLY — PROFILE PAGE
   ========================================================================== */

function bookingStatus(booking) {
  if (booking.status === "cancelled") return "cancelled";
  return new Date(booking.checkOut) < new Date() ? "completed" : "upcoming";
}

function bookingItemHTML(booking) {
  const status = bookingStatus(booking);
  const labels = { upcoming: "Upcoming", completed: "Completed", cancelled: "Cancelled" };
  return `
    <div class="booking-item">
      <img src="${booking.hotelImage}" alt="${booking.hotelName}">
      <div>
        <h4>${booking.hotelName}</h4>
        <div class="meta">${booking.checkIn} → ${booking.checkOut} · ${booking.location}</div>
      </div>
      <span class="status-pill status-${status}">${labels[status]}</span>
      <a href="confirmation.html?id=${booking.bookingId}" class="btn btn-secondary btn-sm">View</a>
    </div>`;
}

function initProfilePage() {
  const root = document.querySelector("#profile-root");
  if (!root) return;

  const profile = getProfile();
  document.querySelector("#profile-avatar").src = profile.avatar;
  document.querySelector("#profile-name").textContent = `${profile.firstName} ${profile.lastName}`;
  document.querySelector("#profile-email").textContent = profile.email;

  const bookings = getBookings();
  document.querySelector("#stat-trips").textContent = bookings.length;
  document.querySelector("#stat-favorites").textContent = getFavorites().hotels.length + getFavorites().destinations.length;

  const bookingsList = document.querySelector("#bookings-list");
  const tabs = document.querySelectorAll(".bookings-tabs .fav-tab");
  let activeStatus = "upcoming";

  function renderBookings() {
    const filtered = bookings.filter(b => bookingStatus(b) === activeStatus);
    bookingsList.innerHTML = filtered.length
      ? filtered.map(bookingItemHTML).join("")
      : `<div class="empty-state"><h3>No ${activeStatus} trips</h3><p>Bookings you make will show up here.</p></div>`;
  }

  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    activeStatus = tab.dataset.tab;
    renderBookings();
  }));

  renderBookings();

  // Edit profile form
  const form = document.querySelector("#edit-profile-form");
  if (form) {
    form.firstName.value = profile.firstName;
    form.lastName.value = profile.lastName;
    form.email.value = profile.email;
    form.phone.value = profile.phone;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      saveProfile({
        ...profile,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value
      });
      showToast("Profile updated");
      document.querySelector("#profile-name").textContent = `${form.firstName.value} ${form.lastName.value}`;
      document.querySelector("#profile-email").textContent = form.email.value;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "profile") initProfilePage();
});
