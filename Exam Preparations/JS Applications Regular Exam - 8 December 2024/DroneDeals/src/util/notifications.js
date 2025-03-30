export function showError(message) {

    const errorBox = document.getElementById('errorBox');

    errorBox.querySelector('.msg').textContent = message;
    errorBox.style.display = 'block';

    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 3000); // show the error for 3 seconds and then hide it
}
