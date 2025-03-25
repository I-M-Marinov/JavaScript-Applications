import { html, render } from "./../../node_modules/lit-html/lit-html.js";
import { getUserData } from "./../util/users.js";


const template = (isAuthenticated) => 
  html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="logo" /></a>
<nav>
    <a href="/dashboard">Collection</a>
    ${isAuthenticated
      ? html`<div class="user">
          <a href="/create">Add Tattoo</a>
          <a id="logout" href="/logout">Logout</a>
        </div>`
      : html`<div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}
  </nav>`;


  export function renderNavigation(ctx, next) {

    const headerEl = document.querySelector("header"); // Get the header dynamically
    if (!headerEl) {
      console.warn("Header element not found in the DOM!");
      return; // Prevent execution if header is missing
    }
  
    const userData = getUserData();
    const isAuthenticated = !!userData?.email;
  
    console.log("User authenticated:", isAuthenticated);
  
    render(template(isAuthenticated), headerEl);
  
    next();
  }