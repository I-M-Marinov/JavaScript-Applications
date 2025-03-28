import page  from "page";

import { renderNavigation } from "./middlewares/navigation.js";

import { homeView } from "./views/homeView.js";
import { registerView } from "./views/registerView.js";
import { loginView } from "./views/loginView.js";
import { logoutView } from "./views/logoutView.js";

import { showsView } from "./views/showsView.js";
import { addShowView } from "./views/addShowView.js";
import { editShowView } from "./views/editShowView.js";
import { showDetailsView } from "./views/showDetailsView.js";
import { searchView } from "./views/searchView.js";



page(renderNavigation);

page('/', homeView);
page('/register', registerView);
page('/login', loginView);
page('/logout', logoutView);

page('/shows', showsView);
page('/add', addShowView);
page('/edit/:id', editShowView);
page('/shows/:id', showDetailsView);

page('/search', searchView);

page();

