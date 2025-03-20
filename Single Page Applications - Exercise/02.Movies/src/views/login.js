import { showView } from "../util.js";
import homePage from "./home.js";
import { renderNavigation } from "../util.js";

const section = document.getElementById('form-login');
const form = section.querySelector('form');
const loginUrl = 'http://localhost:3030/users/login';

form.addEventListener('submit', onSubmit);


export default function loginPage(){    
    showView(section); 
}

async function onSubmit(e){
    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    await login(email,password);
    form.reset();
    renderNavigation();
    homePage();
}

async function login(email,password){
    try {
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        if(!response.ok){

            const error = await response.json();
            throw new Error(error.message);
        }

        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));

    } catch (error) {
        alert(error.message);
    }
}