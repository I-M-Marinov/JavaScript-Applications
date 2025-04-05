import page  from "page";

import { renderNavigation } from "./middlewares/navigation.js";

import { homeView } from "./views/homeView.js";
import { registerView } from "./views/registerView.js";
import { loginView } from "./views/loginView.js";
import { logoutView } from "./views/logoutView.js";

import { allStampsView } from "./views/collectionView.js";
import { addStampView } from "./views/createStampView.js";
import { editStampView } from "./views/editStampView.js";
import { stampDetailsView } from "./views/stampDetailsView.js";



page(renderNavigation);

page('/', homeView);
page('/register', registerView);
page('/login', loginView);
page('/logout', logoutView);

page('/collection', allStampsView);
page('/add', addStampView);
page('/edit/:id', editStampView);
page('/collection/:id', stampDetailsView);

page();

