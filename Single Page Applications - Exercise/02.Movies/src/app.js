import createPage from "./views/create.js";
import homePage from "./views/home.js";
import loginPage from "./views/login.js";
import registerPage from "./views/register.js";
import logout from "./views/logout.js";
import { renderNavigation } from "./util.js";

const routes = {
    '/': homePage,
    '/register': registerPage,
    '/login': loginPage,
    '/create': createPage,
    '/logout': logout
}

document.querySelector('nav').addEventListener('click', navigateHandler);
document.querySelector('#add-movie-button a').addEventListener('click', navigateHandler);

function navigateHandler(event){
    if(event.target.tagName === "A" && event.target.href?.length) {

        event.preventDefault();
        const url = new URL(event.target.href)
        const renderView = routes[url.pathname];

        if(typeof renderView === 'function'){
            renderView();
        }
    }
}


renderNavigation();
routes['/']();
