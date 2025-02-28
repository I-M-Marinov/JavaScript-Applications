document.getElementById('loadBooks').addEventListener('click', loadAllBooks);
document.querySelector('form').addEventListener('submit', addBook);

async function loadAllBooks() {
    const baseUrl = 'http://localhost:3030/jsonstore/collections/books';
    const tBodyResultsTableElement = document.querySelector('table tbody');

    tBodyResultsTableElement.innerHTML = '';

    try {
        const response = await fetch(baseUrl);
        const books = await response.json();

        Object.entries(books).forEach(([id, book]) => {
            const trElement = document.createElement('tr');

            const tdTitleElement = document.createElement('td');
            tdTitleElement.textContent = book.title;

            const tdAuthorElement = document.createElement('td');
            tdAuthorElement.textContent = book.author;

            const tdButtonsContainerElement = document.createElement('td');

            const editButtonElement = document.createElement('button');
            editButtonElement.textContent = 'Edit';

            const deleteButtonElement = document.createElement('button');
            deleteButtonElement.textContent = 'Delete';

            tdButtonsContainerElement.appendChild(editButtonElement);
            tdButtonsContainerElement.appendChild(deleteButtonElement);

            trElement.appendChild(tdTitleElement);
            trElement.appendChild(tdAuthorElement);
            trElement.appendChild(tdButtonsContainerElement);

            tBodyResultsTableElement.appendChild(trElement);

            editButtonElement.addEventListener('click', () => updateBook(id));
            deleteButtonElement.addEventListener('click', () => deleteBook(id));
        });
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

async function addBook(e) {
    e.preventDefault();

    const baseUrl = 'http://localhost:3030/jsonstore/collections/books';
    const titleElement = document.getElementsByName('title')[0];
    const authorElement = document.getElementsByName('author')[0];

    const title = titleElement.value.trim();
    const author = authorElement.value.trim();

    if (!title || !author) {
        alert("Both title and author are required!");
        return;
    }

    try {
        await fetch(baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ author, title  }),
        });

        titleElement.value = '';
        authorElement.value = '';

        loadAllBooks();
    } catch (err) {
        console.error("Error adding book:", err.message);
    }
}

async function updateBook(id) {
    const baseUrl = 'http://localhost:3030/jsonstore/collections/books';
    const formElement = document.querySelector('form');
    const formH3Element = document.querySelector('form h3');
    const titleElement = document.getElementsByName('title')[0];
    const authorElement = document.getElementsByName('author')[0];

    try {
        const response = await fetch(`${baseUrl}/${id}`);
        const book = await response.json();

        titleElement.value = book.title;
        authorElement.value = book.author;
        formH3Element.textContent = 'Edit FORM';

        const existingButton = formElement.querySelector('button');
        if (existingButton) existingButton.remove();

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        formElement.appendChild(saveButton);

        saveButton.addEventListener('click', async (e) => {
            e.preventDefault();
            await saveUpdatedBook(id);
        });

    } catch (err) {
        console.error("Error loading book for editing:", err.message);
    }
}

async function saveUpdatedBook(id) {

    const baseUrl = 'http://localhost:3030/jsonstore/collections/books';
    const formElement = document.querySelector('form');
    const formH3Element = document.querySelector('form h3');
    const titleElement = document.getElementsByName('title')[0];
    const authorElement = document.getElementsByName('author')[0];

    try {

        if (!titleElement.value || !authorElement.value) {
            alert("Both title and author are required!");
            return;
        }

        await fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                author: authorElement.value,
                title: titleElement.value
            }),
        });

        titleElement.value = '';
        authorElement.value = '';
        formH3Element.textContent = 'FORM';

        const saveButton = formElement.querySelector('button');
        if (saveButton) saveButton.remove();

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        formElement.appendChild(submitButton);
        submitButton.addEventListener('click', addBook);

        loadAllBooks();
    } catch (err) {
        console.error("Error saving book:", err.message);
    }
}

async function deleteBook(id) {
    const baseUrl = 'http://localhost:3030/jsonstore/collections/books';
    try {
        await fetch(`${baseUrl}/${id}`, 
            { 
                method: "DELETE" 
            });

        loadAllBooks();

    } catch (err) {
        console.error("Error deleting book:", err.message);
    }
}
