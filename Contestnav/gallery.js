// script.js

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', handleLike);
    });

    document.querySelectorAll('.submit-comment').forEach(button => {
        button.addEventListener('click', handleComment);
    });
});

function handleLike(event) {
    const likeBtn = event.target;
    const likeCountSpan = likeBtn.nextElementSibling;
    let likeCount = parseInt(likeCountSpan.textContent);

    if (likeBtn.classList.contains('liked')) {
        likeCount--;
        likeBtn.classList.remove('liked');
        likeBtn.textContent = 'Like';
    } else {
        likeCount++;
        likeBtn.classList.add('liked');
        likeBtn.textContent = 'Liked';
    }

    likeCountSpan.textContent = `${likeCount} likes`;
}

function handleComment(event) {
    const commentBtn = event.target;
    const commentInput = commentBtn.previousElementSibling;
    const commentText = commentInput.value.trim();
    const commentList = commentBtn.parentElement.nextElementSibling;

    if (commentText) {
        const newComment = document.createElement('p');
        newComment.textContent = commentText;
        commentList.appendChild(newComment);
        commentInput.value = '';
    }
}


window.addEventListener('load', function() {
    const gallery = document.getElementById('gallery');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach(post => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <span class="delete-icon"><i class="fas fa-trash-alt"></i></span>
            <img src="${post}" class="gallery-image" alt="User Post">
            <div class="gallery-item-info">
                <ul>
                    <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 0</li>
                    <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 0</li>
                </ul>
            </div>
        `;
        gallery.appendChild(galleryItem);
    });
});


//moving from gallery to result likes
document.addEventListener('DOMContentLoaded', function() {
    const likeIcons = document.querySelectorAll('.like-icon');

    likeIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const post = this.closest('.post');
            const postId = post.getAttribute('data-id');
            const likeCountElem = post.querySelector('.like-count');
            let likes = parseInt(likeCountElem.textContent.split(' ')[0]);

            likes++;
            likeCountElem.textContent = `${likes} likes`;

            // Send the like data to result.html
            fetch('update_likes.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `postId=${postId}&likes=${likes}`,
            })
            .then(response => response.text())
            .then(data => console.log(data)) // Handle response if needed
            .catch(error => console.error('Error:', error));
        });
    });
});
