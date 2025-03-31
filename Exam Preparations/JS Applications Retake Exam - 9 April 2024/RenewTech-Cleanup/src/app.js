import page  from "page";

import { renderNavigation } from "./middlewares/navigation.js";

import { homeView } from "./views/homeView.js";
import { registerView } from "./views/registerView.js";
import { loginView } from "./views/loginView.js";
import { logoutView } from "./views/logoutView.js";

import { solutionsView } from "./views/dashboard.js";
import { addSolutionView } from "./views/addSolutionView.js";
import { editSolutionView } from "./views/editSolutionView.js";
import { detailsSolution } from "./views/solutionDetailsView.js";



page(renderNavigation);

page('/', homeView);
page('/register', registerView);
page('/login', loginView);
page('/logout', logoutView);

page('/dashboard', solutionsView);
page('/add', addSolutionView);
page('/edit/:id', editSolutionView);
page('/dashboard/:id', detailsSolution);

page();

