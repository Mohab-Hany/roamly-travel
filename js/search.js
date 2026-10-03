/* ==========================================================================
   ROAMLY — SEARCH
   Generic, case-insensitive substring search across a list of objects.
   ========================================================================== */

function filterBySearch(list, query, fields) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return list;
  return list.filter(item =>
    fields.some(field => String(item[field] || "").toLowerCase().includes(q))
  );
}
