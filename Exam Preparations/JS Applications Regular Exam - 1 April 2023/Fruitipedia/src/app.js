import page  from "page";

import { renderNavigation } from "./middlewares/navigation.js";

import { homeView } from "./views/homeView.js";
import { registerView } from "./views/registerView.js";
import { loginView } from "./views/loginView.js";
import { logoutView } from "./views/logoutView.js";

import { fruitsView } from "./views/fruitsView.js";
import { addFruitView } from "./views/addFruitView.js";
import { editFruitView } from "./views/editFruitView.js";
import { fruitsDetailsView } from "./views/fruitsDetailsView.js";
import { searchFruitView } from "./views/searchFruitView.js";



page(renderNavigation);

page('/', homeView);
page('/register', registerView);
page('/login', loginView);
page('/logout', logoutView);

page('/fruits', fruitsView);
page('/add', addFruitView);
page('/edit/:id', editFruitView);
page('/fruits/:id', fruitsDetailsView);

page('/search', searchFruitView);

page();

