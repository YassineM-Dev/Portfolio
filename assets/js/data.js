/**
 * Portfolio Data Configuration — Yassine
 *
 * How to add a new project:
 * Copy one object inside the `projects` array below, increment its `index`,
 * update the fields, and save. The portfolio grid, counter, filters, and
 * detail modal update automatically.
 */

window.PORTFOLIO_DATA = {
  profile: {
    name: "Yassine",
    initials: "Y.",
    email: "yassinemami41@gmail.com",
    availability: {
      en: "Available for projects",
      fr: "Disponible pour des projets",
    },
    eyebrow: {
      en: "Software Developer",
      fr: "Développeur Logiciel",
    },
    headline: {
      en: "Designing and building focused software.",
      fr: "Concevoir et développer des logiciels épurés.",
    },
    subheadline: {
      en: "I build modern desktop and web applications, developer environments, and lightweight utilities focused on clarity, structure, and performance.",
      fr: "Je conçois des applications bureau et web modernes, des environnements de développement et des utilitaires rapides, centrés sur la clarté et la performance.",
    },
    location: {
      en: "Remote / Worldwide",
      fr: "À distance / International",
    },
    focus: {
      en: "Desktop & Web Apps",
      fr: "Apps Bureau & Web",
    },
    about: {
      en: [
        "I am Yassine, a software developer focused on building practical tools that feel fast, structured, and purposeful. I prioritize clean architecture and restrained interfaces over unnecessary complexity.",
        "From a full desktop algorithmics IDE to lightweight everyday utilities, every project in this portfolio is engineered to solve real workflows with maintainable code and attention to detail.",
      ],
      fr: [
        "Je suis Yassine, développeur logiciel orienté vers la création d'outils pratiques, rapides et bien structurés. Je privilégie une architecture propre et des interfaces sobres plutôt que la complexité inutile.",
        "D'un IDE bureau complet dédié à l'algorithmique aux utilitaires du quotidien, chaque projet présenté ici répond à un besoin concret avec rigueur et simplicité.",
      ],
    },
    links: [
      { label: "GitHub", url: "https://github.com/YassineM-Dev" },
    ],
  },

  skills: [
    {
      group: { en: "Languages & Core", fr: "Langages & Fondamentaux" },
      items: ["TypeScript", "JavaScript", "C# / .NET", "Algorithms"],
    },
    {
      group: { en: "Applications & UI", fr: "Applications & UI" },
      items: ["React", "Electron", "HTML / CSS", "Windows Forms"],
    },
    {
      group: { en: "Engineering & Tools", fr: "Ingénierie & Outils" },
      items: ["Monaco Editor", "FFmpeg", "Vite", "Desktop Builds"],
    },
  ],

  /**
   * Projects List
   * Optional fields:
   * - image: path to a screenshot (e.g. "./assets/algostudio.png"). Leave "" to use the built-in minimal preview.
   * - liveUrl: URL to the live demo. Leave "" if not deployed yet.
   * - repoUrl: URL to the source code repository. Leave "" if private.
   */
  projects: [
    {
      id: "algostudio",
      index: "01",
      title: "AlgoStudio",
      year: "2026",
      category: {
        key: "desktop-ide",
        en: "Desktop IDE",
        fr: "IDE Bureau",
      },
      status: {
        en: "Active",
        fr: "Actif",
      },
      summary: {
        en: "Dedicated Windows desktop IDE for writing, running, and debugging algorithmic pseudocode with automatic TDO and execution trace.",
        fr: "IDE bureau Windows dédié à l'écriture, l'exécution et le débogage d'algorithmes en pseudocode avec TDO et trace automatiques.",
      },
      description: {
        en: "AlgoStudio is a dedicated desktop IDE built for writing and executing structured algorithmic pseudocode. Powered by Monaco Editor, React, and Electron, it runs algorithms in real time, automatically generates variable declaration tables (TDO) and execution traces, and integrates a built-in reference guide, 27 standard modules, and auto-updating Windows releases.",
        fr: "AlgoStudio est un IDE bureau Windows conçu pour écrire et exécuter des algorithmes en pseudocode selon la convention officielle. Basé sur Monaco Editor, React et Electron, il exécute le code en temps réel, génère automatiquement le TDO et la trace d'exécution, et intègre un guide complet, 27 modules standards ainsi que des mises à jour automatiques.",
      },
      highlights: {
        en: [
          "Real-time pseudocode interpreter with automatic TDO and step-by-step trace output",
          "Multi-tab Monaco editor supporting algorithmic symbols (← ≠ ≤ ≥), smart completion, and Light/Dark themes",
          "Packaged as Windows Setup (auto-update) and Portable executables with automated tests",
        ],
        fr: [
          "Interpréteur pseudocode en temps réel avec génération automatique du TDO et de la trace d'exécution",
          "Éditeur Monaco multi-onglets avec symboles algorithmiques (← ≠ ≤ ≥), complétion et mode clair/sombre",
          "Distribué en installateur Windows (auto-update) et version portable avec tests automatisés",
        ],
      },
      stack: ["TypeScript", "React", "Electron", "Monaco Editor"],
      visualType: "algostudio",
      image: "",
      liveUrl: "",
      repoUrl: "https://github.com/YassineM-Dev/algostudio",
    },
    {
      id: "compresseur-app",
      index: "02",
      title: "Compresseur App",
      year: "2026",
      category: {
        key: "utility",
        en: "Utility",
        fr: "Utilitaire",
      },
      status: {
        en: "Active",
        fr: "Actif",
      },
      summary: {
        en: "Windows desktop utility for high-quality FFmpeg video compression (CRF) and instant 60 / 120 FPS timestamp patching.",
        fr: "Utilitaire bureau Windows pour la compression vidéo FFmpeg haute qualité (CRF) et le patch instantané 60 / 120 FPS.",
      },
      description: {
        en: "Compresseur App is a self-contained C# / .NET 8 Windows desktop application powered by FFmpeg. Built with a custom frosted-glass drag-and-drop interface, it combines high-efficiency libx264 CRF video compression with lossless 60/120 FPS stream-copy timestamp patching, bundled FFmpeg auto-extraction, and live Discord Rich Presence status.",
        fr: "Compresseur App est une application bureau Windows autonome en C# / .NET 8 propulsée par FFmpeg. Dotée d'une interface moderne en verre dépoli avec glisser-déposer, elle réunit compression vidéo libx264 (CRF), patch instantané 60/120 FPS sans ré-encodage, extraction automatique de FFmpeg et statut Discord Rich Presence en direct.",
      },
      highlights: {
        en: [
          "High-quality libx264 video compression with selectable CRF presets (16–26) and Lanczos scaling",
          "Instant 60 / 120 FPS timestamp patching via stream-copy without re-encoding",
          "Self-contained .NET 8 single-file executable with bundled FFmpeg and Discord Rich Presence",
        ],
        fr: [
          "Compression vidéo libx264 haute qualité avec niveaux CRF configurables (16–26) et mise à l'échelle Lanczos",
          "Patch instantané des timestamps 60 / 120 FPS en copie directe sans ré-encodage",
          "Exécutable autonome .NET 8 intégrant FFmpeg et l'affichage de statut Discord Rich Presence",
        ],
      },
      stack: ["C#", ".NET 8", "FFmpeg", "Windows Desktop"],
      visualType: "compresseur",
      image: "",
      liveUrl: "",
      repoUrl: "https://github.com/YassineM-Dev/CompresseurApp",
    },
    {
      id: "bac-for-all",
      index: "03",
      title: "Bac For All",
      year: "2026",
      category: {
        key: "web-app",
        en: "Web App",
        fr: "Application Web",
      },
      status: {
        en: "Live",
        fr: "En ligne",
      },
      summary: {
        en: "Structured revision web platform organizing Tunisian Baccalaureate study sheets and summaries across all 6 academic sections.",
        fr: "Plateforme web éducative regroupant les fiches de révision et résumés du Baccalauréat Tunisien pour les 6 sections.",
      },
      description: {
        en: "Bac For All is a fast, distraction-free educational website built to help Baccalaureate students review efficiently. Students choose their academic track (Computer Science, Mathematics, Experimental Sciences, Technical, Economics & Management, or Literature) to access structured subject summaries with responsive Light and Dark reading modes.",
        fr: "Bac For All est un site éducatif rapide et épuré conçu pour aider les élèves du Baccalauréat Tunisien à réviser efficacement. Chaque élève choisit sa section (Informatique, Mathématiques, Sciences Expérimentales, Techniques, Économie & Gestion ou Lettres) pour accéder aux fiches organisées par matière avec mode clair et sombre.",
      },
      highlights: {
        en: [
          "Covers all 6 Tunisian Baccalaureate sections with structured subject cheat sheets",
          "Clean section-picker workflow built for fast revision on desktop and mobile",
          "Lightweight static architecture with persistent Light and Dark reading modes",
        ],
        fr: [
          "Couvre les 6 sections du Baccalauréat Tunisien avec des fiches structurées par matière",
          "Navigation rapide par choix de section adaptée aux écrans PC et mobile",
          "Architecture web légère avec mode lecture clair et sombre persistant",
        ],
      },
      stack: ["HTML", "CSS", "JavaScript", "Education"],
      visualType: "bac-sheet",
      image: "",
      liveUrl: "https://yassinem-dev.github.io/Bac-For-All/",
      repoUrl: "https://github.com/YassineM-Dev/Bac-For-All",
    },
  ],
};
