
const loadBooksButtonElement = document.getElementById('loadBooks');
loadBooksButtonElement.addEventListener('click', loadAllBooks);

async function loadAllBooks(){

    const baseUrl = 'http://localhost:3030/jsonstore/collections/books';
    const tBodyResultsTableElement = document.querySelector('table tbody');

    tBodyResultsTableElement.innerHTML = '';

    try {
        await fetch(baseUrl)
          .then((res) => res.json())
          .then((books) => {
    
              Object.values(books).forEach(book => {
                      
                  const trElement = document.createElement('tr');
    
                  const tdAuthorElement = document.createElement('td');
                  tdAuthorElement.textContent = book.author;
    
                  const tdTitleElement = document.createElement('td');
                  tdTitleElement.textContent = book.title;

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
    
              });
              
          })
      } catch (error) {
          console.error("Error fetching students:", error);
      }
}