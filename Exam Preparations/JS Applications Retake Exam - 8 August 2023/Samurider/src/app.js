import page  from "page";

import { renderNavigation } from "./middlewares/navigation.js";

import { homeView } from "./views/homeView.js";
import { registerView } from "./views/registerView.js";
import { loginView } from "./views/loginView.js";
import { logoutView } from "./views/logoutView.js";

import { motorcyclesView } from "./views/motorcyclesView.js";
import { addMotorcycleView } from "./views/addMotorcycleView.js";
import { editMotorcycleHandler } from "./views/editMotorcycleView.js";
import { motorcycleDetailsView } from "./views/motorcycleDetailsView.js";
import { searchMotorcycleView } from "./views/searchMotorcycleView.js";



page(renderNavigation);

page('/', homeView);
page('/register', registerView);
page('/login', loginView);
page('/logout', logoutView);

page('/motorcycles', motorcyclesView);
page('/add', addMotorcycleView);
page('/edit/:id', editMotorcycleHandler);
page('/motorcycles/:id', motorcycleDetailsView);

page('/search', searchMotorcycleView);

page();

