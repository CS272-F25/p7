document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#button-search').previousElementSibling;
    const searchButton = document.getElementById('button-search');
    const searchResults = document.getElementById('search-results');

    let allAnimals = [];

    // Load all animals from JSON
    fetch('../animals.json')
        .then(res => res.json())
        .then(data => {
            allAnimals = Object.values(data).flat();
        })
        .catch(err => console.error("Error loading animals:", err));

    function createAnimalCard(animal) {
        const col = document.createElement('div');
        col.className = 'card mb-3';

        col.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${animal.img}" class="img-fluid rounded-start" alt="${animal.name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title mb-0">${animal.name}</h5>
                            <button class="btn btn-sm btn-outline-danger like-btn">
                                <i class="bi bi-heart"></i> Like
                            </button>
                        </div>
                        <p class="card-text">
                            <span class="short-desc">${animal.short}</span>
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Like button functionality
        const likeBtn = col.querySelector('.like-btn');
        const likedAnimals = JSON.parse(localStorage.getItem('likedAnimals')) || [];
        if (likedAnimals.includes(animal.name)) {
            likeBtn.classList.add('btn-danger');
            likeBtn.querySelector('i').classList.replace('bi-heart', 'bi-heart-fill');
        }

        likeBtn.addEventListener('click', () => {
            const index = likedAnimals.indexOf(animal.name);
            if (index === -1) {
                likedAnimals.push(animal.name);
                likeBtn.classList.add('btn-danger');
                likeBtn.querySelector('i').classList.replace('bi-heart', 'bi-heart-fill');
            } else {
                likedAnimals.splice(index, 1);
                likeBtn.classList.remove('btn-danger');
                likeBtn.querySelector('i').classList.replace('bi-heart-fill', 'bi-heart');
            }
            localStorage.setItem('likedAnimals', JSON.stringify(likedAnimals));
        });

        return col;
    }


    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = '';

        if (!query) {
            searchResults.innerHTML = `<p class="text-muted mt-2">Please enter a search term.</p>`;
            return;
        }

        const results = allAnimals.filter(a =>
            a.name.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            searchResults.innerHTML = `
        <div class="text-center mt-3">
            <img 
                src="../assets/not-found.png" 
                alt="No animals found" 
                class="img-fluid mb-2"
                style="max-width: 200px; opacity: 0.8;"
            >
            <p class="text-muted">
                No animals found for "${query}".
            </p>
        </div>`;
        }
        else {
            results.forEach(animal => {
                const card = createAnimalCard(animal);
                searchResults.appendChild(card);
            });
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') performSearch();
    });
});
