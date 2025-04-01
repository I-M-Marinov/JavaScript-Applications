import { html, render } from "lit-html";
import { retrieveUserData } from "./../util/users.js";
import { showError } from '../util/notifications.js';

const template = (isLoggedIn) => 
  html`
<a id="logo" href="/"
          ><img id="logo" src="./images/logo.png" alt="img"
        /></a>
        <nav>
          <div>
            <a href="/dashboard">Market</a>
          </div>

           ${isLoggedIn
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
      const headerElement = document.querySelector("header"); 

      const user = retrieveUserData();
      const isLoggedIn = !!user?.email;
      
      render(template(isLoggedIn), headerElement);
    
      next();

    } catch (error) {
      return showError(error.message);
    }
  }