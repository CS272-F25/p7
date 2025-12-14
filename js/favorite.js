async function loadFavorites() {
    const container = document.getElementById('favorites-section');
    const likedAnimals = JSON.parse(localStorage.getItem('likedAnimals')) || [];

    if (likedAnimals.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info text-center w-100" role="alert">
                You have no favorite animals yet! Go explore and like some animals.
            </div>
        `;
        return;
    }

    try {
        const response = await fetch('../animals.json');
        const data = await response.json();

        // Flatten all continents into one array
        const allAnimals = Object.values(data).flat();

        const favorites = allAnimals.filter(a => likedAnimals.includes(a.name));

        favorites.forEach(animal => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';

            col.innerHTML = `
                    <div class="card h-100">
                        <img class="card-img-top" src="${animal.img}" alt="${animal.name}">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h5 class="card-title mb-0">${animal.name}</h5>
                                <button class="btn btn-sm btn-danger like-btn">
                                    <i class="bi bi-heart-fill"></i> Like
                                </button>
                            </div>
                            <p class="card-text">
                                <span class="short-desc">${animal.short}</span>
                                <span class="more-desc" style="display:none;">${animal.more}</span>
                            </p>
                            <button onclick="toggleInfo(this)" class="btn btn-sm btn-outline-primary">Read More</button>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">${animal.details[0]}</li>
                                <li class="list-group-item">${animal.details[1]}</li>
                                <li class="list-group-item">${animal.details[2]}</li>
                                <li class="list-group-item">${animal.details[3]}</li>
                            </ul>
                        </div>
                    </div>
                    `;
            container.appendChild(col);

            const likeBtn = col.querySelector('.like-btn');
            likeBtn.addEventListener('click', () => {
                // Remove from favorites
                const index = likedAnimals.indexOf(animal.name);
                if (index !== -1) {
                    likedAnimals.splice(index, 1);
                    localStorage.setItem('likedAnimals', JSON.stringify(likedAnimals));
                    col.remove(); 
                }
            });
        });
    } catch (error) {
        console.error("Error loading favorite animals:", error);
    }
}

function toggleInfo(btn) {
    const more = btn.closest('.card-body').querySelector('.more-desc');
    if (more.style.display === "none") {
        more.style.display = "inline";
        btn.textContent = "Read Less";
    } else {
        more.style.display = "none";
        btn.textContent = "Read More";
    }
}

document.addEventListener('DOMContentLoaded', loadFavorites);