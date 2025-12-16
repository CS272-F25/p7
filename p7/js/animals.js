document.addEventListener('DOMContentLoaded', () => {
    const likedAnimals = JSON.parse(localStorage.getItem('likedAnimals')) || [];

    // Use event delegation: handle clicks on like buttons even if they are generated later
    document.getElementById('animals-section').addEventListener('click', (e) => {
        if (e.target.closest('.like-btn')) {
            const btn = e.target.closest('.like-btn');
            const cardBody = btn.closest('.card-body');
            const animalName = cardBody.querySelector('.card-title').textContent;

            const index = likedAnimals.indexOf(animalName);
            if (index === -1) {
                likedAnimals.push(animalName);
                btn.classList.add('btn-danger');
                btn.querySelector('i').classList.replace('bi-heart', 'bi-heart-fill');
            } else {
                likedAnimals.splice(index, 1);
                btn.classList.remove('btn-danger');
                btn.querySelector('i').classList.replace('bi-heart-fill', 'bi-heart');
            }

            localStorage.setItem('likedAnimals', JSON.stringify(likedAnimals));
        }
    });

    // Restore liked status after cards are generated
    setTimeout(() => {
        document.querySelectorAll('.like-btn').forEach(btn => {
            const cardBody = btn.closest('.card-body');
            const animalName = cardBody.querySelector('.card-title').textContent;
            if (likedAnimals.includes(animalName)) {
                btn.classList.add('btn-danger');a
                btn.querySelector('i').classList.replace('bi-heart', 'bi-heart-fill');
            }
        });
    }, 100); // Wait a short time for asynchronous card generation
});
