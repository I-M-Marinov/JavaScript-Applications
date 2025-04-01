export function showError(message) {

    const errorBox = document.getElementById('errorBox');

    errorBox.querySelector('.msg').textContent = message;
    errorBox.style.display = 'block';

    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 3000); 
}
