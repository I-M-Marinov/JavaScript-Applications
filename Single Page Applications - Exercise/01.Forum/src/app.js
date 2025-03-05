const postsUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const cancelButtonElement = document.querySelector('.cancel');


const storedData = localStorage.getItem("postsTimes");
const postsTimes = new Map(JSON.parse(storedData));

if(!storedData){
    const postsTimes = new Map();
    localStorage.setItem("postsTimes", JSON.stringify(Array.from(postsTimes))); // save the array of times for posts in the local storage 
}

document.querySelector("form").addEventListener("submit", createPost);
cancelButtonElement.addEventListener("click", resetInputs);

document.querySelector(".topic-container").addEventListener("click", navigateToPost);

function resetInputs(event) {
    event.preventDefault();
    const form = event.target.closest("form");
    if (form) {
        form.reset();
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(postsUrl);
        const data = await response.json();
        const posts = Object.values(data);
        const topicContainerElement = document.querySelector('.topic-container');
        topicContainerElement.innerHTML = "";
    
        posts.forEach(post => {
            topicContainerElement.innerHTML += 
            `<div class="topic-name-wrapper">
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
                </div>`;
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
});

function createPost(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const topicName = formData.get("topicName").trim();
    const username = formData.get("username").trim();
    const postText = formData.get("postText").trim();

    if (!topicName || !username || !postText) {
        return;
    }

    const newPost = {
        title: topicName,
        username: username,
        content: postText
    };



    fetch(postsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
    })
    .then((res) => res.json())
    .then((data) => {
        const topicContainerElement = document.querySelector('.topic-container');

        postsTimes.set(data._id, new Date());
        localStorage.setItem("postsTimes", JSON.stringify(Array.from(postsTimes))); // save the array of times for posts in the local storage 


        topicContainerElement.innerHTML += `<div class="topic-name-wrapper">
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
            </div>`;

        event.target.reset();
    })
    .catch((err) => console.error("Error creating post:", err.message));
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
