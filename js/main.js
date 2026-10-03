/* ==========================================================================
   ROAMLY — MAIN
   Shared helpers used by every page: toasts, card templates, formatting,
   and the Home page render (hero search, featured grids, testimonials).
   ========================================================================== */

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function buildStars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function formatMoney(n) {
  return "$" + Number(n).toLocaleString("en-US");
}

function qs(params) {
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* ---------- Card templates ---------- */
function destinationCardHTML(dest) {
  return `
    <article class="pass-card" data-destination-id="${dest.id}">
      <a href="destination-details.html?id=${dest.id}" class="pass-card__media">
        <img src="${dest.thumb}" alt="${dest.name}, ${dest.country}" loading="lazy">
      </a>
      <button class="pass-card__fav ${isFavorite("destinations", dest.id) ? "is-active" : ""}"
              data-fav-type="destinations" data-fav-id="${dest.id}" aria-label="Save ${dest.name} to favorites">
        ${isFavorite("destinations", dest.id) ? "♥" : "♡"}
      </button>
      <div class="pass-card__body">
        <h3><a href="destination-details.html?id=${dest.id}">${dest.name}</a></h3>
        <p style="margin:0">${dest.country}</p>
        <div class="pass-card__perforation"></div>
      </div>
      <div class="pass-card__footer">
        <span class="badge badge-ocean">${dest.places} places</span>
        <a href="destination-details.html?id=${dest.id}" class="btn-ghost">Explore →</a>
      </div>
    </article>`;
}

function hotelCardHTML(hotel) {
  return `
    <article class="pass-card" data-hotel-id="${hotel.id}">
      <a href="hotel-details.html?id=${hotel.id}" class="pass-card__media">
        <img src="${hotel.thumb}" alt="${hotel.name}, ${hotel.location}" loading="lazy">
      </a>
      <button class="pass-card__fav ${isFavorite("hotels", hotel.id) ? "is-active" : ""}"
              data-fav-type="hotels" data-fav-id="${hotel.id}" aria-label="Save ${hotel.name} to favorites">
        ${isFavorite("hotels", hotel.id) ? "♥" : "♡"}
      </button>
      <div class="pass-card__body">
        <h3><a href="hotel-details.html?id=${hotel.id}">${hotel.name}</a></h3>
        <p style="margin:0">📍 ${hotel.location}</p>
        <span class="rating"><span class="stars">${buildStars(hotel.rating)}</span> ${hotel.rating}</span>
        <div class="pass-card__perforation"></div>
      </div>
      <div class="pass-card__footer">
        <div class="pass-card__price">${formatMoney(hotel.price)}<span> / night</span></div>
        <a href="hotel-details.html?id=${hotel.id}" class="btn btn-primary btn-sm">View</a>
      </div>
    </article>`;
}

/* ---------- Favorite button delegation (works on every page) ---------- */
function initFavoriteButtons(root = document) {
  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-fav-type]");
    if (!btn) return;
    const type = btn.dataset.favType;
    const id = btn.dataset.favId;
    const nowActive = toggleFavorite(type, id);
    btn.classList.toggle("is-active", nowActive);
    btn.textContent = nowActive ? "♥" : "♡";
    showToast(nowActive ? "Added to favorites" : "Removed from favorites");
    updateFavoritesBadge();
  });
}

/* ---------- Home page ---------- */
function initHomePage() {
  const destGrid = document.querySelector("#featured-destinations");
  if (destGrid) destGrid.innerHTML = DESTINATIONS.slice(0, 6).map(destinationCardHTML).join("");

  const hotelGrid = document.querySelector("#featured-hotels");
  if (hotelGrid) hotelGrid.innerHTML = HOTELS.slice(0, 4).map(hotelCardHTML).join("");

  const testimonialRow = document.querySelector("#testimonial-row");
  if (testimonialRow) {
    testimonialRow.innerHTML = TESTIMONIALS.map(t => `
      <div class="testimonial">
        <p class="quote">"${t.quote}"</p>
        <div class="testimonial-person">
          <img src="${t.avatar}" alt="${t.name}">
          <div>
            <strong>${t.name}</strong>
            <span>${t.trip}</span>
          </div>
        </div>
      </div>`).join("");
  }

  const heroForm = document.querySelector("#hero-search-form");
  if (heroForm) {
    heroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(heroForm).entries());
      window.location.href = `hotels.html?${qs(data)}`;
    });
  }

  initFavoriteButtons();
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "home") initHomePage();
});
