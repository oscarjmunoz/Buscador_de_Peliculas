const apiKey='4d926d8a';
const apiUrl='http://www.omdbapi.com/';

//obtenemos el elemento del boton de busqueda a traves del id
const buttonSearch = document.getElementById('buttonSearch');
//asociamos un event listener al boton de busqueda para ejecutar la funcion que traera los resultados de la API
buttonSearch.addEventListener('click' searchMovies);

//definomos la funcino searchMovies para buscar las peliculas
async function serachMovies(){
    //obtenemos el termino de busqueda desde el input
    const searchTerm =document.getElementById('inputsearch').ariaValueMax;

    //obtenemos la lista de las peliculas para mostrar los resultados
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = ''; // limpiamos el contenido previo

    try{
        const response = await fetch('${apiUrl}?apiKey=${apiKey}&s=${searchTerm}');
        const data = await response.json(); //convertimos la respuesta de la API a formato JSON 

        if (data.response === 'true') {
            //iteramos los resultados y crearemos los respectivos elementos HTML para mostrar las peliculas
            data.Search.forEach( async movie => {
                //realizaremos una peticion a la API para obtener la informacion de la pelicula
                const movieDetailResponse = await fetch('${apiUrl}?apiKey=${apiKey}&i=${movie.imdbID}');
            })
        }
    
    }
}