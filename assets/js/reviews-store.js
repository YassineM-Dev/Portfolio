/**
 * Shared Client Reviews Store — Yassine Portfolio
 * Used by both index.html (app.js) and reviews.html (reviews.js).
 */
(function () {
  "use strict";

  const STORAGE_KEY = "yassine_portfolio_reviews_v1";

  function readLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function writeLocal(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch (e) {
      return false;
    }
  }

  function normalizeReview(item) {
    const rating = Math.min(5, Math.max(1, Math.round(Number(item.rating) || 0)));
    return {
      id: String(item.id || `rev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
      name: String(item.name || "").trim(),
      service: String(item.service || "").trim(),
      rating: rating,
      comment: String(item.comment || "").trim(),
      date: String(item.date || new Date().toISOString().slice(0, 10)),
    };
  }

  function getAll() {
    const localItems = readLocal().map(normalizeReview).filter((r) => r.name && r.comment);
    const seedItems =
      window.PORTFOLIO_DATA && Array.isArray(window.PORTFOLIO_DATA.reviews)
        ? window.PORTFOLIO_DATA.reviews.map(normalizeReview).filter((r) => r.name && r.comment)
        : [];
    const seen = new Set(localItems.map((r) => r.id));
    const merged = [...localItems];
    seedItems.forEach((item) => {
      if (!seen.has(item.id)) merged.push(item);
    });
    return merged;
  }

  function add(entry) {
    const rating = Math.round(Number(entry.rating));
    const name = String(entry.name || "").trim();
    const comment = String(entry.comment || "").trim();
    const service = String(entry.service || "").trim();

    if (!name || !comment || !(rating >= 1 && rating <= 5)) {
      return null;
    }

    const review = normalizeReview({
      id: `rev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: name,
      service: service,
      rating: rating,
      comment: comment,
      date: new Date().toISOString().slice(0, 10),
    });

    const current = readLocal();
    current.unshift(review);
    writeLocal(current);
    return review;
  }

  function getStats(list) {
    const items = Array.isArray(list) ? list : getAll();
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let total = 0;

    items.forEach((r) => {
      const score = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 1)));
      breakdown[score] += 1;
      total += score;
    });

    const count = items.length;
    const average = count > 0 ? total / count : 0;
    return { count, average, breakdown };
  }

  function starIcon(filled, size) {
    const s = size || 15;
    return `<svg class="star-svg ${filled ? "is-filled" : ""}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
  }

  function renderStars(rating, size) {
    const rounded = Math.round(Number(rating) || 0);
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += starIcon(i <= rounded, size || 15);
    }
    return `<span class="stars-row" aria-label="${rounded} out of 5 stars">${html}</span>`;
  }

  window.REVIEWS_STORE = {
    getAll,
    add,
    getStats,
    starIcon,
    renderStars,
  };
})();
