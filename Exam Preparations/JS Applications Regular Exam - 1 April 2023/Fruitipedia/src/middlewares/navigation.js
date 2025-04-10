import { html, render } from "./../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../util/users.js";


const template = (isAuthenticated) => 
  html`
<a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>

        <nav>
          <div>
            <a href="/fruits">Fruits</a>
            <a href="/search">Search</a>
          </div>

        ${isAuthenticated
          ? html` <div class="user">
          <a href="/add">Add Fruit</a>
          <a href="/logout">Logout</a>
        </div>`
          : html`<div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}
      </nav>`;


  export function renderNavigation(ctx, next) {

    const headerElement = document.querySelector("header"); 

    const userData = getUserData();
    const isAuthenticated = !!userData?.email;
    
    render(template(isAuthenticated), headerElement);
  
    next();
  }