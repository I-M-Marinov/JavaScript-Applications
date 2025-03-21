import { showView } from "../util.js";
import detailsPage from "./details.js";

const section = document.getElementById('edit-movie');
const form = section.querySelector('form');
const movieUrl = `http://localhost:3030/data/movies`;



export function editPage(id){
    showView(section);
    getMovieData(id);
}

async function getMovieData(id){

    const response = await fetch(`${movieUrl}/${id}`);
    const movie = await response.json();

    section.querySelector('[name="title"]').value = movie.title;
    section.querySelector('[name="description"]').value = movie.description;
    section.querySelector('[name="img"]').value = movie.img;

    form.setAttribute('id', id);

    form.addEventListener('submit', editMovie);
}

export async function editMovie(ev){
    ev.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img');

    if(!title|| !description|| !img ){
        return alert('All fields are required !');
    }


    try {
        const user = JSON.parse(localStorage.getItem('user'));

        const response = await fetch(`${movieUrl}/${ev.target.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json",
            "X-Authorization": user.accessToken},
        
        body: JSON.stringify({title, description, img})
        });
    
        if(!response.ok){
            const error = response.json();
            throw new Error(error.message);
        }
    } catch (error) {
        alert(error.message);
    }

    detailsPage(ev.target.id);

}


