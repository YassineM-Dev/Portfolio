/**
 * Shared Client Reviews Store — Yassine Portfolio
 * Persists all review additions, edits, and deletions reliably across
 * index.html and reviews.html via localStorage (plus optional Firestore sync).
 */
(function () {
  "use strict";

  const STORAGE_KEY = "yassine_portfolio_reviews_v1";
  const STATE_KEY = "yassine_portfolio_reviews_state_v2";

  function readState() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          return {
            items: Array.isArray(parsed.items) ? parsed.items : [],
            deletedIds: Array.isArray(parsed.deletedIds) ? parsed.deletedIds : [],
          };
        }
      }
      // Migrate smoothly from v1 storage if present
      const legacyRaw = localStorage.getItem(STORAGE_KEY);
      if (legacyRaw) {
        const legacy = JSON.parse(legacyRaw);
        if (Array.isArray(legacy)) {
          const migrated = { items: legacy, deletedIds: [] };
          writeState(migrated);
          return migrated;
        }
      }
    } catch (e) {}
    return { items: [], deletedIds: [] };
  }

  function writeState(state) {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      return true;
    } catch (e) {
      return false;
    }
  }

  function normalizeReview(item, owned) {
    const rating = Math.min(5, Math.max(1, Math.round(Number(item.rating) || 0)));
    return {
      id: String(item.id || `rev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
      name: String(item.name || "").trim(),
      service: String(item.service || "").trim(),
      rating: rating,
      comment: String(item.comment || "").trim(),
      date: String(item.date || new Date().toISOString().slice(0, 10)),
      updatedAt: item.updatedAt ? String(item.updatedAt) : "",
      isLocal: typeof item.isLocal === "boolean" ? item.isLocal : Boolean(owned),
    };
  }

  function getAll() {
    const state = readState();
    const deleted = new Set(state.deletedIds);
    const localMap = new Map();
    const merged = [];

    state.items
      .map((item) => normalizeReview(item, true))
      .filter((r) => r.name && r.comment && !deleted.has(r.id))
      .forEach((r) => {
        localMap.set(r.id, r);
        merged.push(r);
      });

    const seedItems =
      window.PORTFOLIO_DATA && Array.isArray(window.PORTFOLIO_DATA.reviews)
        ? window.PORTFOLIO_DATA.reviews
            .map((item) => normalizeReview(item, false))
            .filter((r) => r.name && r.comment)
        : [];

    seedItems.forEach((seed) => {
      if (!deleted.has(seed.id) && !localMap.has(seed.id)) {
        merged.push(seed);
      }
    });

    return merged;
  }

  function getById(id) {
    return getAll().find((r) => r.id === id) || null;
  }

  function add(entry) {
    const rating = Math.round(Number(entry.rating));
    const name = String(entry.name || "").trim();
    const comment = String(entry.comment || "").trim();
    const service = String(entry.service || "").trim();

    if (!name || !comment || !(rating >= 1 && rating <= 5)) {
      return null;
    }

    const review = normalizeReview(
      {
        id: `rev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: name,
        service: service,
        rating: rating,
        comment: comment,
        date: new Date().toISOString().slice(0, 10),
        isLocal: true,
      },
      true
    );

    const state = readState();
    state.deletedIds = state.deletedIds.filter((d) => d !== review.id);
    state.items.unshift(review);
    writeState(state);
    return review;
  }

  function update(id, changes) {
    if (!id) return null;
    const existing = getById(id);
    if (!existing) return null;

    const rating = Math.round(Number(changes.rating));
    const name = String(changes.name || "").trim();
    const comment = String(changes.comment || "").trim();
    const service = String(changes.service || "").trim();

    if (!name || !comment || !(rating >= 1 && rating <= 5)) {
      return null;
    }

    const updated = normalizeReview(
      {
        ...existing,
        name: name,
        service: service,
        rating: rating,
        comment: comment,
        updatedAt: new Date().toISOString().slice(0, 10),
        isLocal: true,
      },
      true
    );

    const state = readState();
    const idx = state.items.findIndex((r) => r.id === id);
    if (idx >= 0) {
      state.items[idx] = updated;
    } else {
      state.items.unshift(updated);
    }
    state.deletedIds = state.deletedIds.filter((d) => d !== id);
    writeState(state);
    return updated;
  }

  function remove(id) {
    if (!id) return false;
    const state = readState();
    state.items = state.items.filter((r) => r.id !== id);
    if (!state.deletedIds.includes(id)) {
      state.deletedIds.push(id);
    }
    return writeState(state);
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
    STATE_KEY,
    STORAGE_KEY,
    getAll,
    getById,
    add,
    update,
    remove,
    getStats,
    starIcon,
    renderStars,
  };
})();
