import { showView, renderNavigation } from "../util.js";
import homePage from "./home.js";

const section = document.getElementById('form-sign-up');
const form = section.querySelector('form');
const registerUrl = 'http://localhost:3030/users/register';

form.addEventListener('submit', onSubmit);

export default function registerPage(){
    showView(section);    
}

async function onSubmit(e){
    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('repeatPassword');

    if(email?.lenght <= 0 || password?.lenght <= 0 || rePassword?.lenght <= 0 ){
        return alert('All fields are required !');
    }

    if(password !== rePassword){
        return alert('Passwords must match !');
    }

    await register(email,password);
    form.reset();
    renderNavigation();
    homePage();
}

async function register(email,password){
    try {
        const response = await fetch(registerUrl, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        if(response.status !== 200 || !response.ok){

            const error = await response.json();

            throw new Error(error.message);
        }

        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));

    } catch (error) {
        alert(error.message);
    }
}