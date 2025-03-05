const postsUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const commentsUrl = 'http://localhost:3030/jsonstore/collections/myboard/comments';
const commentDivContainer = document.querySelector(".comment");
const h2Element = document.querySelector('h2');

const storedPostsData = localStorage.getItem("postsTimes");
const retrievedPostsTimes = new Map(JSON.parse(storedPostsData));


const storedCommentData = localStorage.getItem("commentTimes");
const commentTimes = new Map(JSON.parse(storedCommentData));

if(!storedCommentData){
    const commentTimes = new Map();
    localStorage.setItem("commentTimes", JSON.stringify(Array.from(commentTimes))); // save the array of times for comments in the local storage 
}


document.querySelector("form").addEventListener("submit", postComment);

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const postId = localStorage.getItem("selectedPostId");
        if (!postId) throw new Error("Post ID is missing.");

        // Fetch the post
        const response = await fetch(`${postsUrl}/${postId}`);
        if (!response.ok) throw new Error("Failed to fetch post");

        const post = await response.json();

        h2Element.textContent = post.title;

        commentDivContainer.innerHTML = 
        `<div class="header">
                <img src="./static/profile.png" alt="avatar">
                <p><span>${post.username}</span> posted on <time>${retrievedPostsTimes.get(postId)}</time></p>
                <p class="post-content">${post.content}</p>
        </div>`;

      await getComments();

    } catch (error) {
        console.error("Error fetching post:", error);
    }
});

function postComment(event) {
    event.preventDefault();

    const postId = localStorage.getItem("selectedPostId");
    if (!postId) {
        console.error("Post ID not found in localStorage.");
        return;
    }

    const formData = new FormData(event.target);
    const postText = formData.get("postText").trim();
    const username = formData.get("username").trim();

    if (!postText || !username) {
        return;
    }

    const newComment = {
        text: postText,  
        username: username,
        postId: postId
    };

    fetch(commentsUrl, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
    })
    .then((res) => res.json())
    .then((data) => {

        commentTimes.set(data._id, new Date());
        localStorage.setItem("commentTimes", JSON.stringify(Array.from(commentTimes))); // save the array of times for comments in the local storage 


        commentDivContainer.innerHTML += 
        `<div id="user-comment">
                <div class="topic-name-wrapper">
                    <div class="topic-name">
                        <p><strong>${data.username}</strong> commented on <time>${commentTimes.get(data._id)}</time></p>
                        <div class="post-content">
                            <p>${data.text}</p>
                        </div>
                    </div>
                </div>
            </div>`;

        event.target.reset();
    })
    .catch((err) => console.error("Error posting comment:", err.message));
}

async function getComments(){

        try {

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
