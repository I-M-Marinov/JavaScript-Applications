import page  from "page";

import { renderNavigation } from "./middlewares/navigation.js";

import { homeView } from "./views/homeView.js";
import { registerView } from "./views/registerView.js";
import { loginView } from "./views/loginView.js";
import { logoutView } from "./views/logoutView.js";

import { allFactsView } from "./views/dashboard.js";
import { addFactView } from "./views/addFactView.js";
import { editFactView } from "./views/editFactView.js";
import { factDetails } from "./views/factMoreInfoView.js";



page(renderNavigation);

page('/', homeView);
page('/register', registerView);
page('/login', loginView);
page('/logout', logoutView);

page('/dashboard', allFactsView);
page('/add', addFactView);
page('/edit/:id', editFactView);
page('/dashboard/:id', factDetails);

page();

