import { html, render  } from "./../lib/litHtml.js";
import { page } from "./../lib/page.js";

import { register } from '../services/userService.js';
import { showError } from "../util/notifications.js";

const template = (onSubmit) => html`
        <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${onSubmit}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="#">Login</a></p>
            </form>
          </div>
        </section>
`;

export function registerView(){
    render(template(registerFormHandler));
}

async function registerFormHandler(e){
e.preventDefault();

const formData = new FormData(e.currentTarget);
const email = formData.get('email');
const password = formData.get('password');
const rePass = formData.get('re-password');

if(!email || !password || !rePass){
    return showError("All fields are required!");
}

if(password !== rePass){
    return showError("Passwords don't match!");
}

await register(email, password);

page.redirect('/');

}