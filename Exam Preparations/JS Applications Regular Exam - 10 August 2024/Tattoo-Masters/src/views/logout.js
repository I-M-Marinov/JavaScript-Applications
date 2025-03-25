import { logout } from '../services/userService.js';
import {page} from "./../lib/page.js";


export  function logoutView(){

     logout().then(()=>{
        // NOTE(imarinov): logout is deleting the user data from the local storage
        page.redirect('/'); // redirect to home page
    });
}