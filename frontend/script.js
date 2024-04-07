const apiBaseUrl = 'https://k9b4bsvkmi.execute-api.us-east-1.amazonaws.com/dev';

document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    document.getElementById('createPostForm').addEventListener('submit', createPostHandler);
});

// Notification Function
function notify(message) {
    alert(message); // For simplicity, we're using alert.
}

async function createPostHandler(e) {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    await createPost(title, content);
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    await loadPosts();
}

async function createPost(title, content) {
    try {
        const response = await fetch(`${apiBaseUrl}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });
        if (!response.ok) throw new Error('Failed to create post');
        console.log('Post created successfully');
    } catch (error) {
        console.error('Error creating post:', error);
    }
}

async function loadPosts() {
    try {
        const response = await fetch(`${apiBaseUrl}/posts`);
        if (!response.ok) throw new Error(`Failed to load posts: ${response.status}`);
        const posts = await response.json();
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = posts.map(post => `
            <article class="post" id="post-${post.postID}">
                <h3 class="post-title">${post.title}</h3>
                <div class="post-content">${post.content}</div>
                <div class="post-actions">
                <button class="delete-btn" data-id="${post.postID}">Delete</button>
                <button class="update-btn"
                        data-id="${post.postID}"
                        data-title="${encodeURIComponent(post.title)}"
                        data-content="${encodeURIComponent(post.content)}">Update</button>
        </div>
            </article>
        `).join('');
    } catch (error) {
        console.error('Error loading posts:', error);
    }
    // Binding the click events to buttons
    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const postID = e.target.getAttribute('data-id');
            const title = decodeURIComponent(e.target.getAttribute('data-title'));
            const content = decodeURIComponent(e.target.getAttribute('data-content'));
            showUpdateForm(postID, title, content);
        });
    });
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const postID = e.target.getAttribute('data-id');
            const title = decodeURIComponent(e.target.getAttribute('data-title'));
            const content = decodeURIComponent(e.target.getAttribute('data-content'));
            deletePost(postID);
        });
    });
}

async function deletePost(postID) {
    try {
        const response = await fetch(`${apiBaseUrl}/posts/${postID}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete post');
        notify('Post deleted successfully');
        console.log('Post deleted successfully');
        await loadPosts();
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

async function updatePost(postID, title, content) {
    try {
        const response = await fetch(`${apiBaseUrl}/posts/${postID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: postID, title, content })
        });
        if (!response.ok) throw new Error('Failed to update post');
        notify('Post updated successfully');
        console.log('Post updated successfully');
        await loadPosts();
    } catch (error) {
        console.error('Error updating post:', error);
    }
}
async function showUpdateForm(postID, title, content) {
   // Display the update post section
    const updateSection = document.getElementById('updatePostSection');
    updateSection.style.display = 'block';

    // Set the values of the form inputs to the current post's title, content, and ID
    const updateForm = document.getElementById('updatePostForm');
    updateForm.querySelector('#updatePostID').value = postID;
    updateForm.querySelector('#updatePostTitle').value = title;
    updateForm.querySelector('#updatePostContent').value = content;

    // Scroll to the update form for better user experience
    updateSection.scrollIntoView();
}

// Event listener for update form submission
document.getElementById('updatePostForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const postID = document.getElementById('updatePostID').value;
    const title = document.getElementById('updatePostTitle').value;
    const content = document.getElementById('updatePostContent').value;
    await updatePost(postID, title, content);
});