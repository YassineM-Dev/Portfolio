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
      "reviewsPage.all": "All",
      "reviewsPage.reviewSingular": "review",
      "reviewsPage.reviewPlural": "reviews",
      "reviewsPage.emptyTitle": "No reviews yet",
      "reviewsPage.emptyDesc": "Client reviews submitted on the portfolio appear here automatically.",
      "reviewsPage.emptyFilterTitle": "No reviews with this rating",
      "reviewsPage.emptyFilterDesc": "Try selecting another star filter or view all reviews.",
      "reviewsPage.clientFallback": "Client",
    },
    fr: {
      "reviewsPage.pageTitle": "Avis Clients — Yassine",
      "reviewsPage.back": "Retour au portfolio",
      "reviewsPage.kicker": "Retours Clients",
      "reviewsPage.title": "Tous les avis clients",
      "reviewsPage.leaveBtn": "Laisser un avis",
      "reviewsPage.all": "Tous",
      "reviewsPage.reviewSingular": "avis",
      "reviewsPage.reviewPlural": "avis",
      "reviewsPage.emptyTitle": "Aucun avis pour le moment",
      "reviewsPage.emptyDesc": "Les avis publiés depuis le portfolio s'afficheront ici automatiquement.",
      "reviewsPage.emptyFilterTitle": "Aucun avis pour cette note",
      "reviewsPage.emptyFilterDesc": "Essayez un autre filtre d'étoiles ou affichez tous les avis.",
      "reviewsPage.clientFallback": "Client",
    },
  };

  let currentLang = getSavedLang();
  let activeStar = "all";

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
          <a href="index.html#reviews" class="btn btn-primary">${escapeHtml(t("reviewsPage.leaveBtn"))}</a>
        </div>
      `;
      return;
    }

    els.grid.innerHTML = filtered
      .map(
        (rev) => `
        <article class="review-item-card">
          <div class="review-item-top">
            ${STORE.renderStars(rev.rating, 15)}
            <span class="review-item-score mono">${rev.rating}.0 / 5</span>
          </div>
          <p class="review-item-comment">${escapeHtml(rev.comment)}</p>
          <div class="review-item-footer">
            <div>
              <span class="review-item-author">${escapeHtml(rev.name)}</span>
              ${rev.service ? `<span class="review-item-service mono">${escapeHtml(rev.service)}</span>` : ""}
            </div>
            <time class="review-item-date mono">${escapeHtml(formatDate(rev.date))}</time>
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
      if (event.key === "yassine_portfolio_reviews_v1") {
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
