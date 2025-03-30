import page  from "page";

import { renderNavigation } from "./middlewares/navigation.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { logoutView } from "./views/logout.js";

import { dashboardView } from "./views/dashboard.js";
import { addDroneView } from "./views/addDrone.js";
import { editDroneView } from "./views/editDrone.js";

import { droneDetailsView } from "./views/droneDetails.js";


page(renderNavigation);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);

page('/dashboard', dashboardView);
page('/add', addDroneView);
page('/edit/:id', editDroneView);
page('/dashboard/:id', droneDetailsView);


page();