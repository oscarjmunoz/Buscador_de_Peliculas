const apiKey = "4d926d8a";
const apiUrl = `https://www.omdbapi.com/`;
;

//obtenemos el elemento del boton de busqueda a traves del id
const buttonSearch = document.getElementById("buttonSearch");

//asociamos un event listener al boton de busqueda para ejecutar la funcion que traera los resultados de la API
buttonSearch.addEventListener("click", searchMovies);

//definomos la funcino searchMovies para buscar las peliculas
async function searchMovies() {
  //obtenemos el termino de busqueda desde el input
  const searchTerm = document.getElementById("inputsearch").value;

  //obtenemos la lista de las peliculas para mostrar los resultados
    const movieList = document.getElementById("movieList");
  movieList.innerHTML = ""; // limpiamos el contenido previo

    try {
    const response = await fetch (`${apiUrl}?apiKey=${apiKey}&s=${searchTerm}`);
    const data = await response.json(); //convertimos la respuesta de la API a formato JSON

    if (data.Response === "True") {
      //iteramos los resultados y crearemos los respectivos elementos HTML para mostrar las peliculas
        data.Search.forEach(async (movie) => {
        //realizaremos una peticion a la API para obtener la informacion de la pelicula
        const movieDetailResponse = await fetch(`${apiUrl}?apiKey=${apiKey}&i=${movie.imdbID}`
        );
        const movieDetailsData = await movieDetailResponse.json();

        //crearemos los elementos HTML para representar la informacion de la pelicula
        const article = document.createElement("article"); // con el document.crateElement generamos un nuevo elemento
        article.classList.add("movie-list__card"); // con el classList.add le asignamos la clase que queramos

        const cardImg = document.createElement("div");
        cardImg.classList.add("card__img");

        const moviePoster = document.createElement("img");
        moviePoster.src = movieDetailsData.Poster; // asignamos en el atributo src, la ruta del poster de la pelicula
        moviePoster.alt = `${movie.title} Poster`; // asignamos en el atributo alt, la ruta del poster de la pelicula

        const movieTitle = document.createElement("h4");
        movieTitle.classList.add("card__movie-title");
        movieTitle.textContent = `${movie.Title} (${movie.Year})`; // asignamos en el textContent, el titulo de la pelicula para que se muestr en el elemento h4

        const cardMovieTitleBox = document.createElement("div");
        cardMovieTitleBox.classList.add("card__title-box");

        //estructuraremos los elmentos HTML creados,de acuerdo a su jerarquia en el DOM
        movieList.appendChild(article);
        article.appendChild(cardImg);
        cardImg.appendChild(moviePoster);
        cardImg.appendChild(cardMovieTitleBox);
        cardMovieTitleBox.appendChild(movieTitle);
    });
    } else {
      //si no se encuentran las peliculas para mostrar; se visualisa un mensaje de error
      const p = document.createElement("p"); // creamos un elemento P
      p.innerHTML =
        '<i class="bx bx-info-circle"></i> No se Encontraron Peliculas';
      movieList.appendChild(p);
      p.classList.add("movies-app__alert");
    }
    } catch (error) {
    //en caso de error de conexion con la API, mostramos un mensaje de error por consola
    console.log("error al buscar peliculas:", error);
    }
}
