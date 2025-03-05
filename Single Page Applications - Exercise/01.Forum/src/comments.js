const postsUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const commentDivContainer = document.querySelector(".comment");
const h2Element = document.querySelector('h2');

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const postId = localStorage.getItem("selectedPostId");
       
        const response = await fetch(`${postsUrl}/${postId}`);
        if (!response.ok) throw new Error("Failed to fetch post");

        const post = await response.json(); 

        h2Element.textContent = post.title;

        commentDivContainer.innerHTML = `
            <div class="header">
                <img src="./static/profile.png" alt="avatar">
                <p><span>${post.username}</span> posted on <time>${post.time}</time></p>
                <p class="post-content">${post.content}</p>
            </div>`;
      
    } catch (error) {
        console.error("Error fetching post:", error);
    }
});
