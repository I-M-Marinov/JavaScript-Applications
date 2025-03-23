import { showView } from "../util.js";
import homePage from "./home.js";
import { editPage } from "./edit.js";

const section = document.getElementById('movie-example');
const movieUrl = `http://localhost:3030/data/movies`;
const allLikesUrl = `http://localhost:3030/data/likes`;


export default async function detailsPage(id){
    showView(section);
    await displayMovie(id);
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

    // if(loggedInUser){
    //     divElement.querySelector(".col-md-4.text-center").innerHTML += createControls(movie, user, likes, ownLike);
    // }
    
    const likeButton = divElement.querySelector('.liking-btn');

    if(likeButton){
        likeButton.addEventListener('click', (e) => likeMovie(e, movie._id));
    }

    return divElement;
}


function createControls(movie, user, likes, ownLike){

    try {
        const loggedInUser = Boolean(user);
        const isOwner = user?._id === movie._ownerId;
        const alreadyLiked = ownLike;

        const controls = [];

        // if(loggedInUser && isOwner){
        
        //     controls.push(`<a class="btn btn-danger" id="${movie._id}" href="#">Delete</a>`);
        //     controls.push(`<a class="btn btn-warning" id="${movie._id}" href="#">Edit</a>`);
        //     controls.push(`<span class="enrolled-span">Liked ${likes}</span>`);

        // } else if (loggedInUser && !isOwner){ 

        //     if(!alreadyLiked){
                
        //         controls.push(`<a class="btn btn-primary like-btn" href="#">Like</a>`);
        //         if(likes > 0){
        //             controls.push(`<span class="enrolled-span">Liked ${likes}</span>`);
        //         }
        //     } else {
        //         controls.push(`<a class="btn btn-danger" id="${movie._id}" href="#" style="display:none;">Delete</a>`);
        //         controls.push(`<a class="btn btn-warning" id="${movie._id}" href="#" style="display:none;">Edit</a>`);
        //         controls.push(`<span class="enrolled-span">Liked ${likes}</span>`);
        //     }
        // } else if (!loggedInUser) {
        //     controls.push(`<a class="btn btn-danger" id="${movie._id}" href="#" style="display:none;">Delete</a>`);
        //     controls.push(`<a class="btn btn-warning" id="${movie._id}" href="#" style="display:none;">Edit</a>`);
        //     controls.push(`<a class="btn btn-primary like-btn" href="#" style="display:none;">Like</a>`);

        //     if(likes > 0){
        //         controls.push(`<span class="enrolled-span">Liked ${likes}</span>`);
        //     }
        // }

         controls.push(`<a class="btn btn-danger delete-btn" id="${movie._id}" href="#" style="display: ${loggedInUser && isOwner ? 'inline-block' : 'none'};">Delete</a>`);
         controls.push(`<a class="btn btn-warning edit-btn" id="${movie._id}" href="#" style="display: ${loggedInUser && isOwner ? 'inline-block' : 'none'};">Edit</a>`);
         controls.push(`<a class="btn btn-primary liking-btn" href="#" style="display: ${loggedInUser && !isOwner && !alreadyLiked ? 'inline-block' : 'none'};">Like</a>`);
         
         controls.push(`<span class="enrolled-span" style="display: ${loggedInUser ? 'inline-block' : 'none'};">Liked ${likes}</span>`);
    
    return controls.join(" ");

    } catch (error) {
        alert(error.message);
    }
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
     const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count `);
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
     const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
     const ownLikes = await response.json();

     return ownLikes.length > 0;

    } catch (error) {
     alert(error.message);
    }
 }

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

async function displayMovie(id) {
    const user = JSON.parse(localStorage.getItem('user'));

    const [movie, likes, ownLike] = await Promise.all([
        getMovie(id), 
        getLikes(id), 
        getOwnLikes(id, user)
    ]);

    console.log(`${movie}, ${likes} ${ownLike}`);
    

    section.replaceChildren(createMovieCard(movie, user, likes, ownLike));

    await new Promise(resolve => setTimeout(resolve, 100));
}

 async function likeMovie(e, movieId){
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

     await fetch(allLikesUrl, {
        method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": user.accessToken,
            },
            body: JSON.stringify({ movieId: movieId })
    })

     detailsPage(movieId);

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
        await editPage(id);
    }
    
});



