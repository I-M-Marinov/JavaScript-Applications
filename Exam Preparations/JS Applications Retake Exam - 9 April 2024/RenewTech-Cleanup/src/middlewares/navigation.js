import { html, render } from "./../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../util/users.js";

const template = (isLoggedIn) => 
  html`
<a id="logo" href="/"
          ><img id="logo-img" src="./images/logo2.png" alt="logo"/>
        </a>
        <nav>
          <div>
            <a href="/dashboard">Solutions</a>
          </div>

         ${isLoggedIn ? html`
          <div class="user">
            <a href="/add">Add Solution</a>
            <a href="/logout">Logout</a>
          </div>` 
          : html`
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`}
        </nav>`;


  export function renderNavigation(ctx, next) {

    const headerElement = document.querySelector("header"); 

    const userData = getUserData();
    const isLoggedIn = !!userData?.email;
    
    render(template(isLoggedIn), headerElement);
  
    next();
  }