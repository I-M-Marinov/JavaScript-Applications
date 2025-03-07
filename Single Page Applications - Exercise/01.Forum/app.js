const postsUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const cancelButtonElement = document.querySelector('.cancel');
const topicTitleElement = document.querySelector('.topic-title');


const storedData = localStorage.getItem("postsTimes");
const postsTimes = new Map(JSON.parse(storedData));

if(!storedData){
    const postsTimes = new Map();
    localStorage.setItem("postsTimes", JSON.stringify(Array.from(postsTimes))); // save the array of times for posts in the local storage 
}

document.querySelector("form").addEventListener("submit", createPost);
topicTitleElement.addEventListener("click", navigateToPost);
cancelButtonElement.addEventListener("click", resetInputs);


window.addEventListener("DOMContentLoaded", async () => {

    const homeButtonElement = document.querySelector("nav a");
    homeButtonElement.addEventListener('click', navigateToHome);


    try {
        const response = await fetch(postsUrl);
        const data = await response.json();
        const posts = Object.values(data);
        topicTitleElement.innerHTML = "";
    
        posts.forEach(post => {
            topicTitleElement.innerHTML += 
            `<div class="topic-container">
                <div class="topic-name-wrapper">
                        <div class="topic-name">
                            <a href="#" class="normal" dataset.id="${post._id}"> 
                                <h2>${post.title}</h2>
                            </a>
                            <div class="columns">
                                <div>
                                    <p>Date: <time>${postsTimes.get(post._id)}</time></p>
                                    <div class="nick-name">
                                        <p>Username: <span>${post.username}</span></p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
});

function createPost(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const title = formData.get("topicName");
    const username = formData.get("username");
    const content = formData.get("postText");

    // if (title === '' || username === '' || content === '') {
    //     return;
    // }

    if (!title) {
        throw new Error('Title must be filled')
    }
    else if (!username) {
        throw new Error('Username must be filled')
    }
    else if (!content) {
        throw new Error('Post must be filled')
    }

    const newPost = {
        title: title,
        username: username,
        content: content
    };



    fetch(postsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
    })
    .then((res) => res.json())
    .then((data) => {

        postsTimes.set(data._id, new Date().toISOString());
        localStorage.setItem("postsTimes", JSON.stringify(Array.from(postsTimes))); // save the array of times for posts in the local storage 
        
        topicTitleElement.innerHTML += 
        `<div class="topic-container">
            <div class="topic-name-wrapper">
                <div class="topic-name">
                    <a href="#" class="normal" dataset.id="${data._id}">
                        <h2>${data.title}</h2>
                    </a>
                    <div class="columns">
                        <div>
                            <p>Date: <time>${postsTimes.get(data._id)}</time></p>
                            <div class="nick-name">
                                <p>Username: <span>${data.username}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        event.target.reset();
    })
    .catch((err) => alert(err.message));
}

function navigateToPost(event) {
    const target = event.target.closest("a.normal");
    
    if (target) {
        event.preventDefault();
        const postId = target.getAttribute("dataset.id");
        
        if (postId) {
            localStorage.setItem("selectedPostId", postId);
            window.location.href = "theme-content.html";
        }
    }
}

function navigateToHome() {
    console.log('navigating home using the function');
    
    window.location.href = "index.html";

}

function resetInputs(event) {
    event.preventDefault();
    const form = event.target.closest("form");
    if (form) {
        form.reset();
    }
}
