async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        const data = await response.json();

        const container = document.getElementById('blog-container');
        container.innerHTML = '';

        const heading = document.createElement('h2');
        heading.className = 'mb-4';
        heading.textContent = 'Did You Know…?';
        container.appendChild(heading);

        const posts = data.posts;

        if (posts.length === 0) return;

        const selectedPosts = [];
        const usedIndexes = new Set();

        while (selectedPosts.length < 6 && usedIndexes.size < posts.length) {
            const randomIndex = Math.floor(Math.random() * posts.length);
            if (!usedIndexes.has(randomIndex)) {
                usedIndexes.add(randomIndex);
                selectedPosts.push(posts[randomIndex]);
            }
        }

        const row = document.createElement('div');
        row.className = 'row';

        selectedPosts.forEach(post => {
            const col = document.createElement("div");
            col.className = 'col-md-6'
            

            col.innerHTML = `
            <div class="card mb-4">
                <img class="card-img-top" src="${post.image}" alt=${post.title}>
                <div class="card-body">
                    <div class="small text-muted">${post.date}</div>
                    <h2 class="card-title h5">${post.title}</h2>
                    <p class="card-text">${post.content}</p>
                </div>
            </div>`;
            
            row.appendChild(col);
        });
  
        container.appendChild(row);
    } catch (error) {
        console.error("Error loading posts:", error);
    }
}

window.addEventListener('DOMContentLoaded', loadPosts);
