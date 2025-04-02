import page  from "page";

import { renderNavigation } from "./middlewares/navigation.js";

import { homeView } from "./views/homeView.js";
import { registerView } from "./views/registerView.js";
import { loginView } from "./views/loginView.js";
import { logoutView } from "./views/logoutView.js";

import { carsView } from "./views/carsView.js";
import { addCarView } from "./views/addCarView.js";
import { editCarView } from "./views/editCarView.js";
import { carDetailsView } from "./views/carDetailsView.js";
import { searchView } from "./views/searchView.js";



page(renderNavigation);

page('/', homeView);
page('/register', registerView);
page('/login', loginView);
page('/logout', logoutView);

page('/cars', carsView);
page('/add', addCarView);
page('/edit/:id', editCarView);
page('/cars/:id', carDetailsView);

page('/search', searchView);

page();

