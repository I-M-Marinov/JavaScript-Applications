const postsUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const commentDivContainer = document.querySelector(".comment");

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const postId = localStorage.getItem("selectedPostId");
       
        const response = await fetch(`${postsUrl}/${postId}`);
        if (!response.ok) throw new Error("Failed to fetch post");

        const post = await response.json(); 

        console.log(post);

        commentDivContainer.innerHTML = `
            <div class="header">
                <img src="./static/profile.png" alt="avatar">
                <p><span>${post.username}</span> posted on <time>${new Date(post.time).toLocaleString()}</time></p>
                <p class="post-content">${post.content}</p>
            </div>`;
      
    } catch (error) {
        console.error("Error fetching post:", error);
    }
});
