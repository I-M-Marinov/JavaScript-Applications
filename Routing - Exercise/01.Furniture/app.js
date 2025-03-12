import page from "//unpkg.com/page/page.mjs";

import { renderNavigation } from "./src/navigation.js";

import createPage  from "./src/create.js";
import registerPage from "./src/register.js";
import loginPage from "./src/login.js";

// import homePage from "./src/homepage.js";
// import logoutPage from "./src/views/logout.js";
// import detailsPage from "./src/views/details.js";


// This will execute before each navigation
page(renderNavigation);

// Execute by route
// page("/", homepage);
// page("/details/:recipeId", detailsPage);
// page("/logout", logoutPage);

page("/register", registerPage);
page("/login", loginPage);
page("/create", createPage);

// Start router
page();