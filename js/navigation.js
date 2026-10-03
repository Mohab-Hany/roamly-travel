/* ==========================================================================
   ROAMLY — NAVIGATION
   Runs on every page: mobile menu, active-link state, favorites badge.
   ========================================================================== */

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => links.classList.remove("is-open"))
    );
  }

  // Highlight the current page in the nav
  const current = document.body.dataset.page;
  document.querySelectorAll(".nav-links a[data-page]").forEach(a => {
    a.classList.toggle("is-active", a.dataset.page === current);
  });

  updateFavoritesBadge();
}

function updateFavoritesBadge() {
  const favs = getFavorites();
  const total = favs.hotels.length + favs.destinations.length;
  document.querySelectorAll("[data-favorites-count]").forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? "flex" : "none";
  });
}

document.addEventListener("DOMContentLoaded", initNavigation);
