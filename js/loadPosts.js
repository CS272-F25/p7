async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        const data = await response.json();

        const container = document.getElementById('blog-container');
        container.innerHTML = '';

        // Featured post
        const featured = data.featuredPosts[Math.floor(Math.random() * data.featuredPosts.length)];
        const featuredHTML = `
        <div class="card mb-4">
            <a href="${featured.link}"><img class="card-img-top" src="${featured.img}" alt="..."></a>
            <div class="card-body">
                <div class="small text-muted">${featured.date}</div>
                <h2 class="card-title">${featured.title}</h2>
                <p class="card-text">${featured.text}</p>
                <a class="btn btn-primary" href="${featured.link}">Read more →</a>
            </div>
        </div>`;
        container.insertAdjacentHTML('beforeend', featuredHTML);

        // Other posts
        const row = document.createElement('div');
        row.className = 'row';

        data.posts.forEach(post => {
            const col = document.createElement('div');
            col.className = 'col-lg-6';

            col.innerHTML = `
        <div class="card mb-4">
            <a href="${post.link}"><img class="card-img-top" src="${post.img}" alt="..."></a>
            <div class="card-body">
                <div class="small text-muted">${post.date}</div>
                <h2 class="card-title h4">${post.title}</h2>
                <p class="card-text">${post.text}</p>
                <a class="btn btn-primary" href="${post.link}">Read more →</a>
            </div>
        </div>`;
            row.appendChild(col);
        });
        
        container.appendChild(row);
    } catch (error) {
        console.error("Error loading posts:", error);
    }
}

// Call function on page load
window.addEventListener('DOMContentLoaded', loadPosts);
