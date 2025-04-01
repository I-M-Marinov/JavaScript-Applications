export function saveUserData(data){
    localStorage.setItem('user', JSON.stringify(data));
}

export function retrieveUserData(){
    return JSON.parse(localStorage.getItem('user'));
}

export function removeUserData(){
    localStorage.removeItem('user');
}