/* ==========================================================================
   ROAMLY — FAVORITES PAGE
   ========================================================================== */

function initFavoritesPage() {
  const grid = document.querySelector("#favorites-grid");
  if (!grid) return;

  const tabs = document.querySelectorAll(".fav-tab");
  let activeTab = "hotels";

  function render() {
    const favs = getFavorites();
    let items, html;

    if (activeTab === "hotels") {
      items = favs.hotels.map(getHotelById).filter(Boolean);
      html = items.map(hotelCardHTML).join("");
    } else {
      items = favs.destinations.map(getDestinationById).filter(Boolean);
      html = items.map(destinationCardHTML).join("");
    }

    grid.innerHTML = items.length ? html : `
      <div class="empty-state" style="grid-column:1/-1">
        <h3>No favorites yet</h3>
        <p>Start exploring amazing places and tap the heart icon to save them here.</p>
        <a href="${activeTab === "hotels" ? "hotels.html" : "destinations.html"}" class="btn btn-primary" style="margin-top:16px">
          ${activeTab === "hotels" ? "Browse Hotels" : "Browse Destinations"}
        </a>
      </div>`;
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      activeTab = tab.dataset.tab;
      render();
    });
  });

  render();
  initFavoriteButtons();
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-fav-type]")) render();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "favorites") initFavoritesPage();
});
