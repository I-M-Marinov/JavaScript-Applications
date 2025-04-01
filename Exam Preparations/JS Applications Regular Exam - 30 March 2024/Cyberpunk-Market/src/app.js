import page  from "page";

import { renderNavigation } from "./middlewares/navigation.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { logoutView } from "./views/logout.js";

import { dashboardView } from "./views/dashboard.js";
import { addItemView } from "./views/addItem.js";
import { editItemView } from "./views/editItem.js";

import { itemDetails } from "./views/itemDetailsView.js";


page(renderNavigation);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);

page('/dashboard', dashboardView);
page('/add', addItemView);
page('/edit/:id', editItemView);
page('/dashboard/:id', itemDetails);

page();