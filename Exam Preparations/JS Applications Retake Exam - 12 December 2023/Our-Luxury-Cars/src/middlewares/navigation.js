import { html, render } from "./../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../util/users.js";

const template = (isLoggedIn) => 
  html`
<a id="logo" href="/"><img id="logo-car" src="./images/car-logo.png" alt="img"/></a>
        <nav>
          <div>
            <a href="/cars">Our Cars</a>
            <a href="/search">Search</a>
          </div>

          ${isLoggedIn
            ? html` <div class="user">
            <a href="/add">Add Your Car</a>
            <a href="/logout">Logout</a>
          </div>`
            : html`<div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`}
        </nav>`;


  export function renderNavigation(ctx, next) {

    const headerEl = document.querySelector("header"); 

    const userData = getUserData();
    const isLoggedIn = !!userData?.email;
    
    render(template(isLoggedIn), headerEl);
  
    next();
  }