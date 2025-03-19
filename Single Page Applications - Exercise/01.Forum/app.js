const postsUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const commentsUrl = 'http://localhost:3030/jsonstore/collections/myboard/comments';
const cancelButtonElement = document.querySelector('.cancel');
const topicTitleElement = document.querySelector('.topic-title');
const containerElement = document.querySelector('.container');


const storedData = localStorage.getItem("postsTimes");
const postsTimes = new Map(JSON.parse(storedData));

const storedCommentData = localStorage.getItem("commentTimes");
const commentTimes = new Map(JSON.parse(storedCommentData));

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

async function navigateToPost(event) {
    const target = event.target.closest("a.normal");
    
    if (target) {
        event.preventDefault();
        const postId = target.getAttribute("dataset.id");
        
        if (postId) {
            localStorage.setItem("selectedPostId", postId);

            containerElement.innerHTML = "";
            
            containerElement.innerHTML = 
            `
            <div class="theme-content">
                <!-- theme-title  -->
                <div class="theme-title">
                    <div class="theme-name-wrapper">
                        <div class="theme-name">
                            <h2>Angular 10</h2>

                        </div>

                    </div>
                </div>

                <div class="comment">

                </div>
            </div>`

            const commentDivContainer = document.querySelector(".comment");
            const h2Element = document.querySelector('h2');

            const storedPostsData = localStorage.getItem("postsTimes");
            const retrievedPostsTimes = new Map(JSON.parse(storedPostsData));

            const themeContentDivElement = document.querySelector('.theme-content');

            try {
                const postId = localStorage.getItem("selectedPostId");
                if (!postId) throw new Error("Post ID is missing.");
        
                // Fetch the post
                const response = await fetch(`${postsUrl}/${postId}`);
                if (!response.ok) throw new Error("Failed to fetch post");
        
                const post = await response.json();
        
                h2Element.textContent = post.title;
        
                commentDivContainer.innerHTML = 
                `<div class="comment">
                    <div class="header">
                            <img src="./static/profile.png" alt="avatar">
                            <p><span>${post.username}</span> posted on <time>${retrievedPostsTimes.get(postId)}</time></p>
                            <p class="post-content">${post.content}</p>
                    </div>
                </div>`;


                themeContentDivElement.innerHTML += 
                `
                <div class="answer-comment">
                        <p><span>currentUser</span> comment:</p>
                        <div class="answer">
                            <form>
                                <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                                <div>
                                    <label for="username">Username <span class="red">*</span></label>
                                    <input type="text" name="username" id="username">
                                </div>
                                <button>Post</button>
                            </form>
                        </div>
                    </div>
                `
              document.querySelector('form').addEventListener("submit", postComment);

              await getComments();
        
            } catch (error) {
                console.error("Error fetching post:", error);
            }
            
        }
    }
}

window.addEventListener("DOMContentLoaded", async () => {

    const homeButtonElement = document.querySelector("nav a");
    homeButtonElement.addEventListener('click', navigateToHome);
});

function postComment(event) {
    event.preventDefault();

    const postId = localStorage.getItem("selectedPostId");
    if (!postId) {
        console.error("Post ID not found in localStorage.");
        return;
    }

    const formData = new FormData(event.target);
    const postText = formData.get("postText");
    const username = formData.get("username");

    if (postText === '' || username === '') {
        return;
    }

    const newComment = {
        text: postText,  
        username: username,
        postId: postId
    };

    console.log(newComment);
    

    fetch(commentsUrl, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
    })
    .then((res) => res.json())
    .then((data) => {

        commentTimes.set(data._id, new Date().toISOString());
        localStorage.setItem("commentTimes", JSON.stringify(Array.from(commentTimes))); // save the array of times for comments in the local storage 

        document.querySelector(".comment").innerHTML += 
        `<div id="user-comment">
            <div class="topic-name-wrapper">
                    <div class="topic-name">
                        <p><strong>${newComment.username}</strong> commented on <time>${commentTimes.get(data._id)}</time></p>
                        <div class="post-content">
                            <p>${newComment.text}</p>
                        </div>
                    </div>
                </div>
        </div>`;

       

        event.target.reset();
    })
    .catch((err) => alert(err.message));
}

async function getComments(){

    try {

    const commentDivContainer = document.querySelector(".comment");

    const postId = localStorage.getItem("selectedPostId");
    if (!postId) throw new Error("Post ID is missing.");

        // Fetch the comments
    const commentsResponse = await fetch(commentsUrl);
    let comments = [];

    if (commentsResponse.ok) {
        try {
            const data = await commentsResponse.json();
            comments = Object.values(data).filter(comment => comment.postId === postId); // filter all comments by the postId to get the ones for the viewed post 
        } catch {
            comments = [];  // ensures that if there are no comments it's not going to break the rest of the code
        }
    }

    

    if (comments.length > 0) {
        comments.forEach(comment => {
            commentDivContainer.innerHTML += 
            `<div id="user-comment">
                    <div class="topic-name-wrapper">
                        <div class="topic-name">
                            <p><strong>${comment.username}</strong> commented on <time>${commentTimes.get(comment._id)}</time></p>
                            <div class="post-content">
                                <p>${comment.text}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
        });

       
    } else {
        return;
    }
    } catch (error) {
        console.error("Error fetching comments:", error);
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
