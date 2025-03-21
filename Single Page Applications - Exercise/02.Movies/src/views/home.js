import { showView } from "../util.js";
import detailsPage from "./details.js";

const section = document.getElementById('home-page');
const moviesUrl = 'http://localhost:3030/data/movies';
const catalog = section.querySelector('#movie .card-deck.d-flex.justify-content-center');

// on click on the catalog so it is redirecting to the details page 

catalog.addEventListener('click', event => {
    if(event.target.tagName === "BUTTON"){
        event.preventDefault();

        const { id } = event.target.dataset;
        detailsPage(id);
        
    }
})

export default function homePage(){
    showView(section);
    viewMovies();
}

function createMovieCard(movie){
    const liElement = document.createElement('li');
    liElement.className = 'card mb-4';

    liElement.innerHTML = 
    `<img class="card-img-top"  src="${movie.img}" alt="Card image cap" width="400"/>
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
            <a href="/details/${movie._id}">
             <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
            </a>
        </div>
        <div class="card-footer">
           
        </div>
    `;

    return liElement;
}

async function viewMovies(){
    const movies = await getMovies();
    catalog.replaceChildren(... movies.map(createMovieCard));
}

async function getMovies(){
    try {
        const response = await fetch(moviesUrl);
        const movies = await response.json();

        return movies;
    } catch (error) {
        alert(error.message);
    }
}