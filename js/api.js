// WikiMovie API Integration
const API_KEY = localStorage.getItem("tmdb_api_key") || "6b3c0f9f9da72b488abe9a4fa55a9199";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p";
const PLACEHOLDER_IMG = "assets/img/default/NoImg.jpg";

let currentQuery = "";
let currentPage = 1;
let currentMode = "popular"; // "popular" o "search"

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  loadPopularMovies(1);

  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
      handleSearch();
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    });
  }
});

function handleSearch() {
  const searchInput = document.getElementById("search-input");
  const query = searchInput.value.trim();
  if (query) {
    currentQuery = query;
    currentMode = "search";
    searchMovies(query, 1);
  } else {
    currentMode = "popular";
    loadPopularMovies(1);
  }
}

// Renderizar estado de carga
function showLoading() {
  const container = document.getElementById("categorias");
  if (container) {
    container.innerHTML = `
      <div class="col-12 loading-spinner-wrapper my-5">
        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-3 text-muted">Cargando películas...</p>
      </div>`;
  }
}

// Cargar películas populares
function loadPopularMovies(page = 1) {
  showLoading();
  currentPage = page;
  currentMode = "popular";

  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`)
    .then((response) => {
      if (!response.ok) throw new Error("Error en la solicitud");
      return response.json();
    })
    .then((data) => {
      renderMovieList(data.results || [], page, data.total_pages || 1);
    })
    .catch((error) => {
      console.error("Error al cargar populares:", error);
      showErrorMessage("No se pudieron cargar las películas. Verifica tu conexión o clave de API.");
    });
}

// Buscar películas
function searchMovies(text = "", page = 1) {
  showLoading();
  currentPage = page;
  currentQuery = text;
  currentMode = "search";

  fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(
      text
    )}&page=${page}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) throw new Error("Error en la búsqueda");
      return response.json();
    })
    .then((data) => {
      renderMovieList(data.results || [], page, data.total_pages || 1, text);
    })
    .catch((error) => {
      console.error("Error al buscar películas:", error);
      showErrorMessage("Ocurrió un error al realizar la búsqueda.");
    });
}

// Mensaje de error amigable
function showErrorMessage(message) {
  const container = document.getElementById("categorias");
  if (container) {
    container.innerHTML = `
      <div class="col-12 text-center my-5">
        <i class="bi bi-exclamation-triangle text-warning display-4"></i>
        <h4 class="mt-3">${message}</h4>
        <button class="btn btn-outline-primary mt-3" onclick="loadPopularMovies(1)">Volver a Populares</button>
      </div>`;
  }
}

// Renderizar cuadrícula de películas y paginación
function renderMovieList(movies, page, totalPages, query = "") {
  const container = document.getElementById("categorias");
  if (!container) return;

  if (!movies || movies.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center my-5">
        <i class="bi bi-film text-muted display-4"></i>
        <h3 class="mt-3">No se encontraron películas</h3>
        <p class="text-muted">Intenta buscar con otro término o explorar las populares.</p>
        <button class="btn btn-primary mt-2" onclick="loadPopularMovies(1)">Ver Populares</button>
      </div>`;
    return;
  }

  let html = "";

  // Tarjetas
  movies.forEach((movie) => {
    const backdrop = movie.backdrop_path
      ? `${IMG_BASE_URL}/w780${movie.backdrop_path}`
      : movie.poster_path
      ? `${IMG_BASE_URL}/w500${movie.poster_path}`
      : PLACEHOLDER_IMG;

    const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
    const titleEscaped = (movie.title || "").replace(/"/g, "&quot;");

    html += `
      <div class="col-lg-4 col-md-6 col-12 p-1">
        <div class="portfolio-box movie-card-item rounded-3 shadow-sm" onclick="setData(${movie.id})" role="button" tabindex="0" data-bs-toggle="modal" data-bs-target="#Modal">
          <img class="img-fluid movie-card-img" src="${backdrop}" alt="${titleEscaped}" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}';"/>
          <div class="portfolio-box-caption">
            <div class="project-category text-white-50">
              <span><i class="bi bi-calendar-event me-1"></i>${releaseYear}</span>
              <span class="ms-2"><i class="bi bi-star-fill text-warning me-1"></i>${rating}</span>
            </div>
            <div class="project-name text-white font-weight-bold">${titleEscaped}</div>
          </div>
        </div>
      </div>`;
  });

  // Paginación
  const prevDisabled = page <= 1 ? "disabled" : "";
  const nextDisabled = page >= totalPages ? "disabled" : "";

  const prevAction =
    page > 1
      ? currentMode === "search"
        ? `searchMovies('${escapeQuotes(query)}', ${page - 1})`
        : `loadPopularMovies(${page - 1})`
      : "";

  const nextAction =
    page < totalPages
      ? currentMode === "search"
        ? `searchMovies('${escapeQuotes(query)}', ${page + 1})`
        : `loadPopularMovies(${page + 1})`
      : "";

  html += `
    <div class="col-12 pagination-wrapper">
      <ul class="pagination shadow-sm">
        <li class="page-item ${prevDisabled}">
          <button class="page-link" ${prevDisabled ? "disabled" : ""} onclick="${prevAction}" aria-label="Anterior">
            <i class="bi bi-chevron-left me-1"></i> Anterior
          </button>
        </li>
        <li class="page-item disabled d-none d-sm-block">
          <span class="page-link text-dark bg-white">Página ${page} de ${totalPages}</span>
        </li>
        <li class="page-item ${nextDisabled}">
          <button class="page-link" ${nextDisabled ? "disabled" : ""} onclick="${nextAction}" aria-label="Siguiente">
            Siguiente <i class="bi bi-chevron-right ms-1"></i>
          </button>
        </li>
      </ul>
    </div>`;

  container.innerHTML = html;
}

