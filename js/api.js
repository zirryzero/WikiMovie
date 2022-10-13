const apiKey = "6b3c0f9f9da72b488abe9a4fa55a9199";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjNjMGY5ZjlkYTcyYjQ4OGFiZTlhNGZhNTVhOTE5OSIsInN1YiI6IjYzNDY0NDIyZjNiNDlhMDA5MDU0OTdmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cygaPu3Rpk4l3R0aXSof-ek5QwTbYNX7Y7wk5j9gpCU";

fetch(
  "https://api.themoviedb.org/3/movie/popular?api_key=" +
  apiKey +
  "&language=es-ES&page=1"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let html = "";
    const movies = data;
    movies.results.forEach(element => {
      // <a class="portfolio-box" href="" title="${element.overview}">
      if (element.backdrop_path != null) {
        $("#categorias").append(
          `<div class="col-lg-4 col-sm-6">
          <a class="portfolio-box" onclick="setData('${element.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal" title="${element.overview}">
            <img class="img-fluid"  src="https://image.tmdb.org/t/p/w500${element.backdrop_path}" alt="..." style="wi"/>
              <div class="portfolio-box-caption">
                <div class="project-category text-white-50">${element.release_date}</div>
                <div class="project-name">${element.title}</div>
            </div>
          </a>
        </div>`
        );
      }
    });
    // $("#buscar").scroll();
    console.log(movies.results);
  });

function MovieSearch(text = "", page = 1) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${text}&page=${page}&include_adult=false`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let html = "";
      const movies = data;
      if (movies.results.length > 0) {
        html += `<div class="text-center">
      <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <button class="page-link" aria-label="Previous" onclick="MovieSearch('${text}', ${page - 1})">
          <a class="list-search" href="#buscar"><span aria-hidden="true">&laquo;</span></a>
          </button>
        </li>
        
        <li class="page-item">
          <button class="page-link" aria-label="Next" onclick="MovieSearch('${text}', ${page + 1})">
          <a class="list-search" href="#buscar"><span aria-hidden="true">&raquo;</span></a>
          </button>
        </li>
      </ul>
    </nav>
    </div>`;
        movies.results.forEach(element => {
          // <a class="portfolio-box" href="" title="${element.overview}">
          if (element.backdrop_path != null) {
            html +=
              `
            <div class="col-lg-4 col-sm-6">
              <a class="portfolio-box" onclick="setData('${element.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal" title="${element.overview}">
                <img class="img-fluid" src="https://image.tmdb.org/t/p/w500${element.backdrop_path}" alt="..." style="wi"/>
                  <div class="portfolio-box-caption">
                    <div class="project-category text-white-50">${element.release_date}</div>
                    <div class="project-name">${element.title}</div>
                </div>
              </a>
            </div>
            `
              ;
          }
          // else {
          //   html +=
          //     `<div class="col-lg-4 col-sm-6">
          //     <a class="portfolio-box" onclick="setData('${element.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal" title="${element.overview}">
          //       <img class="img-fluid" src="assets/img/default/NoImg.jpg" alt="..." style="wi"/>
          //         <div class="portfolio-box-caption">
          //           <div class="project-category text-white-50">${element.id}</div>
          //           <div class="project-name">${element.title}</div>
          //       </div>
          //     </a>
          //   </div>`
          //     ;
          // }
        });
        html += `<nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <button class="page-link" aria-label="Previous" onclick="MovieSearch('${text}', ${page - 1})">
            <a class="list-search" href="#buscar"><span aria-hidden="true">&laquo;</span></a>
          </button>
        </li>

        <li class="page-item">
          <button class="page-link" aria-label="Next" onclick="MovieSearch('${text}', ${page + 1})">
            <a class="list-search" href="#buscar"><span aria-hidden="true">&raquo;</span></a>
          </button>
        </li>
      </ul>
    </nav>`;
      } else {
        html = `<div class="text-center" style="margin-top: 50px;">
                  <hr class="divider" />
                  <h2 class="mt-0">¡¡¡¡¡ Sin Resultados !!!!!</h2>
                  <hr class="divider" />
                </div>`;
      }
      $("#categorias").html(html)
      console.log(movies.results);
    });
}

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
searchButton.addEventListener('click', () => {
  const inputValue = searchInput.value;
  MovieSearch(inputValue, 1);
});

function setData(id) {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let html = "";
      const movie = data;
      $("#ModalLabel").html(`${movie.title}`);
      if (movie != null) {
        html += `<img class="demo-bg" src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="">
        <div class="content">
          <div class="poster mr-2">
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="poster">`;

        let genre = `<p class="mt-3 ml-5"><strong>Generos: </strong>`;

        movie.genres.forEach(e => {
          genre += `${e.name}, `;
        });

        genre += `</p>`;
        html += genre;

        html += `<p class="ml-5"><strong>Puntuacion:</strong> ${movie.vote_average}</p>`;


        let prod = `<p class="ml-5"><strong>Productores:</strong> `;
        // warner1, warner2, warener 3

        movie.production_companies.forEach(e => {
          prod += `${e.name}, `;
        });

        prod += `</p>`;
        html += prod;


        html += `<p class="ml-5"><strong>Fecha:</strong> ${movie.release_date}</p>
        <p class="ml-5"><strong>Duracion:</strong> ${movie.runtime} Minutos</p>
          </div>
          <div class="info mt-5">
          
          <h1 class="mt-3 ml-4"><strong>${movie.title}</strong></h1>
          <h2 class="mt-4 ml-4">${movie.overview}</h2>
          </div>
        </div>`;
        $("#modal-body").html(html);
        console.log(movie);
      }
    });
  // alert(id);
}