import { showView } from "../util.js";
const section = document.getElementById('movie-example');
const movieUrl = `http://localhost:3030/data/movies`;


export default function detailsPage(id){
    showView(section);
    displayMovie(id);
}


async function displayMovie(id){

    const user = JSON.parse(localStorage.getItem('user'));

    const movie = await getMovie(id);
    section.replaceChildren(createMovieCard(movie)); 

}

function createMovieCard(movie){
    const divElement = document.createElement('div');
    divElement.className = "container";

    divElement.innerHTML = 
    `
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
              <img
                class="img-thumbnail"
                src="${movie.img}"
                alt="Movie"
              />
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>
                ${movie.description}
              </p>
              <a class="btn btn-danger" href="#">Delete</a>
              <a class="btn btn-warning" href="#">Edit</a>
              <a class="btn btn-primary" href="#">Like</a>
              <span class="enrolled-span">Liked 1</span>
            </div>
          </div>
    `

    return divElement;
}

async function getMovie(id){

   try {
    const response = await fetch(`${movieUrl}/${id}`);
    const movieData = await response.json();

    return movieData;
   } catch (error) {
    alert(error.message);
   }
}