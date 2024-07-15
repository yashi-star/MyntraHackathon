document.addEventListener('DOMContentLoaded', function() {
    const uploadBtn = document.getElementById('upload-btn');
    const postBtn = document.getElementById('post-btn');
    const fileInput = document.getElementById('file-input');
    const gallery = document.querySelector('.gallery');

    let selectedFile;

    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        selectedFile = event.target.files[0];
        if (selectedFile) {
            postBtn.style.display = 'block';
        }
    });

    postBtn.addEventListener('click', function() {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imgSrc = event.target.result;
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.setAttribute('tabindex', '0');
                galleryItem.innerHTML = `
                    <span class="delete-icon"><i class="fas fa-trash-alt"></i></span>
                    <img src="${imgSrc}" class="gallery-image" alt="">
                    <div class="gallery-item-info">
                        <ul>
                            <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 0</li>
                            <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 0</li>
                        </ul>
                    </div>
                `;
                gallery.insertBefore(galleryItem, gallery.firstChild);

                // Add delete functionality
                galleryItem.querySelector('.delete-icon').addEventListener('click', function() {
                    galleryItem.remove();
                });
            };
            reader.readAsDataURL(selectedFile);
            selectedFile = null;
            postBtn.style.display = 'none';
        }
    });

    // Add delete functionality to existing gallery items
    document.querySelectorAll('.gallery-item').forEach(function(item) {
        item.querySelector('.delete-icon').addEventListener('click', function() {
            item.remove();
        });
    });
});


document.getElementById('post-btn').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onloadend = function() {
            const imageData = reader.result;
            // Save image data to local storage
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.push(imageData);
            localStorage.setItem('posts', JSON.stringify(posts));
            alert('Post uploaded successfully!');
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image to upload.');
    }
});



// count lies
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        let lastTap = 0;

        item.addEventListener('click', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;

            if (tapLength < 500 && tapLength > 0) {
                // Double tap detected
                const likesElem = item.querySelector('.likes-count');
                let likes = parseInt(item.getAttribute('data-likes'));
                const isLiked = item.getAttribute('data-liked') === 'true';

                if (!isLiked) {
                    likes += 1;
                    item.setAttribute('data-liked', 'true');
                    item.querySelector('.fa-heart').classList.add('liked');
                } else {
                    likes -= 1;
                    item.setAttribute('data-liked', 'false');
                    item.querySelector('.fa-heart').classList.remove('liked');
                }

                item.setAttribute('data-likes', likes);
                likesElem.textContent = likes;
            }

            lastTap = currentTime;
        });
    });
});
