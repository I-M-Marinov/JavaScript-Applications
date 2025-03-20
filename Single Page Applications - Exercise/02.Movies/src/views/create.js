import { showView } from "../util.js";
import homePage from "./home.js";

const section = document.getElementById('add-movie');
const form = section.querySelector('form');
const moviesUrl = 'http://localhost:3030/data/movies';

form.addEventListener('submit', onSubmit);

export default function createPage(){
    showView(section);      
}

async function onSubmit(e){
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img');

    if(!title|| !description|| !img ){
        return alert('All fields are required !');
    }

    await createMovie(title,description,img);
    form.reset();
    homePage();
}

async function createMovie(title,description,img){

    const user = JSON.parse(localStorage.getItem('user'));



    try {
        const response = await fetch(moviesUrl, {
            method: 'POST',
            headers: {"Content-Type": "application/json",
                "X-Authorization": user.accessToken,
            },
            body: JSON.stringify({title, description, img})
        });

        if(response.status !== 200 || !response.ok){

            const error = await response.json();
            throw new Error(error.message);
        }

    } catch (error) {
        alert(error.message);
    }
}