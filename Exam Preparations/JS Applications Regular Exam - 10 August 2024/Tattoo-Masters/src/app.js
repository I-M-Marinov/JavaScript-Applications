import page  from "page";

import { renderNavigation } from "./middlewares/navigation.js";
import { createTattooView } from "./views/createTattoo.js";
import { dashboardView } from "./views/dashboard.js";
import { editTattooView } from "./views/editTattoo.js";
import { homeView } from "./views/home.js";
import { detailsTattooView } from "./views/detailsTattoo.js";
import { loginView } from "./views/login.js";
import { logoutView } from "./views/logout.js";
import { registerView } from "./views/register.js";


page(renderNavigation);
page('/', homeView);

page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);

page('/dashboard', dashboardView);
page('/dashboard/:id', detailsTattooView);
page('/edit', editTattooView);
page('/create', createTattooView);

page();