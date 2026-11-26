(function () {
  "use strict";

  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) return;

  const UI_STRINGS = {
    en: {
      "nav.projects": "Projects",
      "nav.skills": "Skills",
      "nav.about": "About",
      "nav.reviews": "Reviews",
      "nav.contact": "Contact",
      "hero.ctaProjects": "View Projects",
      "hero.ctaContact": "Get in Touch",
      "metrics.projects": "Projects",
      "metrics.focus": "Focus",
      "metrics.location": "Location",
      "projects.kicker": "Selected Work",
      "projects.title": "Projects",
      "projects.all": "All",
      "projects.details": "View details",
      "projects.live": "Live",
      "projects.download": "Download",
      "projects.downloadInstaller": "Download Installer (.exe)",
      "projects.visitLive": "Open Live Site",
      "projects.code": "GitHub",
      "skills.kicker": "Expertise",
      "skills.title": "Skills & Languages",
      "skills.coreTitle": "Core Skills",
      "skills.langTitle": "Programming Languages",
      "about.kicker": "Background",
      "about.title": "About",
      "about.ownerKicker": "Founder",
      "about.ownerTitle": "Owner Of",
      "reviews.kicker": "Client Feedback",
      "reviews.title": "Client Reviews",
      "reviews.viewAll": "View All Reviews",
      "reviews.formTitle": "Leave a Review",
      "reviews.ratingLabel": "Rating (1 to 5 stars)",
      "reviews.nameLabel": "Your Name",
      "reviews.serviceLabel": "Service (optional)",
      "reviews.commentLabel": "Your Review",
      "reviews.namePlaceholder": "Your name",
      "reviews.servicePlaceholder": "Web Dev, Video Editing, Store...",
      "reviews.commentPlaceholder": "Share your experience...",
      "reviews.submit": "Submit Review",
      "reviews.error": "Please choose a rating (1–5 stars), enter your name, and write a review.",
      "reviews.saved": "Review published.",
      "reviews.seeAllLink": "View all reviews",
      "reviews.reviewSingular": "review",
      "reviews.reviewPlural": "reviews",
      "reviews.latestLabel": "Latest review",
      "reviews.empty": "No reviews yet — be the first to rate and share feedback.",
      "contact.kicker": "Contact",
      "contact.title": "Let's work together.",
      "contact.desc":
        "Have a project in mind, a question about my work, or an opportunity to discuss? Send a direct message or copy my email below.",
      "contact.copy": "Copy",
      "contact.copied": "Copied",
      "form.name": "Name",
      "form.email": "Email",
      "form.message": "Message",
      "form.namePlaceholder": "Your name",
      "form.emailPlaceholder": "you@example.com",
      "form.messagePlaceholder": "Tell me about your project...",
      "form.submit": "Send Message",
      "form.error": "Please fill in your name, a valid email, and a message.",
      "form.sent": "Opening your email client to send the message.",
      "footer.top": "Back to top",
      "modal.highlights": "Key Highlights",
      "modal.stack": "Technologies",
      "modal.openLive": "Open Live Project",
      "modal.download": "Download App",
      "modal.viewCode": "View on GitHub",
      "modal.noLinks": "Project links can be added in assets/js/data.js at any time.",
    },
    fr: {
      "nav.projects": "Projets",
      "nav.skills": "Compétences",
      "nav.about": "À propos",
      "nav.reviews": "Avis",
      "nav.contact": "Contact",
      "hero.ctaProjects": "Voir les projets",
      "hero.ctaContact": "Me contacter",
      "metrics.projects": "Projets",
      "metrics.focus": "Domaine",
      "metrics.location": "Localisation",
      "projects.kicker": "Sélection",
      "projects.title": "Projets",
      "projects.all": "Tous",
      "projects.details": "Voir les détails",
      "projects.live": "Aperçu",
      "projects.download": "Télécharger",
      "projects.downloadInstaller": "Télécharger l'installeur (.exe)",
      "projects.visitLive": "Ouvrir le site",
      "projects.code": "GitHub",
      "skills.kicker": "Savoir-faire",
      "skills.title": "Compétences & Langages",
      "skills.coreTitle": "Compétences Clés",
      "skills.langTitle": "Langages de Programmation",
      "about.kicker": "Parcours",
      "about.title": "À propos",
      "about.ownerKicker": "Fondateur",
      "about.ownerTitle": "Propriétaire de",
      "reviews.kicker": "Retours Clients",
      "reviews.title": "Avis Clients",
      "reviews.viewAll": "Voir les avis",
      "reviews.formTitle": "Laisser un avis",
      "reviews.ratingLabel": "Note (1 à 5 étoiles)",
      "reviews.nameLabel": "Votre nom",
      "reviews.serviceLabel": "Service (optionnel)",
      "reviews.commentLabel": "Votre avis",
      "reviews.namePlaceholder": "Votre nom",
      "reviews.servicePlaceholder": "Dev Web, Montage, Store...",
      "reviews.commentPlaceholder": "Partagez votre expérience...",
      "reviews.submit": "Publier l'avis",
      "reviews.error": "Veuillez choisir une note (1–5 étoiles), saisir votre nom et écrire un avis.",
      "reviews.saved": "Avis publié.",
      "reviews.seeAllLink": "Voir tous les avis",
      "reviews.reviewSingular": "avis",
      "reviews.reviewPlural": "avis",
      "reviews.latestLabel": "Dernier avis",
      "reviews.empty": "Aucun avis pour le moment — soyez le premier à laisser un retour.",
      "contact.kicker": "Contact",
      "contact.title": "Travaillons ensemble.",
      "contact.desc":
        "Un projet en tête, une question sur mes réalisations ou une opportunité à discuter ? Envoyez un message ou copiez mon email ci-dessous.",
      "contact.copy": "Copier",
      "contact.copied": "Copié",
      "form.name": "Nom",
      "form.email": "Email",
      "form.message": "Message",
      "form.namePlaceholder": "Votre nom",
      "form.emailPlaceholder": "vous@exemple.com",
      "form.messagePlaceholder": "Parlez-moi de votre projet...",
      "form.submit": "Envoyer",
      "form.error": "Veuillez saisir votre nom, un email valide et un message.",
      "form.sent": "Ouverture de votre client mail pour envoyer le message.",
      "footer.top": "Haut de page",
      "modal.highlights": "Points clés",
      "modal.stack": "Technologies",
      "modal.openLive": "Ouvrir le projet",
      "modal.download": "Télécharger l'app",
      "modal.viewCode": "Voir sur GitHub",
      "modal.noLinks": "Les liens du projet peuvent être ajoutés dans assets/js/data.js.",
    },
  };

  let currentLang = getSavedLang();
  let activeCategory = "all";
  let selectedRating = 0;
  let hoveredRating = 0;
  let lastFocusedElement = null;

  const els = {
    brandName: document.getElementById("brand-name"),
    footerName: document.getElementById("footer-name"),
    footerYear: document.getElementById("footer-year"),
    heroEyebrow: document.getElementById("hero-eyebrow"),
    heroAvailability: document.getElementById("hero-availability"),
    heroHeadline: document.getElementById("hero-headline"),
    heroSubheadline: document.getElementById("hero-subheadline"),
    metricProjectCount: document.getElementById("metric-project-count"),
    metricFocus: document.getElementById("metric-focus"),
    metricLocation: document.getElementById("metric-location"),
    projectsCount: document.getElementById("projects-count"),
    projectFilters: document.getElementById("project-filters"),
    projectsGrid: document.getElementById("projects-grid"),
    sliderControls: document.getElementById("slider-controls"),
    sliderIndicator: document.getElementById("slider-indicator"),
    sliderDots: document.getElementById("slider-dots"),
    sliderPrev: document.getElementById("slider-prev"),
    sliderNext: document.getElementById("slider-next"),
    coreSkillsCount: document.getElementById("core-skills-count"),
    coreSkillsList: document.getElementById("core-skills-list"),
    languagesCount: document.getElementById("languages-count"),
    languagesGrid: document.getElementById("languages-grid"),
    aboutCopy: document.getElementById("about-copy"),
    ownerOfList: document.getElementById("owner-of-list"),
    reviewsCountBadge: document.getElementById("reviews-count-badge"),
    homeAvgScore: document.getElementById("home-avg-score"),
    homeAvgStars: document.getElementById("home-avg-stars"),
    homeTotalLabel: document.getElementById("home-total-label"),
    homeRatingBreakdown: document.getElementById("home-rating-breakdown"),
    latestReviewBox: document.getElementById("latest-review-box"),
    reviewForm: document.getElementById("review-form"),
    starPicker: document.getElementById("star-picker"),
    reviewRatingReadout: document.getElementById("review-rating-readout"),
    reviewName: document.getElementById("review-name"),
    reviewService: document.getElementById("review-service"),
    reviewComment: document.getElementById("review-comment"),
    reviewStatus: document.getElementById("review-status"),
    contactEmail: document.getElementById("contact-email"),
    copyEmailBtn: document.getElementById("copy-email-btn"),
    copyEmailLabel: document.getElementById("copy-email-label"),
    socialLinks: document.getElementById("social-links"),
    contactForm: document.getElementById("contact-form"),
    inputName: document.getElementById("input-name"),
    inputEmail: document.getElementById("input-email"),
    inputMessage: document.getElementById("input-message"),
    formStatus: document.getElementById("form-status"),
    langToggle: document.getElementById("lang-toggle"),
    themeToggle: document.getElementById("theme-toggle"),
    modal: document.getElementById("project-modal"),
    modalClose: document.getElementById("modal-close"),
    modalIndex: document.getElementById("modal-index"),
    modalYear: document.getElementById("modal-year"),
    modalCategory: document.getElementById("modal-category"),
    modalPreview: document.getElementById("modal-preview"),
    modalTitle: document.getElementById("modal-title"),
    modalStatus: document.getElementById("modal-status"),
    modalDescription: document.getElementById("modal-description"),
    modalHighlights: document.getElementById("modal-highlights"),
    modalStack: document.getElementById("modal-stack"),
    modalActions: document.getElementById("modal-actions"),
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

  function localized(value) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value[currentLang] || value.en || "";
    }
    return value || "";
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

  function arrowUpRightIcon() {
    return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"></path><path d="M7 7h10v10"></path></svg>`;
  }

  function arrowRightIcon() {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`;
  }

  function downloadIcon() {
    return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
  }

  function renderProjectPreview(project) {
    if (project.image) {
      return `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)} preview" loading="lazy" />`;
    }

    if (project.visualType === "algostudio") {
      return `
        <div class="preview-canvas" aria-hidden="true">
          <div class="mock-window">
            <div class="mock-topbar">
              <div class="mock-dots"><span></span><span></span><span></span></div>
              <span class="mock-path">algostudio / main.algo</span>
            </div>
            <div class="ide-stage">
              <div class="ide-editor">
                <div class="ide-line"><span class="ide-ln">1</span><span><em class="ide-kw">Algorithme</em> Somme</span></div>
                <div class="ide-line"><span class="ide-ln">2</span><span><em class="ide-kw">Début</em></span></div>
                <div class="ide-line"><span class="ide-ln">3</span><span>&nbsp;&nbsp;S <em class="ide-op">&larr;</em> 0</span></div>
                <div class="ide-line is-active"><span class="ide-ln">4</span><span>&nbsp;&nbsp;<em class="ide-kw">Pour</em> i <em class="ide-kw">de</em> 1 <em class="ide-kw">&agrave;</em> n <em class="ide-kw">Faire</em></span></div>
                <div class="ide-line"><span class="ide-ln">5</span><span>&nbsp;&nbsp;&nbsp;&nbsp;S <em class="ide-op">&larr;</em> S + i</span></div>
                <div class="ide-line"><span class="ide-ln">6</span><span><em class="ide-kw">Fin</em></span></div>
              </div>
              <div class="ide-side">
                <span class="ide-side-title">TDO / Trace</span>
                <div class="ide-tdo-row"><span>S</span><em>Entier</em></div>
                <div class="ide-tdo-row"><span>i</span><em>Entier</em></div>
                <div class="ide-tdo-row"><span>n</span><em>Entier</em></div>
                <div class="ide-exec-badge">Exec OK</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (project.visualType === "compresseur") {
      return `
        <div class="preview-canvas" aria-hidden="true">
          <div class="mock-window">
            <div class="mock-topbar">
              <div class="mock-dots"><span></span><span></span><span></span></div>
              <span class="mock-path">compresseur / libx264 &middot; crf 18</span>
            </div>
            <div class="comp-stage">
              <div class="comp-flow">
                <div class="comp-box">
                  <span class="comp-label">Source Video</span>
                  <span class="comp-size">48.2 MB</span>
                </div>
                <div class="comp-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
                <div class="comp-box is-output">
                  <span class="comp-label">60 / 120 FPS</span>
                  <span class="comp-size">9.6 MB</span>
                </div>
              </div>
              <div class="comp-meter-wrap">
                <div class="comp-meter-head">
                  <span>FFmpeg CRF compression</span>
                  <span class="comp-saving">-80%</span>
                </div>
                <div class="comp-track">
                  <div class="comp-fill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (project.visualType === "bac-sheet") {
      const sections = [
        { code: "INFO", label: "Informatique", active: true },
        { code: "MATH", label: "Mathématiques" },
        { code: "SCI", label: "Sciences Exp." },
        { code: "TECH", label: "Technique" },
        { code: "ECO", label: "Économie" },
        { code: "LET", label: "Lettres" },
      ];
      const gridMarkup = sections
        .map(
          (s) => `
            <div class="edu-tile ${s.active ? "is-active" : ""}">
              <span class="edu-code">${s.code}</span>
              <span class="edu-name">${s.label}</span>
            </div>
          `
        )
        .join("");

      return `
        <div class="preview-canvas" aria-hidden="true">
          <div class="mock-window">
            <div class="mock-topbar">
              <div class="mock-dots"><span></span><span></span><span></span></div>
              <span class="mock-path">bac-for-all / sections</span>
            </div>
            <div class="edu-stage">
              <div class="edu-grid">${gridMarkup}</div>
              <div class="edu-footer">
                <span>6 Sections &middot; 65 Summaries</span>
                <span class="edu-live-pill">Live</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (project.visualType === "gaming-portfolio") {
      return `
        <div class="preview-canvas" aria-hidden="true">
          <div class="mock-window">
            <div class="mock-topbar">
              <div class="mock-dots"><span></span><span></span><span></span></div>
              <span class="mock-path">joyboy / creator-hub</span>
            </div>
            <div class="gp-stage">
              <div class="gp-header">
                <div class="gp-avatar mono">JB</div>
                <div class="gp-identity">
                  <span class="gp-name">JOYBOY</span>
                  <span class="gp-roles mono">Gaming &middot; Editing &middot; Content</span>
                </div>
              </div>
              <div class="gp-links">
                <div class="gp-link-row">
                  <span>Store &mdash; Presets &amp; Packs</span>
                  <span class="gp-arrow mono">&nearr;</span>
                </div>
                <div class="gp-link-row is-subtle">
                  <span>TikTok &middot; Instagram &middot; Discord</span>
                  <span class="gp-arrow mono">&nearr;</span>
                </div>
              </div>
              <div class="gp-footer">
                <span>Canvas &middot; WebP</span>
                <span class="edu-live-pill">Live</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (project.visualType === "routine") {
      return `
        <div class="preview-canvas" aria-hidden="true">
          <div class="mock-window">
            <div class="mock-topbar">
              <div class="mock-dots"><span></span><span></span><span></span></div>
              <span class="mock-path">joyboy-routine / AR &middot; FR &middot; EN</span>
            </div>
            <div class="rt-stage">
              <div class="rt-list">
                <div class="rt-row is-done">
                  <span class="rt-check">&#10003;</span>
                  <span class="rt-task">Morning Study &amp; Revision</span>
                  <span class="rt-time mono">07:30</span>
                </div>
                <div class="rt-row is-done">
                  <span class="rt-check">&#10003;</span>
                  <span class="rt-task">Daily Prayer Tracker</span>
                  <span class="rt-time mono">5 / 5</span>
                </div>
                <div class="rt-row is-active">
                  <span class="rt-dot"></span>
                  <span class="rt-task">Dev &amp; Content Block</span>
                  <span class="rt-time mono">18:00</span>
                </div>
              </div>
              <div class="rt-footer">
                <span>Windows &middot; Android &middot; iOS</span>
                <span class="edu-live-pill">Ready</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="preview-canvas" aria-hidden="true">
        <div class="mock-window">
          <div class="mock-topbar">
            <div class="mock-dots"><span></span><span></span><span></span></div>
            <span class="mock-path">${escapeHtml(project.id || "project")}</span>
          </div>
          <div class="fallback-stage">
            <span class="fallback-index">${escapeHtml(project.index || "00")}</span>
            <span class="fallback-label">${escapeHtml(localized(project.category))}</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderProfile() {
    const p = DATA.profile;
    document.title = `${p.name} — Portfolio`;
    document.documentElement.lang = currentLang;

    els.brandName.textContent = p.name;
    els.footerName.textContent = p.name;
    els.footerYear.textContent = String(new Date().getFullYear());
    els.heroEyebrow.textContent = localized(p.eyebrow);
    els.heroAvailability.textContent = localized(p.availability);
    els.heroHeadline.textContent = localized(p.headline);
    els.heroSubheadline.textContent = localized(p.subheadline);
    els.metricProjectCount.textContent = padCount(DATA.projects.length);
    els.metricFocus.textContent = localized(p.focus);
    els.metricLocation.textContent = localized(p.location);
    els.contactEmail.textContent = p.email;
    els.langToggle.textContent = currentLang === "en" ? "FR" : "EN";

    // Static i18n text nodes
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      node.textContent = t(key);
    });

    // Placeholders
    els.inputName.placeholder = t("form.namePlaceholder");
    els.inputEmail.placeholder = t("form.emailPlaceholder");
    els.inputMessage.placeholder = t("form.messagePlaceholder");
    if (els.reviewName) els.reviewName.placeholder = t("reviews.namePlaceholder");
    if (els.reviewService) els.reviewService.placeholder = t("reviews.servicePlaceholder");
    if (els.reviewComment) els.reviewComment.placeholder = t("reviews.commentPlaceholder");

    // About paragraphs
    const paragraphs = localized(p.about);
    els.aboutCopy.innerHTML = Array.isArray(paragraphs)
      ? paragraphs.map((line) => `<p>${escapeHtml(line)}</p>`).join("")
      : "";

    // Core Skills (percentage bars)
    if (els.coreSkillsList && Array.isArray(DATA.coreSkills)) {
      if (els.coreSkillsCount) {
        els.coreSkillsCount.textContent = padCount(DATA.coreSkills.length);
      }
      els.coreSkillsList.innerHTML = DATA.coreSkills
        .map(
          (skill) => `
          <div class="skill-bar-item">
            <div class="skill-bar-head">
              <span class="skill-bar-name">${escapeHtml(localized(skill.name))}</span>
              <span class="skill-bar-pct mono">${escapeHtml(skill.level)}%</span>
            </div>
            <div class="skill-bar-track" role="progressbar" aria-label="${escapeHtml(localized(skill.name))}" aria-valuenow="${escapeHtml(skill.level)}" aria-valuemin="0" aria-valuemax="100">
              <div class="skill-bar-fill" style="--pct: ${Number(skill.level) || 0}%"></div>
            </div>
          </div>
        `
        )
        .join("");
    }

    // Programming Languages
    if (els.languagesGrid && Array.isArray(DATA.languages)) {
      if (els.languagesCount) {
        els.languagesCount.textContent = padCount(DATA.languages.length);
      }
      els.languagesGrid.innerHTML = DATA.languages
        .map(
          (lang, idx) => `
          <div class="lang-tile">
            <span class="lang-index mono">${padCount(idx + 1)}</span>
            <span class="lang-name">${escapeHtml(lang)}</span>
          </div>
        `
        )
        .join("");
    }

    // Owner Of
    if (els.ownerOfList && Array.isArray(DATA.ownerOf)) {
      els.ownerOfList.innerHTML = DATA.ownerOf
        .map(
          (item) => `
          <a class="owner-card" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
            <div class="owner-card-main">
              <div class="owner-card-top">
                <span class="owner-card-name">${escapeHtml(item.name)}</span>
                <span class="owner-card-badge mono">${escapeHtml(item.badge)}</span>
              </div>
              <p class="owner-card-role">${escapeHtml(localized(item.role))}</p>
            </div>
            <span class="owner-card-arrow" aria-hidden="true">${arrowUpRightIcon()}</span>
          </a>
        `
        )
        .join("");
    }

    // Social links
    els.socialLinks.innerHTML = p.links
      .map(
        (link) => `
        <a class="social-link social-pill" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">
          <span>${escapeHtml(link.label)}</span>
          ${link.handle ? `<span class="social-handle mono">${escapeHtml(link.handle)}</span>` : ""}
          ${arrowUpRightIcon()}
        </a>
      `
      )
      .join("");
  }

  function updateStarPickerUI() {
    if (!els.starPicker) return;
    const displayValue = hoveredRating || selectedRating;
    els.starPicker.querySelectorAll(".star-btn").forEach((btn) => {
      const val = Number(btn.getAttribute("data-value"));
      const isLit = val <= displayValue;
      btn.classList.toggle("is-lit", isLit);
      btn.setAttribute("aria-checked", val === selectedRating ? "true" : "false");
    });
    if (els.reviewRatingReadout) {
      els.reviewRatingReadout.textContent = `${selectedRating} / 5`;
    }
  }

  function renderReviewsSummary() {
    const STORE = window.REVIEWS_STORE;
    if (!STORE || !els.homeAvgScore) return;

    const reviews = STORE.getAll();
    const stats = STORE.getStats(reviews);

    if (els.reviewsCountBadge) {
      els.reviewsCountBadge.textContent = padCount(stats.count);
    }
    els.homeAvgScore.textContent = stats.count > 0 ? `${stats.average.toFixed(1)} / 5` : "—";
    els.homeAvgStars.innerHTML = STORE.renderStars(stats.average, 16);
    const word = stats.count === 1 ? t("reviews.reviewSingular") : t("reviews.reviewPlural");
    els.homeTotalLabel.textContent = `${stats.count} ${word}`;

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
    els.homeRatingBreakdown.innerHTML = barsHtml;

    if (reviews.length > 0) {
      const latest = reviews[0];
      els.latestReviewBox.innerHTML = `
        <div class="latest-review-head">
          <span class="mono latest-review-kicker">${escapeHtml(t("reviews.latestLabel"))}</span>
          ${STORE.renderStars(latest.rating, 13)}
        </div>
        <p class="latest-review-text">&ldquo;${escapeHtml(latest.comment)}&rdquo;</p>
        <div class="latest-review-author mono">
          <span>${escapeHtml(latest.name)}</span>
          ${latest.service ? `<span>&middot; ${escapeHtml(latest.service)}</span>` : ""}
        </div>
      `;
    } else {
      els.latestReviewBox.innerHTML = `<p class="latest-review-empty">${escapeHtml(t("reviews.empty"))}</p>`;
    }
  }

  function getCategories() {
    const map = new Map();
    DATA.projects.forEach((project) => {
      const key = project.category && project.category.key ? project.category.key : "other";
      if (!map.has(key)) {
        map.set(key, localized(project.category));
      }
    });
    return Array.from(map.entries());
  }

  function renderFilters() {
    const categories = getCategories();
    const buttons = [
      { key: "all", label: t("projects.all") },
      ...categories.map(([key, label]) => ({ key, label })),
    ];

    els.projectFilters.innerHTML = buttons
      .map(
        (btn) => `
        <button
          type="button"
          class="filter-btn ${activeCategory === btn.key ? "is-active" : ""}"
          role="tab"
          aria-selected="${activeCategory === btn.key ? "true" : "false"}"
          data-category="${escapeHtml(btn.key)}"
        >
          ${escapeHtml(btn.label)}
        </button>
      `
      )
      .join("");
  }

  function renderProjects() {
    const filtered =
      activeCategory === "all"
        ? DATA.projects
        : DATA.projects.filter((p) => p.category && p.category.key === activeCategory);

    els.projectsCount.textContent = padCount(filtered.length);

    els.projectsGrid.innerHTML = filtered
      .map((project) => {
        const extLinks = [];
        if (project.repoUrl) {
          extLinks.push(
            `<a class="ext-link" href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("projects.code"))} ${arrowUpRightIcon()}</a>`
          );
        }

        let primaryCta = "";
        if (project.downloadUrl) {
          primaryCta = `
            <a class="btn btn-primary card-cta-btn" href="${escapeHtml(project.downloadUrl)}" download rel="noopener noreferrer">
              ${downloadIcon()}
              <span>${escapeHtml(t("projects.downloadInstaller"))}</span>
            </a>
          `;
        } else if (project.liveUrl) {
          primaryCta = `
            <a class="btn btn-secondary card-cta-btn" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer">
              <span>${escapeHtml(t("projects.visitLive"))}</span>
              ${arrowUpRightIcon()}
            </a>
          `;
        }

        return `
          <article class="project-card" data-project-id="${escapeHtml(project.id)}">
            <div class="card-preview" data-open-modal="${escapeHtml(project.id)}">
              ${renderProjectPreview(project)}
            </div>
            <div class="card-body">
              <div class="card-meta mono">
                <span class="card-meta-left">
                  <span>${escapeHtml(project.index)}</span>
                  <span>/</span>
                  <span>${escapeHtml(project.year)}</span>
                </span>
                <span class="card-category">${escapeHtml(localized(project.category))}</span>
              </div>

              <h3 class="card-title">
                <button type="button" class="card-title-btn" data-open-modal="${escapeHtml(project.id)}">
                  ${escapeHtml(project.title)}
                </button>
              </h3>

              <p class="card-summary">${escapeHtml(localized(project.summary))}</p>

              <div class="tag-list">
                ${project.stack.map((tech) => `<span class="tag">${escapeHtml(tech)}</span>`).join("")}
              </div>

              ${primaryCta ? `<div class="card-cta-wrap">${primaryCta}</div>` : ""}

              <div class="card-footer">
                <button type="button" class="card-action-link" data-open-modal="${escapeHtml(project.id)}">
                  <span>${escapeHtml(t("projects.details"))}</span>
                  ${arrowRightIcon()}
                </button>
                ${extLinks.length ? `<div class="card-ext-links">${extLinks.join("")}</div>` : ""}
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    els.projectsGrid.scrollTo({ left: 0, behavior: "auto" });
    updateSliderUI(0);
  }

  function getSliderMetrics() {
    const cards = els.projectsGrid ? els.projectsGrid.querySelectorAll(".project-card") : [];
    const total = cards.length;
    const visible = window.innerWidth <= 860 ? 1 : 2;
    const maxIndex = Math.max(0, total - visible);
    let stepWidth = 0;
    if (cards.length > 0) {
      const style = window.getComputedStyle(els.projectsGrid);
      const gap = parseFloat(style.columnGap || style.gap) || 24;
      stepWidth = cards[0].getBoundingClientRect().width + gap;
    }
    return { total, visible, maxIndex, stepWidth };
  }

  function getCurrentSlideIndex() {
    const { maxIndex, stepWidth } = getSliderMetrics();
    if (!stepWidth || maxIndex === 0) return 0;
    return Math.min(maxIndex, Math.max(0, Math.round(els.projectsGrid.scrollLeft / stepWidth)));
  }

  function goToSlide(index) {
    const { maxIndex, stepWidth } = getSliderMetrics();
    const clamped = Math.min(maxIndex, Math.max(0, index));
    if (stepWidth > 0) {
      els.projectsGrid.scrollTo({ left: clamped * stepWidth, behavior: "smooth" });
    }
    updateSliderUI(clamped);
  }

  function updateSliderUI(forcedIndex) {
    if (!els.sliderControls) return;
    const { total, visible, maxIndex } = getSliderMetrics();
    const activeIndex = typeof forcedIndex === "number" ? forcedIndex : getCurrentSlideIndex();

    if (total === 0) {
      els.sliderControls.hidden = true;
      return;
    }
    els.sliderControls.hidden = false;

    const firstShown = activeIndex + 1;
    const lastShown = Math.min(total, activeIndex + visible);
    els.sliderIndicator.textContent =
      firstShown === lastShown
        ? `${padCount(firstShown)} / ${padCount(total)}`
        : `${padCount(firstShown)}–${padCount(lastShown)} / ${padCount(total)}`;

    const dotCount = maxIndex + 1;
    let dotsHtml = "";
    for (let i = 0; i < dotCount; i++) {
      dotsHtml += `<button type="button" class="slider-dot ${i === activeIndex ? "is-active" : ""}" data-slide="${i}" role="tab" aria-selected="${i === activeIndex ? "true" : "false"}" aria-label="Slide ${i + 1}"></button>`;
    }
    els.sliderDots.innerHTML = dotsHtml;

    els.sliderPrev.disabled = activeIndex <= 0;
    els.sliderNext.disabled = activeIndex >= maxIndex;
  }

  function openModal(projectId) {
    const project = DATA.projects.find((p) => p.id === projectId);
    if (!project) return;

    lastFocusedElement = document.activeElement;
    els.modal.dataset.activeProject = project.id;

    els.modalIndex.textContent = project.index;
    els.modalYear.textContent = project.year;
    els.modalCategory.textContent = localized(project.category);
    els.modalPreview.innerHTML = renderProjectPreview(project);
    els.modalTitle.textContent = project.title;
    els.modalStatus.textContent = localized(project.status);
    els.modalDescription.textContent = localized(project.description);

    const highlights = localized(project.highlights);
    els.modalHighlights.innerHTML = Array.isArray(highlights)
      ? highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
      : "";

    els.modalStack.innerHTML = project.stack
      .map((tech) => `<span class="tag">${escapeHtml(tech)}</span>`)
      .join("");

    const actions = [];
    if (Array.isArray(project.downloads) && project.downloads.length > 0) {
      project.downloads.forEach((dl, idx) => {
        if (!dl || !dl.url) return;
        const cls = idx === 0 ? "btn btn-primary" : "btn btn-secondary";
        actions.push(
          `<a class="${cls}" href="${escapeHtml(dl.url)}" rel="noopener noreferrer">${downloadIcon()} <span>${escapeHtml(dl.label || t("modal.download"))}</span></a>`
        );
      });
    } else if (project.downloadUrl) {
      actions.push(
        `<a class="btn btn-primary" href="${escapeHtml(project.downloadUrl)}" rel="noopener noreferrer">${downloadIcon()} <span>${escapeHtml(t("modal.download"))}</span></a>`
      );
    }
    if (project.liveUrl) {
      actions.push(
        `<a class="btn ${actions.length ? "btn-secondary" : "btn-primary"}" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("modal.openLive"))} ${arrowUpRightIcon()}</a>`
      );
    }
    if (project.repoUrl) {
      actions.push(
        `<a class="btn btn-secondary" href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("modal.viewCode"))} ${arrowUpRightIcon()}</a>`
      );
    }
    els.modalActions.innerHTML = actions.length
      ? actions.join("")
      : `<p class="modal-note mono">${escapeHtml(t("modal.noLinks"))}</p>`;

    els.modal.hidden = false;
    els.modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    requestAnimationFrame(() => {
      els.modal.classList.add("is-open");
      els.modalClose.focus();
    });
  }

  function closeModal() {
    if (els.modal.hidden) return;
    els.modal.classList.remove("is-open");
    els.modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    setTimeout(() => {
      els.modal.hidden = true;
      delete els.modal.dataset.activeProject;
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    }, 180);
  }

  function setupEvents() {
    // Filter tabs
    els.projectFilters.addEventListener("click", (event) => {
      const btn = event.target.closest(".filter-btn");
      if (!btn) return;
      activeCategory = btn.getAttribute("data-category") || "all";
      renderFilters();
      renderProjects();
    });

    // Projects slider navigation
    if (els.sliderPrev && els.sliderNext && els.sliderDots && els.projectsGrid) {
      els.sliderPrev.addEventListener("click", () => {
        goToSlide(getCurrentSlideIndex() - 1);
      });

      els.sliderNext.addEventListener("click", () => {
        goToSlide(getCurrentSlideIndex() + 1);
      });

      els.sliderDots.addEventListener("click", (event) => {
        const dot = event.target.closest(".slider-dot");
        if (!dot) return;
        goToSlide(Number(dot.getAttribute("data-slide")) || 0);
      });

      let scrollRaf = null;
      els.projectsGrid.addEventListener(
        "scroll",
        () => {
          if (scrollRaf) return;
          scrollRaf = requestAnimationFrame(() => {
            updateSliderUI();
            scrollRaf = null;
          });
        },
        { passive: true }
      );

      els.projectsGrid.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goToSlide(getCurrentSlideIndex() + 1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          goToSlide(getCurrentSlideIndex() - 1);
        }
      });

      window.addEventListener(
        "resize",
        () => {
          updateSliderUI();
        },
        { passive: true }
      );
    }

    // Open project modal
    els.projectsGrid.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-open-modal]");
      if (!trigger) return;
      openModal(trigger.getAttribute("data-open-modal"));
    });

    // Close project modal
    els.modalClose.addEventListener("click", closeModal);
    els.modal.addEventListener("click", (event) => {
      if (event.target === els.modal) closeModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !els.modal.hidden) {
        closeModal();
      }
    });

    // Theme toggle
    els.themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("yassine_theme", next);
      } catch (e) {}
    });

    // Language toggle
    els.langToggle.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "fr" : "en";
      try {
        localStorage.setItem("yassine_lang", currentLang);
      } catch (e) {}
      renderAll();
      if (!els.modal.hidden && els.modal.dataset.activeProject) {
        openModal(els.modal.dataset.activeProject);
      }
    });

    // Copy email
    els.copyEmailBtn.addEventListener("click", async () => {
      const email = DATA.profile.email;
      try {
        await navigator.clipboard.writeText(email);
      } catch (e) {
        const area = document.createElement("textarea");
        area.value = email;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        document.body.removeChild(area);
      }
      els.copyEmailLabel.textContent = t("contact.copied");
      setTimeout(() => {
        els.copyEmailLabel.textContent = t("contact.copy");
      }, 1800);
    });

    // Contact form (mailto fallback for static hosting)
    els.contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = els.inputName.value.trim();
      const email = els.inputEmail.value.trim();
      const message = els.inputMessage.value.trim();
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailValid || !message) {
        els.formStatus.textContent = t("form.error");
        els.formStatus.className = "form-status is-error";
        return;
      }

      const subject = encodeURIComponent(`Portfolio Inquiry — ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${DATA.profile.email}?subject=${subject}&body=${body}`;

      els.formStatus.textContent = t("form.sent");
      els.formStatus.className = "form-status is-success";
      els.contactForm.reset();
    });

    // Interactive 1-5 star review picker
    if (els.starPicker) {
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
    }

    // Client review submission
    if (els.reviewForm && window.REVIEWS_STORE) {
      els.reviewForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = els.reviewName.value.trim();
        const service = els.reviewService.value.trim();
        const comment = els.reviewComment.value.trim();

        if (!name || !comment || !(selectedRating >= 1 && selectedRating <= 5)) {
          els.reviewStatus.textContent = t("reviews.error");
          els.reviewStatus.className = "form-status is-error";
          return;
        }

        const saved = window.REVIEWS_STORE.add({
          name: name,
          service: service,
          rating: selectedRating,
          comment: comment,
        });

        if (!saved) {
          els.reviewStatus.textContent = t("reviews.error");
          els.reviewStatus.className = "form-status is-error";
          return;
        }

        els.reviewForm.reset();
        selectedRating = 0;
        hoveredRating = 0;
        updateStarPickerUI();
        renderReviewsSummary();

        els.reviewStatus.className = "form-status is-success";
        els.reviewStatus.innerHTML = `${escapeHtml(t("reviews.saved"))} <a class="inline-review-link" href="reviews.html">${escapeHtml(t("reviews.seeAllLink"))} &rarr;</a>`;
      });
    }
  }

  function setupRevealAndScrollSpy() {
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = ["projects", "skills", "about", "reviews", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              navLinks.forEach((link) => {
                link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
              });
            }
          });
        },
        { rootMargin: "-35% 0px -55% 0px" }
      );
      sections.forEach((sec) => spy.observe(sec));
    }
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
        if (!rafId) {
          rafId = requestAnimationFrame(animate);
        }
      },
      { passive: true }
    );

    document.addEventListener("mouseleave", () => {
      spotlight.classList.remove("is-active");
    });
  }

  function renderAll() {
    renderProfile();
    renderFilters();
    renderProjects();
    renderReviewsSummary();
    updateStarPickerUI();
  }

  renderAll();
  setupEvents();
  setupRevealAndScrollSpy();
  setupCursorGlow();
})();
