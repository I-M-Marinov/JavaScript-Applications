import { renderNavigation } from "../util.js";
const logoutUrl = 'http://localhost:3030/users/logout';

export default async function logout(){

    await logOutRequest();
    renderNavigation();
    
}


async function logOutRequest(){
    try {

        const user = JSON.parse(localStorage.getItem('user'));

        const response = await fetch(logoutUrl, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "X-Authorization": user.accessToken
            }
        });

        if(!response.ok){

            const error = await response.json();
            throw new Error(error.message);
        }

        localStorage.removeItem('user');

    } catch (error) {
        alert(error.message);
    }
}