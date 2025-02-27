function attachEvents() {
    const refreshButtonElement = document.getElementById('refresh');
    refreshButtonElement.addEventListener('click', getMessages); 

    const sendButtonElement = document.getElementById('submit');
      sendButtonElement.addEventListener("click", sendMessage);
}

function getMessages() {
    const textAreaElement = document.getElementById('messages');
    const baseUrl = 'http://localhost:3030/jsonstore/messenger';

    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        const messages = Object.values(data)
          .map((msg) => `${msg.author}: ${msg.content}`)
          .join("\n");

        textAreaElement.value = messages;
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
}

function sendMessage(e) {
    e.preventDefault();

    const baseUrl = 'http://localhost:3030/jsonstore/messenger';

    const authorInput = document.getElementsByName('author')[0];
    const contentInput = document.getElementsByName('content')[0];

    const authorValue = authorInput.value;
    const messageValue = contentInput.value;

    authorInput.value = '';
    contentInput.value = '';

    fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: authorValue, content: messageValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err.message));
  }

attachEvents();