function escapeQuotes(str) {
  return (str || "").replace(/'/g, "\\'");
}

// Cargar y mostrar detalles de película en el Modal
function setData(id) {
  const modalLabel = document.getElementById("ModalLabel");
  const modalBody = document.getElementById("modal-body");

  if (!modalLabel || !modalBody) return;

  modalLabel.textContent = "Cargando detalles...";
  modalBody.innerHTML = `
    <div class="loading-spinner-wrapper my-5 text-center">
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3 text-muted">Obteniendo información de la película...</p>
    </div>`;

  fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`)
    .then((response) => {
      if (!response.ok) throw new Error("Error al obtener la película");
      return response.json();
    })
    .then((movie) => {
      modalLabel.textContent = movie.title || "Detalle de Película";

      const poster = movie.poster_path
        ? `${IMG_BASE_URL}/w500${movie.poster_path}`
        : PLACEHOLDER_IMG;

      const backdrop = movie.backdrop_path
        ? `${IMG_BASE_URL}/original${movie.backdrop_path}`
        : "";

      const genresHtml = (movie.genres || [])
        .map((g) => `<span class="movie-genre-badge">${g.name}</span>`)
        .join("");

      const companies = (movie.production_companies || [])
        .map((c) => c.name)
        .join(", ") || "No especificado";

      const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
      const votes = movie.vote_count ? `(${movie.vote_count.toLocaleString()} votos)` : "";
      const runtime = movie.runtime ? `${movie.runtime} min` : "Desconocida";
      const releaseDate = movie.release_date || "No disponible";
      const overview = movie.overview || "No hay sinopsis disponible en español para esta película.";
      const tagline = movie.tagline ? `<p class="movie-tagline">"${movie.tagline}"</p>` : "";

      let backdropHtml = "";
      if (backdrop) {
        backdropHtml = `<img class="movie-backdrop-bg" src="${backdrop}" alt="" loading="lazy" />`;
      }

      modalBody.innerHTML = `
        ${backdropHtml}
        <div class="movie-detail-content">
          <div class="movie-poster-box">
            <img src="${poster}" alt="${movie.title}" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}';" />
          </div>
          <div class="movie-info-box">
            <h1>${movie.title}</h1>
            ${tagline}
            
            <div class="movie-rating-badge">
              <i class="bi bi-star-fill"></i>
              <span>${rating} / 10</span>
              <small class="text-dark opacity-75">${votes}</small>
            </div>

            <div class="movie-metadata">
              <span><i class="bi bi-calendar3 me-1 text-primary"></i> Estreno: <strong>${releaseDate}</strong></span>
              <span><i class="bi bi-clock me-1 text-primary"></i> Duración: <strong>${runtime}</strong></span>
            </div>

            <div class="movie-genres-list">
              ${genresHtml}
            </div>

            <h5 class="mt-4 mb-2"><i class="bi bi-card-text me-2 text-primary"></i>Sinopsis</h5>
            <p class="movie-overview">${overview}</p>

            <div class="mt-4 text-muted small">
              <strong><i class="bi bi-building me-1"></i>Productoras:</strong> ${companies}
            </div>
          </div>
        </div>`;
    })
    .catch((error) => {
      console.error("Error al cargar detalles:", error);
      modalBody.innerHTML = `
        <div class="text-center my-5">
          <i class="bi bi-exclamation-circle text-danger display-4"></i>
          <h4 class="mt-3">No se pudo cargar la información de la película</h4>
          <p class="text-muted">Por favor, inténtalo de nuevo más tarde.</p>
        </div>`;
    });
}
