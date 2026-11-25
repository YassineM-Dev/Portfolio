(function () {
  "use strict";

  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) return;

  const UI_STRINGS = {
    en: {
      "nav.projects": "Projects",
      "nav.about": "About",
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
      "projects.code": "GitHub",
      "about.kicker": "Background",
      "about.title": "About",
      "about.stackKicker": "Capabilities",
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
      "modal.viewCode": "View on GitHub",
      "modal.noLinks": "Project links can be added in assets/js/data.js at any time.",
    },
    fr: {
      "nav.projects": "Projets",
      "nav.about": "À propos",
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
      "projects.code": "GitHub",
      "about.kicker": "Parcours",
      "about.title": "À propos",
      "about.stackKicker": "Compétences",
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
      "modal.viewCode": "Voir sur GitHub",
      "modal.noLinks": "Les liens du projet peuvent être ajoutés dans assets/js/data.js.",
    },
  };

  let currentLang = getSavedLang();
  let activeCategory = "all";
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
    aboutCopy: document.getElementById("about-copy"),
    skillsList: document.getElementById("skills-list"),
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
                <span>6 Sections &middot; Study Sheets</span>
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
                  <span>Official Channels</span>
                  <span class="gp-arrow mono">&nearr;</span>
                </div>
                <div class="gp-link-row is-subtle">
                  <span>Edits &amp; Highlights</span>
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

    // About paragraphs
    const paragraphs = localized(p.about);
    els.aboutCopy.innerHTML = Array.isArray(paragraphs)
      ? paragraphs.map((line) => `<p>${escapeHtml(line)}</p>`).join("")
      : "";

    // Skills
    els.skillsList.innerHTML = DATA.skills
      .map(
        (group) => `
        <div class="skill-group">
          <h3 class="skill-group-title">${escapeHtml(localized(group.group))}</h3>
          <div class="tag-list">
            ${group.items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
      `
      )
      .join("");

    // Social links
    els.socialLinks.innerHTML = p.links
      .map(
        (link) => `
        <a class="social-link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">
          <span>${escapeHtml(link.label)}</span>
          ${arrowUpRightIcon()}
        </a>
      `
      )
      .join("");
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
        if (project.liveUrl) {
          extLinks.push(
            `<a class="ext-link" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("projects.live"))} ${arrowUpRightIcon()}</a>`
          );
        }
        if (project.repoUrl) {
          extLinks.push(
            `<a class="ext-link" href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("projects.code"))} ${arrowUpRightIcon()}</a>`
          );
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
    if (project.liveUrl) {
      actions.push(
        `<a class="btn btn-primary" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("modal.openLive"))} ${arrowUpRightIcon()}</a>`
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
    const sections = ["projects", "about", "contact"]
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

  function renderAll() {
    renderProfile();
    renderFilters();
    renderProjects();
  }

  renderAll();
  setupEvents();
  setupRevealAndScrollSpy();
})();
