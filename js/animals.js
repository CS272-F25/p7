async function generateCards() {
    const container = document.getElementById('animals-section').querySelector('.row');
    const continent = document.body.dataset.continent;
    console.log(continent);

    try {
        const response = await fetch('../animals.json');
        const data = await response.json();
        const animals = data[continent];

        animals.forEach(animal => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';

            col.innerHTML = `
            <div class="card h-100">
                <img class="card-img-top" src="${animal.img}" alt="${animal.name}">
                <div class="card-body">
                    <h5 class="card-title">${animal.name}</h5>
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
        });
    } catch (error) {
        console.error("Error loading animal cards:", error);
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', generateCards);

