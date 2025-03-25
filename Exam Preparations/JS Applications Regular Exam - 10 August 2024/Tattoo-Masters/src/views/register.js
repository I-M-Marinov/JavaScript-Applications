import { html, render  } from "./../lib/litHtml.js";
import {page} from "./../lib/page.js";

import { allFieldsRequired } from '../const/constants.js';
import { passwordsShouldMatch } from '../const/constants.js';

import { register } from '../services/userService.js';

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
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`;

export function registerView(){
    render(template(handleRegisterForm));
}

async function handleRegisterForm(e){
e.preventDefault();

const formData = new FormData(e.currentTarget);
const email = formData.get('email');
const password = formData.get('password');
const rePass = formData.get('re-password');

if(!email || !password || !rePass){
    return alert(allFieldsRequired);
}

if(password !== rePass){
    return alert(passwordsShouldMatch);
}

await register(email, password);

page.redirect('/');

}