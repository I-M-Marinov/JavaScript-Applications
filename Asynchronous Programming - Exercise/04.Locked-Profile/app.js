async function lockedProfile() {

    const mainElement = document.getElementById('main');
    mainElement.innerHTML = '';

    const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const data = await response.json();
    const users = Object.values(data);

    for (let index in users) {

        index = Number(index);
        const user = users[index];


        const profileDivElement = document.createElement('div');
        profileDivElement.classList.add('profile');

        const userIconImageElement = document.createElement('img');
        userIconImageElement.setAttribute('src', "./iconProfile2.png");
        userIconImageElement.classList.add('userIcon');

        const lockLabelElement = document.createElement('label');
        lockLabelElement.textContent = 'Lock';

        const lockInputElement = document.createElement('input');
        lockInputElement.setAttribute('type', 'radio');
        lockInputElement.setAttribute('name', `user${index+1}Locked`);
        lockInputElement.checked = true;
        lockInputElement.value = 'lock';

        const unlockLabelElement = document.createElement('label');
        unlockLabelElement.textContent = 'Unlock';

        const unlockInputElement = document.createElement('input');
        unlockInputElement.setAttribute('type', 'radio');
        unlockInputElement.setAttribute('name', `user${index+1}Locked`);
        unlockInputElement.value = 'unlock';

        const brElement = document.createElement('br');
        const hrElementOne = document.createElement('hr');

        const usernameLabelElement = document.createElement('label');
        usernameLabelElement.textContent = 'Username';

        const usernameInputElement = document.createElement('input');
        usernameInputElement.setAttribute('type', 'text');
        usernameInputElement.setAttribute('name', `user${index+1}Username`);
        usernameInputElement.disabled = true;
        usernameInputElement.readOnly = true;
        usernameInputElement.value = user.username;

        const usernameDivElement = document.createElement('div');
        usernameDivElement.classList.add(`user${index+1}Username`);

        const hrElementTwo = document.createElement('hr');

        const emailLabelElement = document.createElement('label');
        emailLabelElement.textContent = 'Email:';

        const emailInputElement = document.createElement('input');
        emailInputElement.setAttribute('type', 'email');
        emailInputElement.setAttribute('name', `user${index+1}Email`);
        emailInputElement.disabled = true;
        emailInputElement.readOnly = true;
        emailInputElement.value = user.email;

        const ageLabelElement = document.createElement('label');
        ageLabelElement.textContent = 'Age:';

        const ageInputElement = document.createElement('input');
        ageInputElement.setAttribute('type', 'number');
        ageInputElement.setAttribute('name', `user${index+1}Age`);
        ageInputElement.disabled = true;
        ageInputElement.readOnly = true;
        ageInputElement.value = user.age;

        const showMoreButtonElement = document.createElement('button');
        showMoreButtonElement.textContent = 'Show more';

        usernameDivElement.appendChild(hrElementTwo);
        usernameDivElement.appendChild(emailLabelElement);
        usernameDivElement.appendChild(emailInputElement);
        usernameDivElement.appendChild(ageLabelElement);
        usernameDivElement.appendChild(ageInputElement);


        profileDivElement.appendChild(userIconImageElement);
        profileDivElement.appendChild(lockLabelElement);
        profileDivElement.appendChild(lockInputElement);
        profileDivElement.appendChild(unlockLabelElement);
        profileDivElement.appendChild(unlockInputElement);
        profileDivElement.appendChild(brElement);
        profileDivElement.appendChild(hrElementOne);
        profileDivElement.appendChild(usernameLabelElement);
        profileDivElement.appendChild(usernameInputElement);
        profileDivElement.appendChild(usernameDivElement);
        profileDivElement.appendChild(showMoreButtonElement);

        mainElement.appendChild(profileDivElement);

        usernameDivElement.style.display = 'none';

        showMoreButtonElement.addEventListener('click', handleInfoChange);

        function handleInfoChange() {
            if(unlockInputElement.checked){
                if(showMoreButtonElement.textContent === 'Show more'){
                    usernameDivElement.style.display = 'block';
                    showMoreButtonElement.textContent = 'Hide it';
                } else { 
                    usernameDivElement.style.display = 'none';
                    showMoreButtonElement.textContent = 'Show more';
                }
            }
        }
    }
}

