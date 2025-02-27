function attachEvents() {
    
    const loadButtonElement = document.getElementById('btnLoad');
    loadButtonElement.addEventListener('click', loadAllContacts);

    const createButtonElement = document.getElementById('btnCreate');
    createButtonElement.addEventListener('click', createContact);
}

function loadAllContacts(){

    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';
    const ulPhonebookElement = document.getElementById('phonebook');

    ulPhonebookElement.innerHTML = '';

    fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => {

            Object.values(data).forEach(contact => {
            
            const deleteButtonElement = document.createElement('button');
            deleteButtonElement.textContent = 'Delete';             
            
            deleteButtonElement.addEventListener('click', () => {
              fetch(`${baseUrl}/${contact._id}`, {
                  method: "DELETE",
              })
              .then((res) => {
                  if (!res.ok) {
                      console.alert(`Failed to delete: ${res.status} ${res.statusText}`);
                  }
                  return res.json(); 
              })
              .then(() => {
                  deleteButtonElement.parentElement.remove();
              })
              .catch((err) => console.error("Error:", err.message));
          });

            const liContactContainerElement = document.createElement('li');
            liContactContainerElement.textContent = `${contact.person}: ${contact.phone}`;
            liContactContainerElement.appendChild(deleteButtonElement);
            
            ulPhonebookElement.appendChild(liContactContainerElement);

        });
        
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
    
}

function createContact(e) {
    e.preventDefault();

    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';

    const nameInput = document.getElementById('person')
    const phoneInput = document.getElementById('phone');

    const nameValue = nameInput.value;
    const phoneValue = phoneInput.value;

    console.log(nameValue);
    console.log(phoneValue);
    
    fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ person: nameValue, phone: phoneValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err.message));

      nameInput.value = '';
      phoneInput.value = '';

      loadAllContacts();
  }


attachEvents();