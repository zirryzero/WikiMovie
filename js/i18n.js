// Translations dictionary for WikiMovie
const translations = {
  es: {
    // Nav
    brand: "WikiMovie",
    navAbout: "Acerca",
    navSearch: "Buscar",
    navPopular: "Populares",
    navContact: "Contacto",
    
    // Masthead
    heroTitle: "WikiMovie",
    heroSubtitle: "Tu sitio favorito para descubrir, explorar y conocer todo sobre las películas del momento y los clásicos del cine.",
    btnSearchHero: "Buscar Película",
    btnPopularHero: "Ver Populares",

    // About
    aboutRole: "Desarrollador de Software apasionado por crear experiencias web modernas, interactivas y eficientes.",
    aboutDesc: "<strong>WikiMovie</strong> es una aplicación web interactiva que consume la API en tiempo real de <a href=\"https://www.themoviedb.org/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-white fw-bold\">The Movie Database (TMDb)</a> para consultar catálogos actualizados, puntuaciones, sinopsis oficiales y detalles de producción cinematográfica.",
    btnExplore: "¡Explorar Películas!",

    // Search Section
    searchTitle: "Busca Tu Película Favorita",
    searchSubtitle: "Escribe el título de cualquier película y presiona Enter o Buscar",
    searchPlaceholder: "Ej. Inception, Avatar, Avengers...",
    btnSearch: "Buscar",

    // Catalog Section
    catalogTitle: "Catálogo de Películas",
    loadingText: "Cargando películas...",
    noResultsTitle: "No se encontraron películas",
    noResultsDesc: "Intenta buscar con otro término o explorar las populares.",
    btnBackPopular: "Ver Populares",
    errorLoading: "No se pudieron cargar las películas. Verifica tu conexión o clave de API.",
    errorSearch: "Ocurrió un error al realizar la búsqueda.",
    btnRetry: "Volver a Populares",

    // Pagination
    btnPrev: "Anterior",
    btnNext: "Siguiente",
    pageIndicator: "Página {current} de {total}",

    // Modal
    modalDefaultTitle: "Detalle de Película",
    modalLoading: "Obteniendo información de la película...",
    modalRelease: "Estreno",
    modalRuntime: "Duración",
    modalMinutes: "min",
    modalSynopsis: "Sinopsis",
    modalProducers: "Productoras",
    modalNotSpecified: "No especificado",
    modalNoOverview: "No hay sinopsis disponible en este idioma para esta película.",
    modalVotes: "votos",
    modalError: "No se pudo cargar la información de la película",
    modalErrorDesc: "Por favor, inténtalo de nuevo más tarde.",
    btnClose: "Cerrar",

    // Contact
    contactTitle: "¡Mantengámonos en contacto!",
    contactSubtitle: "¿Tienes alguna consulta o propuesta de proyecto? No dudes en contactarme a través de mis canales profesionales.",

    // Footer
    footerRights: "Copyright &copy; 2024 - <a href=\"https://www.linkedin.com/in/harold-david-perez-ortega-857955121/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-white text-decoration-underline\">Harold Pérez</a>. Datos y multimedia provistos por <a href=\"https://www.themoviedb.org/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-white-50\">TMDb</a>."
  },
  en: {
    // Nav
    brand: "WikiMovie",
    navAbout: "About",
    navSearch: "Search",
    navPopular: "Popular",
    navContact: "Contact",

    // Masthead
    heroTitle: "WikiMovie",
    heroSubtitle: "Your favorite place to discover, explore, and learn everything about trending movies and timeless classics.",
    btnSearchHero: "Search Movie",
    btnPopularHero: "View Popular",

    // About
    aboutRole: "Software Developer passionate about crafting modern, interactive, and high-performance web experiences.",
    aboutDesc: "<strong>WikiMovie</strong> is an interactive web app powered by the real-time API of <a href=\"https://www.themoviedb.org/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-white fw-bold\">The Movie Database (TMDb)</a> to explore up-to-date catalogs, ratings, official synopses, and film production details.",
    btnExplore: "Explore Movies!",

    // Search Section
    searchTitle: "Search Your Favorite Movie",
    searchSubtitle: "Type any movie title and press Enter or Search",
    searchPlaceholder: "E.g. Inception, Avatar, Avengers...",
    btnSearch: "Search",

    // Catalog Section
    catalogTitle: "Movie Catalog",
    loadingText: "Loading movies...",
    noResultsTitle: "No movies found",
    noResultsDesc: "Try searching with another keyword or explore popular titles.",
    btnBackPopular: "View Popular",
    errorLoading: "Could not load movies. Please check your connection or API key.",
    errorSearch: "An error occurred while searching for movies.",
    btnRetry: "Back to Popular",

    // Pagination
    btnPrev: "Previous",
    btnNext: "Next",
    pageIndicator: "Page {current} of {total}",

    // Modal
    modalDefaultTitle: "Movie Details",
    modalLoading: "Fetching movie details...",
    modalRelease: "Release Date",
    modalRuntime: "Runtime",
    modalMinutes: "min",
    modalSynopsis: "Synopsis",
    modalProducers: "Production Companies",
    modalNotSpecified: "Not specified",
    modalNoOverview: "No synopsis available in this language for this movie.",
    modalVotes: "votes",
    modalError: "Could not load movie information",
    modalErrorDesc: "Please try again later.",
    btnClose: "Close",

    // Contact
    contactTitle: "Let's Get In Touch!",
    contactSubtitle: "Have questions or interested in working together? Feel free to reach out through my professional channels.",

    // Footer
    footerRights: "Copyright &copy; 2024 - <a href=\"https://www.linkedin.com/in/harold-david-perez-ortega-857955121/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-white text-decoration-underline\">Harold Pérez</a>. Data and media provided by <a href=\"https://www.themoviedb.org/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-white-50\">TMDb</a>."
  }
};

let currentLang = localStorage.getItem("wikimovie_lang") || "es";

function getT(key) {
  if (translations[currentLang] && translations[currentLang][key]) {
    return translations[currentLang][key];
  }
  return translations.es[key] || key;
}

function updatePageLanguage() {
  document.documentElement.lang = currentLang;

  // Actualizar todos los elementos con atributo data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[currentLang][key]) {
      el.innerHTML = translations[currentLang][key];
    }
  });

  // Actualizar atributos como placeholder o aria-label
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[currentLang][key]) {
      el.setAttribute("placeholder", translations[currentLang][key]);
    }
  });

  // Actualizar botones de selector de idioma
  const btnEs = document.getElementById("lang-btn-es");
  const btnEn = document.getElementById("lang-btn-en");
  if (btnEs && btnEn) {
    if (currentLang === "es") {
      btnEs.classList.add("active");
      btnEn.classList.remove("active");
    } else {
      btnEn.classList.add("active");
      btnEs.classList.remove("active");
    }
  }
}

function setLanguage(lang) {
  if (lang !== "es" && lang !== "en") return;
  currentLang = lang;
  localStorage.setItem("wikimovie_lang", lang);
  updatePageLanguage();

  // Recargar datos actuales en el nuevo idioma
  if (typeof refreshCurrentView === "function") {
    refreshCurrentView();
  }
}

