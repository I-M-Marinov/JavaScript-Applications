const sections = document.querySelectorAll('.view-section');

export function hideAllViews(){
    sections.forEach((s) => (s.style.display = 'none'));
}

export function showView(section){

    hideAllViews();
    section.style.display = 'block';

}

export function renderNavigation(){
    const user = JSON.parse(localStorage.getItem('user'));

    const userNavBar = document.querySelectorAll('.user');
    const guestNavBar = document.querySelectorAll('.guest');
    const message = document.getElementById('welcome-msg');

    if(user){
        userNavBar.forEach(e => e.style.display = 'inline');
        guestNavBar.forEach(e => e.style.display = 'none');
        message.textContent = `Welcome, ${user.email}`;
    } else {
        userNavBar.forEach(e => e.style.display = 'none');
        guestNavBar.forEach(e => e.style.display = 'inline');
        message.textContent = '';

    }
}