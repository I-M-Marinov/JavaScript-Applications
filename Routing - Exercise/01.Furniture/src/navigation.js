import { html, render } from "./../node_modules/lit-html/lit-html.js";


const navElement = document.querySelector("nav");

const template = (isAuthenticated) => html`

    <a id="catalogLink" href="/" >Dashboard</a>
    ${isAuthenticated
      ? html`<div id="user">
                <a id="createLink" href="/create">Create Furniture</a>
                <a id="profileLink" href="/publications" >My Publications</a>
                <a id="logoutBtn" href="/logout">Logout</a>
            </div>`
      : html`<div id="guest">
                <a id="loginLink" href="/login">Login</a>
                <a id="registerLink" href="/register">Register</a>
            </div>`}

`;

export function renderNavigation(ctx, next) {
  const email = localStorage.getItem("email");
  const isAuthenticated = email?.length > 0;

  render(template(isAuthenticated), navElement);
  next();
}