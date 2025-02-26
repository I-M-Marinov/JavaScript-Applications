function attachEvents() {
    
    const loadBlogPostsButtonElement = document.getElementById('btnLoadPosts');
    const viewPostButtonElement = document.getElementById('btnViewPost');
    const selectPostsElement = document.getElementById('posts');
    const h1PostTitleElement = document.getElementById('post-title');
    const pPostBodyElement = document.getElementById('post-body');
    const ulPostCommentsElement = document.getElementById('post-comments');
    


    loadBlogPostsButtonElement.addEventListener('click', async () => {

        const postsRequest = await fetch(`http://localhost:3030/jsonstore/blog/posts`);
        const posts = await postsRequest.json();

        selectPostsElement.innerHTML = '';

        Object.values(posts).forEach(({ body, id, title }) => {

            const optionElement = document.createElement('option');

            optionElement.value = id;
            optionElement.textContent = title.toUpperCase();;

            selectPostsElement.appendChild(optionElement);

        });

        viewPostButtonElement.addEventListener('click', async () => {

            const selectedPostId = selectPostsElement.value;
    
            if (!selectedPostId) return; 
    
            const { title, body } = posts[selectedPostId];
    
            h1PostTitleElement.textContent = title;
            pPostBodyElement.textContent = body;
    
            const commentsRequest = await fetch(`http://localhost:3030/jsonstore/blog/comments`);
            const comments = await commentsRequest.json();
    
            ulPostCommentsElement.innerHTML = '';
    
            Object.values(comments)
                .filter(comment => comment.postId === selectedPostId)
                .forEach(({ text }) => {
                    const liPostCommentElement = document.createElement('li');
                    liPostCommentElement.textContent = text;
                    ulPostCommentsElement.appendChild(liPostCommentElement);
                });
        });

        
    })
}

attachEvents();