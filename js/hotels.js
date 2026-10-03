/* ==========================================================================
   ROAMLY — HOTELS PAGE
   ========================================================================== */

function hotelRowHTML(hotel) {
  const dest = getDestinationById(hotel.destinationId);
  return `
    <article class="hotel-row" data-hotel-id="${hotel.id}">
      <a href="hotel-details.html?id=${hotel.id}" class="hotel-row__media">
        <img src="${hotel.thumb}" alt="${hotel.name}" loading="lazy">
      </a>
      <div class="hotel-row__info">
        <span class="badge badge-ocean">${dest ? dest.name : ""}</span>
        <h3 style="margin-top:8px"><a href="hotel-details.html?id=${hotel.id}">${hotel.name}</a></h3>
        <p style="margin:0">📍 ${hotel.location}</p>
        <span class="rating"><span class="stars">${buildStars(hotel.rating)}</span> ${hotel.rating}</span>
        <div class="hotel-row__amenities">
          ${hotel.amenities.slice(0, 3).map(a => `<span class="chip">${a}</span>`).join("")}
        </div>
      </div>
      <div class="hotel-row__action">
        <button class="pass-card__fav ${isFavorite("hotels", hotel.id) ? "is-active" : ""}"
                data-fav-type="hotels" data-fav-id="${hotel.id}" aria-label="Save ${hotel.name}"
                style="position:static">${isFavorite("hotels", hotel.id) ? "♥" : "♡"}</button>
        <div class="pass-card__price">${formatMoney(hotel.price)}<span> / night</span></div>
        <a href="hotel-details.html?id=${hotel.id}" class="btn btn-primary btn-sm">View Details</a>
      </div>
    </article>`;
}

function initHotelsPage() {
  const list = document.querySelector("#hotels-list");
  if (!list) return;

  const searchInput = document.querySelector("#hotel-search");
  const priceRange = document.querySelector("#price-range");
  const priceValue = document.querySelector("#price-range-value");
  const ratingInputs = document.querySelectorAll("input[name='min-rating']");
  const amenityInputs = document.querySelectorAll("input[name='amenity']");
  const sortSelect = document.querySelector("#sort-select");
  const meta = document.querySelector("#results-meta");

  function render() {
    let results = HOTELS;

    const destinationQuery = getQueryParam("destination");
    if (destinationQuery) {
      results = filterBySearch(results, destinationQuery, ["location"]);
    }

    results = filterBySearch(results, searchInput.value, ["name", "location"]);
    results = filterByPriceMax(results, priceRange.value);

    const minRating = [...ratingInputs].find(r => r.checked)?.value;
    results = filterByMinRating(results, minRating);

    const selectedAmenities = [...amenityInputs].filter(a => a.checked).map(a => a.value);
    results = filterByAmenities(results, selectedAmenities);

    results = sortHotels(results, sortSelect.value);

    priceValue.textContent = formatMoney(priceRange.value);

    list.innerHTML = results.length
      ? results.map(hotelRowHTML).join("")
      : `<div class="empty-state">
           <h3>No hotels match your filters</h3>
           <p>Try widening your price range or clearing a filter.</p>
         </div>`;

    meta.innerHTML = `<strong>${results.length}</strong> hotels found`;
  }

  [searchInput, priceRange, sortSelect].forEach(el => el.addEventListener("input", render));
  [...ratingInputs, ...amenityInputs].forEach(el => el.addEventListener("change", render));

  const initialSearch = getQueryParam("where") || getQueryParam("destination");
  if (initialSearch) searchInput.value = initialSearch;

  render();
  initFavoriteButtons();
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "hotels") initHotelsPage();
});
