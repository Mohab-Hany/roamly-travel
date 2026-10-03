/* ==========================================================================
   ROAMLY — DESTINATIONS PAGE
   ========================================================================== */

function initDestinationsPage() {
  const grid = document.querySelector("#destinations-grid");
  const searchInput = document.querySelector("#destination-search");
  const chips = document.querySelectorAll("[data-region-chip]");
  const meta = document.querySelector("#results-meta");
  if (!grid) return;

  let activeRegion = "All";

  function render() {
    let list = filterByRegion(DESTINATIONS, activeRegion);
    list = filterBySearch(list, searchInput.value, ["name", "country"]);

    grid.innerHTML = list.length
      ? list.map(destinationCardHTML).join("")
      : `<div class="empty-state" style="grid-column:1/-1">
           <h3>No destinations found</h3>
           <p>Try a different search term or region.</p>
         </div>`;

    meta.innerHTML = `Showing <strong>${list.length}</strong> of <strong>${DESTINATIONS.length}</strong> destinations`;
  }

  searchInput.addEventListener("input", render);
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeRegion = chip.dataset.regionChip;
      render();
    });
  });

  const initialSearch = getQueryParam("destination");
  if (initialSearch) searchInput.value = initialSearch;

  render();
  initFavoriteButtons();
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "destinations") initDestinationsPage();
});
