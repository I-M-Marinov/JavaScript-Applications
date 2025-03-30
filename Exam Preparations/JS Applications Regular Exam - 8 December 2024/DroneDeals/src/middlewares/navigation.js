import { html, render } from "./../../node_modules/lit-html/lit-html.js";
import { getUserData } from "./../util/users.js";


// const template = (isAuthenticated) => 
//   html`
// <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="logo" /></a>
// <nav>
//     <a href="/dashboard">Collection</a>
//     ${isAuthenticated
//       ? html`<div class="user">
//           <a href="/create">Add Tattoo</a>
//           <a id="logout" href="/logout">Logout</a>
//         </div>`
//       : html`<div class="guest">
//           <a href="/login">Login</a>
//           <a href="/register">Register</a>
//         </div>`}
//   </nav>`;

const template = (isAuthenticated) => 
  html`
<a id="logo" href="/"><img id="logo" src="./images/logo2.png" alt="img" /></a>
      <nav>
        <div>
          <a href="/dashboard">Marketplace</a>
        </div>

        ${isAuthenticated
          ? html`<div class="user">
          <a href="/add">Sell</a>
          <a href="/logout">Logout</a>
        </div>`
        : html`<div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}
      </nav>`


  export function renderNavigation(context, next) {

    try {
      const headerEl = document.querySelector("header"); 

      const userData = getUserData();
      const isAuthenticated = !!userData?.email;
      
      render(template(isAuthenticated), headerEl);
    
      next();

    } catch (error) {
      console.log(error.message);
    }
  }