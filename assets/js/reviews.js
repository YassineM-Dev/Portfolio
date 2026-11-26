(function () {
  "use strict";

  const DATA = window.PORTFOLIO_DATA;
  const STORE = window.REVIEWS_STORE;
  if (!DATA || !STORE) return;

  const UI_STRINGS = {
    en: {
      "reviewsPage.pageTitle": "Client Reviews — Yassine",
      "reviewsPage.back": "Back to Portfolio",
      "reviewsPage.kicker": "Client Feedback",
      "reviewsPage.title": "All Client Reviews",
      "reviewsPage.leaveBtn": "Leave a Review",
      "reviewsPage.editTitle": "Edit Review",
      "reviewsPage.ratingLabel": "Rating (1 to 5 stars)",
      "reviewsPage.nameLabel": "Your Name",
      "reviewsPage.serviceLabel": "Service (optional)",
      "reviewsPage.commentLabel": "Your Review",
      "reviewsPage.namePlaceholder": "Your name",
      "reviewsPage.servicePlaceholder": "Web Dev, Video Editing, Store...",
      "reviewsPage.commentPlaceholder": "Share your experience...",
      "reviewsPage.submit": "Submit Review",
      "reviewsPage.saveEdit": "Save Changes",
      "reviewsPage.cancel": "Cancel",
      "reviewsPage.edit": "Edit",
      "reviewsPage.delete": "Delete",
      "reviewsPage.edited": "Edited",
      "reviewsPage.error": "Please select 1–5 stars, enter your name, and write a review.",
      "reviewsPage.saved": "Review saved permanently.",
      "reviewsPage.updated": "Review updated.",
      "reviewsPage.all": "All",
      "reviewsPage.reviewSingular": "review",
      "reviewsPage.reviewPlural": "reviews",
      "reviewsPage.emptyTitle": "No reviews yet",
      "reviewsPage.emptyDesc": "Click Leave a Review above to publish the first 1–5 star rating.",
      "reviewsPage.emptyFilterTitle": "No reviews with this rating",
      "reviewsPage.emptyFilterDesc": "Try selecting another star filter or view all reviews.",
    },
    fr: {
      "reviewsPage.pageTitle": "Avis Clients — Yassine",
      "reviewsPage.back": "Retour au portfolio",
      "reviewsPage.kicker": "Retours Clients",
      "reviewsPage.title": "Tous les avis clients",
      "reviewsPage.leaveBtn": "Laisser un avis",
      "reviewsPage.editTitle": "Modifier l'avis",
      "reviewsPage.ratingLabel": "Note (1 à 5 étoiles)",
      "reviewsPage.nameLabel": "Votre nom",
      "reviewsPage.serviceLabel": "Service (optionnel)",
      "reviewsPage.commentLabel": "Votre avis",
      "reviewsPage.namePlaceholder": "Votre nom",
      "reviewsPage.servicePlaceholder": "Dev Web, Montage, Store...",
      "reviewsPage.commentPlaceholder": "Partagez votre expérience...",
      "reviewsPage.submit": "Publier l'avis",
      "reviewsPage.saveEdit": "Enregistrer",
      "reviewsPage.cancel": "Annuler",
      "reviewsPage.edit": "Modifier",
      "reviewsPage.delete": "Supprimer",
      "reviewsPage.edited": "Modifié",
      "reviewsPage.error": "Veuillez choisir 1 à 5 étoiles, saisir votre nom et écrire un avis.",
      "reviewsPage.saved": "Avis enregistré.",
      "reviewsPage.updated": "Modifications enregistrées.",
      "reviewsPage.all": "Tous",
      "reviewsPage.reviewSingular": "avis",
      "reviewsPage.reviewPlural": "avis",
      "reviewsPage.emptyTitle": "Aucun avis pour le moment",
      "reviewsPage.emptyDesc": "Cliquez sur Laisser un avis ci-dessus pour publier la première note.",
      "reviewsPage.emptyFilterTitle": "Aucun avis pour cette note",
      "reviewsPage.emptyFilterDesc": "Essayez un autre filtre d'étoiles ou affichez tous les avis.",
    },
  };

  let currentLang = getSavedLang();
  let activeStar = "all";
  let editingId = null;
  let selectedRating = 0;
  let hoveredRating = 0;

  const els = {
    brandName: document.getElementById("brand-name"),
    footerName: document.getElementById("footer-name"),
    footerYear: document.getElementById("footer-year"),
    langToggle: document.getElementById("lang-toggle"),
    themeToggle: document.getElementById("theme-toggle"),
    countBadge: document.getElementById("all-reviews-count"),
    avgScore: document.getElementById("page-avg-score"),
    avgStars: document.getElementById("page-avg-stars"),
    totalLabel: document.getElementById("page-total-label"),
    breakdown: document.getElementById("page-rating-breakdown"),
    filters: document.getElementById("rating-filters"),
    grid: document.getElementById("all-reviews-grid"),
    toggleComposer: document.getElementById("toggle-review-composer"),
    closeComposer: document.getElementById("close-review-composer"),
    composerForm: document.getElementById("page-review-form"),
    composerTitle: document.getElementById("composer-title"),
    starPicker: document.getElementById("page-star-picker"),
    ratingReadout: document.getElementById("page-rating-readout"),
    inputName: document.getElementById("page-review-name"),
    inputService: document.getElementById("page-review-service"),
    inputComment: document.getElementById("page-review-comment"),
    submitBtn: document.getElementById("page-review-submit"),
    cancelBtn: document.getElementById("page-review-cancel"),
    status: document.getElementById("page-review-status"),
  };

  function getSavedLang() {
    try {
      const saved = localStorage.getItem("yassine_lang");
      if (saved === "en" || saved === "fr") return saved;
    } catch (e) {}
    return "en";
  }

  function t(key) {
    return (UI_STRINGS[currentLang] && UI_STRINGS[currentLang][key]) || UI_STRINGS.en[key] || key;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function padCount(n) {
    return String(n).padStart(2, "0");
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso + "T00:00:00");
      if (Number.isNaN(d.getTime())) return iso;
      return d.toLocaleDateString(currentLang === "fr" ? "fr-FR" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return iso;
    }
  }

  function updateStarPickerUI() {
    if (!els.starPicker) return;
    const displayValue = hoveredRating || selectedRating;
    els.starPicker.querySelectorAll(".star-btn").forEach((btn) => {
      const val = Number(btn.getAttribute("data-value"));
      btn.classList.toggle("is-lit", val <= displayValue);
      btn.setAttribute("aria-checked", val === selectedRating ? "true" : "false");
    });
    if (els.ratingReadout) {
      els.ratingReadout.textContent = `${selectedRating} / 5`;
    }
  }

  function openComposer(reviewToEdit) {
    editingId = reviewToEdit ? reviewToEdit.id : null;
    els.composerForm.hidden = false;
    els.status.textContent = "";
    els.status.className = "form-status";

    if (reviewToEdit) {
      els.composerTitle.textContent = t("reviewsPage.editTitle");
      els.submitBtn.textContent = t("reviewsPage.saveEdit");
      els.inputName.value = reviewToEdit.name;
      els.inputService.value = reviewToEdit.service || "";
      els.inputComment.value = reviewToEdit.comment;
      selectedRating = reviewToEdit.rating;
    } else {
      els.composerTitle.textContent = t("reviewsPage.leaveBtn");
      els.submitBtn.textContent = t("reviewsPage.submit");
      els.composerForm.reset();
      selectedRating = 0;
    }

    hoveredRating = 0;
    updateStarPickerUI();
    els.composerForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
    els.inputName.focus();
  }

  function closeComposer() {
    editingId = null;
    selectedRating = 0;
    hoveredRating = 0;
    els.composerForm.reset();
    els.composerForm.hidden = true;
    els.status.textContent = "";
    updateStarPickerUI();
  }

  function renderPage() {
    document.title = t("reviewsPage.pageTitle");
    document.documentElement.lang = currentLang;
    els.brandName.textContent = DATA.profile.name;
    els.footerName.textContent = DATA.profile.name;
    els.footerYear.textContent = String(new Date().getFullYear());
    els.langToggle.textContent = currentLang === "en" ? "FR" : "EN";

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.getAttribute("data-i18n"));
    });

    els.inputName.placeholder = t("reviewsPage.namePlaceholder");
    els.inputService.placeholder = t("reviewsPage.servicePlaceholder");
    els.inputComment.placeholder = t("reviewsPage.commentPlaceholder");
    if (editingId) {
      els.composerTitle.textContent = t("reviewsPage.editTitle");
      els.submitBtn.textContent = t("reviewsPage.saveEdit");
    }

    const reviews = STORE.getAll();
    const stats = STORE.getStats(reviews);

    els.countBadge.textContent = padCount(stats.count);
    els.avgScore.textContent = stats.count > 0 ? `${stats.average.toFixed(1)} / 5` : "—";
    els.avgStars.innerHTML = STORE.renderStars(stats.average, 17);
    const word = stats.count === 1 ? t("reviewsPage.reviewSingular") : t("reviewsPage.reviewPlural");
    els.totalLabel.textContent = `${stats.count} ${word}`;

    // Breakdown bars 5 -> 1
    let barsHtml = "";
    for (let star = 5; star >= 1; star--) {
      const n = stats.breakdown[star] || 0;
      const pct = stats.count > 0 ? Math.round((n / stats.count) * 100) : 0;
      barsHtml += `
        <div class="breakdown-row">
          <span class="breakdown-star mono">${star} ${STORE.starIcon(true, 12)}</span>
          <div class="breakdown-track">
            <div class="breakdown-fill" style="width: ${pct}%"></div>
          </div>
          <span class="breakdown-count mono">${n}</span>
        </div>
      `;
    }
    els.breakdown.innerHTML = barsHtml;

    // Filter tabs
    const filterButtons = [{ key: "all", label: t("reviewsPage.all") }];
    for (let star = 5; star >= 1; star--) {
      filterButtons.push({
        key: String(star),
        label: `${star} ${STORE.starIcon(true, 12)}`,
        rawHtml: true,
      });
    }

    els.filters.innerHTML = filterButtons
      .map(
        (btn) => `
        <button
          type="button"
          class="filter-btn filter-star-btn ${activeStar === btn.key ? "is-active" : ""}"
          role="tab"
          aria-selected="${activeStar === btn.key ? "true" : "false"}"
          data-star="${btn.key}"
        >
          ${btn.rawHtml ? btn.label : escapeHtml(btn.label)}
        </button>
      `
      )
      .join("");

    // Filtered list
    const filtered =
      activeStar === "all"
        ? reviews
        : reviews.filter((r) => String(r.rating) === activeStar);

    if (filtered.length === 0) {
      const isFiltered = activeStar !== "all" && reviews.length > 0;
      els.grid.innerHTML = `
        <div class="reviews-empty-card">
          <h3>${escapeHtml(t(isFiltered ? "reviewsPage.emptyFilterTitle" : "reviewsPage.emptyTitle"))}</h3>
          <p>${escapeHtml(t(isFiltered ? "reviewsPage.emptyFilterDesc" : "reviewsPage.emptyDesc"))}</p>
          <button type="button" class="btn btn-primary" data-open-composer="1">${escapeHtml(t("reviewsPage.leaveBtn"))}</button>
        </div>
      `;
      return;
    }

    els.grid.innerHTML = filtered
      .map(
        (rev) => `
        <article class="review-item-card" data-review-id="${escapeHtml(rev.id)}">
          <div class="review-item-top">
            ${STORE.renderStars(rev.rating, 15)}
            <div class="review-item-top-right">
              <span class="review-item-score mono">${rev.rating}.0 / 5</span>
              <div class="review-item-actions">
                <button type="button" class="review-action-btn mono" data-edit-review="${escapeHtml(rev.id)}">${escapeHtml(t("reviewsPage.edit"))}</button>
                <button type="button" class="review-action-btn is-danger mono" data-delete-review="${escapeHtml(rev.id)}">${escapeHtml(t("reviewsPage.delete"))}</button>
              </div>
            </div>
          </div>
          <p class="review-item-comment">${escapeHtml(rev.comment)}</p>
          <div class="review-item-footer">
            <div>
              <span class="review-item-author">${escapeHtml(rev.name)}</span>
              ${rev.service ? `<span class="review-item-service mono">${escapeHtml(rev.service)}</span>` : ""}
            </div>
            <time class="review-item-date mono">${escapeHtml(formatDate(rev.date))}${rev.updatedAt ? ` &middot; ${escapeHtml(t("reviewsPage.edited"))}` : ""}</time>
          </div>
        </article>
      `
      )
      .join("");
  }

  function setupEvents() {
    els.filters.addEventListener("click", (event) => {
      const btn = event.target.closest(".filter-btn");
      if (!btn) return;
      activeStar = btn.getAttribute("data-star") || "all";
      renderPage();
    });

    els.toggleComposer.addEventListener("click", () => {
      if (!els.composerForm.hidden && !editingId) {
        closeComposer();
      } else {
        openComposer(null);
      }
    });

    els.closeComposer.addEventListener("click", closeComposer);
    els.cancelBtn.addEventListener("click", closeComposer);

    els.grid.addEventListener("click", (event) => {
      const openBtn = event.target.closest("[data-open-composer]");
      if (openBtn) {
        openComposer(null);
        return;
      }

      const editBtn = event.target.closest("[data-edit-review]");
      if (editBtn) {
        const rev = STORE.getById(editBtn.getAttribute("data-edit-review"));
        if (rev) openComposer(rev);
        return;
      }

      const delBtn = event.target.closest("[data-delete-review]");
      if (delBtn) {
        const id = delBtn.getAttribute("data-delete-review");
        if (editingId === id) closeComposer();
        STORE.remove(id);
        renderPage();
      }
    });

    els.starPicker.addEventListener("mouseover", (event) => {
      const btn = event.target.closest(".star-btn");
      if (!btn) return;
      hoveredRating = Number(btn.getAttribute("data-value")) || 0;
      updateStarPickerUI();
    });

    els.starPicker.addEventListener("mouseleave", () => {
      hoveredRating = 0;
      updateStarPickerUI();
    });

    els.starPicker.addEventListener("click", (event) => {
      const btn = event.target.closest(".star-btn");
      if (!btn) return;
      selectedRating = Number(btn.getAttribute("data-value")) || 0;
      hoveredRating = 0;
      updateStarPickerUI();
    });

    els.composerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const payload = {
        name: els.inputName.value.trim(),
        service: els.inputService.value.trim(),
        rating: selectedRating,
        comment: els.inputComment.value.trim(),
      };

      const saved = editingId ? STORE.update(editingId, payload) : STORE.add(payload);
      if (!saved) {
        els.status.textContent = t("reviewsPage.error");
        els.status.className = "form-status is-error";
        return;
      }

      const msg = editingId ? t("reviewsPage.updated") : t("reviewsPage.saved");
      closeComposer();
      renderPage();
      els.status.textContent = msg;
      els.status.className = "form-status is-success";
    });

    els.themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("yassine_theme", next);
      } catch (e) {}
    });

    els.langToggle.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "fr" : "en";
      try {
        localStorage.setItem("yassine_lang", currentLang);
      } catch (e) {}
      renderPage();
    });

    window.addEventListener("storage", (event) => {
      if (event.key === STORE.STATE_KEY || event.key === STORE.STORAGE_KEY) {
        renderPage();
      }
    });
  }

  function setupCursorGlow() {
    const spotlight = document.getElementById("bg-spotlight");
    if (!spotlight) return;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.3;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = null;

    function animate() {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      spotlight.style.setProperty("--mx", `${currentX.toFixed(1)}px`);
      spotlight.style.setProperty("--my", `${currentY.toFixed(1)}px`);
      if (Math.abs(targetX - currentX) > 0.3 || Math.abs(targetY - currentY) > 0.3) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    }

    window.addEventListener(
      "pointermove",
      (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
        if (!spotlight.classList.contains("is-active")) {
          currentX = targetX;
          currentY = targetY;
          spotlight.style.setProperty("--mx", `${currentX}px`);
          spotlight.style.setProperty("--my", `${currentY}px`);
          spotlight.classList.add("is-active");
        }
        if (!rafId) rafId = requestAnimationFrame(animate);
      },
      { passive: true }
    );

    document.addEventListener("mouseleave", () => {
      spotlight.classList.remove("is-active");
    });
  }

  renderPage();
  setupEvents();
  setupCursorGlow();
})();
