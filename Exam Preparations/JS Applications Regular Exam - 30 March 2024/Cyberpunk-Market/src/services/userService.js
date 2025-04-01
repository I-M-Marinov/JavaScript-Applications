import { removeUserData, saveUserData } from '../util/users.js';
import { get, post } from './apiService.js'

export async function login(email, password){
    const result = await post('/users/login', {
        email, 
        password
    });

    saveUserData({
        _id: result._id,
        email: result.email,
        accessToken: result.accessToken,
      });
}

export async function register(email, password){
    const result = await post('/users/register', {
        email, 
        password
    });

    saveUserData({
        _id: result._id,
        email: result.email,
        accessToken: result.accessToken,
      });
}

export async function logout(){
    const result = await get('/users/logout');
    removeUserData();
    await result;
}