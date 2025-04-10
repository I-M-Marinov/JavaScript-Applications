import { logout } from '../services/userService.js';
import {page} from "./../lib/page.js";


export function logoutView(){

     logout().then(()=>{
        page.redirect('/');
    });
}