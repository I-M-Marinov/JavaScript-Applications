import page  from "page";

import { renderNavigation } from "./middlewares/navigation.js";

import { homeView } from "./views/homeView.js";
import { registerView } from "./views/registerView.js";
import { loginView } from "./views/loginView.js";
import { logoutView } from "./views/logoutView.js";

import { charactersView } from "./views/dashboard.js";
import { addCharacterView } from "./views/addCharacterView.js";
import { editCharacterView } from "./views/editCharacterView.js";
import { characterDetails } from "./views/characterDetailsView.js";



page(renderNavigation);

page('/', homeView);
page('/register', registerView);
page('/login', loginView);
page('/logout', logoutView);

page('/dashboard', charactersView);
page('/add', addCharacterView);
page('/edit/:id', editCharacterView);
page('/dashboard/:id', characterDetails);

page();

