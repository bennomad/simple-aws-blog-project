const apiBaseUrl = 'https://k9b4bsvkmi.execute-api.us-east-1.amazonaws.com/dev';

document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    document.getElementById('createPostForm').addEventListener('submit', createPostHandler);
});

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
        <div class="post" id="${post.postID}">
            <div class="post-title">${post.title}</div>
            <div>${post.content}</div>
            <button onclick="deletePost('${post.postID}')">Delete</button>
            <button onclick="showUpdateForm('${post.postID}', '${post.title}', '${post.content}')">Update</button>
        </div>
    `).join('');
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

async function deletePost(postID) {
    try {
        const response = await fetch(`${apiBaseUrl}/posts/${postID}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete post');
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
        console.log('Post updated successfully');
        await loadPosts();
    } catch (error) {
        console.error('Error updating post:', error);
    }
}
async function showUpdateForm(postID, title, content) {
    // Display the update post section
    document.getElementById('updatePostSection').style.display = 'block';
    // Set the values of the form inputs to the current post's title, content, and ID
    document.getElementById('updatePostID').value = postID;
    document.getElementById('updatePostTitle').value = title;
    document.getElementById('updatePostContent').value = content;

    // Scroll to the update form for better user experience
    document.getElementById('updatePostSection').scrollIntoView();
}

// Add an event listener for your update form submission
document.getElementById('updatePostForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const postID = document.getElementById('updatePostID').value;
    const title = document.getElementById('updatePostTitle').value;
    const content = document.getElementById('updatePostContent').value;
    await updatePost(postID, title, content);
});