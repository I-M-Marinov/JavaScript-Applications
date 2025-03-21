import { showView } from "../util.js";
import homePage from "./home.js";
import { editPage } from "./edit.js";

const section = document.getElementById('movie-example');
const movieUrl = `http://localhost:3030/data/movies`;
const allLikesUrl = `http://localhost:3030/data/likes`;
const likesUrl = `http://localhost:3030/data/likes?where=movieId%3D%22`;


export default function detailsPage(id){
    showView(section);
    displayMovie(id);
}


async function displayMovie(id){

    const user = JSON.parse(localStorage.getItem('user'));

    const [movie, likes, ownLike] = await Promise.all([getMovie(id), getLikes(id), getOwnLikes(id, user)])

    section.replaceChildren(createMovieCard(movie, user, likes, ownLike)); 

}

function createMovieCard(movie, user, likes, ownLike){
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
            ${createControls(movie, user, likes, ownLike)}
        </div>
        </div>
    `

    console.log(movie);
    
    const likeButton = divElement.querySelector('.like-btn');

    if(likeButton){
        likeButton.addEventListener('click', async (e) => await likeMovie(e, movie._id));
    }

    return divElement;
}

async function likeMovie(e, movieId){
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    await fetch(allLikesUrl, {
        method: 'POST',
            headers: {"Content-Type": "application/json",
                "X-Authorization": user.accessToken,
            },
            body: JSON.stringify({ movieId })
    })

    detailsPage(movieId);

}


function createControls(movie, user, likes, ownLike){

    const isOwner = user && user._id === movie._ownerId;
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const alreadyLiked = true ? ownLike > 0 : false;

    const controls = [];

    if(isOwner && loggedInUser){
       
        controls.push(`<a class="btn btn-danger" id=${movie._id} href="#">Delete</a>`);
        controls.push(`<a class="btn btn-warning" id=${movie._id} href="#">Edit</a>`);
        controls.push(`<span class="enrolled-span">Liked ${likes}</span>`);

    } else if (user && loggedInUser){ 

        if(!alreadyLiked){

            controls.push(`<a class="btn btn-primary like-btn" href="#">Like</a>`);
        } else {

            controls.push(`<span class="enrolled-span">Liked ${likes}</span>`);
        }
    } 
    return controls.join(" ");
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

async function getLikes(movieId){

    try {
     const response = await fetch(`${likesUrl}${movieId}%22&distinct=_ownerId&count`);
     const likes = await response.json();
      
     return likes;

    } catch (error) {
     alert(error.message);
    }
 }

 
async function getOwnLikes(movieId, user){

    if(!user){
        return;
    }

    const userId = user._id;

    try {


     const response = await fetch(`${likesUrl}${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
     const ownLikes = await response.json();
 
     return ownLikes;

    } catch (error) {
     alert(error.message);
    }
 }

 section.addEventListener('click', async (e) => {
    e.preventDefault();

    const {id} = e.target;
    if(e.target.tagName === 'A' && e.target.textContent === 'Delete'){
        await deleteMovie(id);
        homePage();
    }
    
});

section.addEventListener('click', async (e) => {
    e.preventDefault();

    const {id} = e.target;
    if(e.target.tagName === 'A' && e.target.textContent === 'Edit'){
        editPage(id);
    }
    
});



 async function deleteMovie(id){

    try {
        const user = JSON.parse(localStorage.getItem('user'));

        const response = await fetch(`${movieUrl}/${id}`, {
            method: "DELETE",
            headers: {"X-Authorization": user.accessToken,}
        });

        if(!response.ok){
            const error = response.json();
            throw new Error(error.message);
        }

    } catch (error) {
        homePage();
        alert(error.message);
    }
 }