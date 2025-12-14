document.addEventListener("DOMContentLoaded", () => {
    const noteInput = document.getElementById("note-input");
    const saveBtn = document.getElementById("save-note");
    const notesList = document.getElementById("notes-list");

    const pageKey = `studyNotes_${document.body.dataset.continent || "default"}`;

    const notes = JSON.parse(localStorage.getItem(pageKey)) || [];

    function displayNotes() {
        notesList.innerHTML = "";
        notes.forEach((note, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-start";
            li.innerHTML = `
                <div>
                    <strong>${note.date}:</strong> ${note.text}
                </div>
                <button class="btn btn-sm btn-outline-danger delete-btn"><i class="bi bi-trash"></i></button>
            `;
            
            li.querySelector(".delete-btn").addEventListener("click", () => {
                notes.splice(index, 1);
                localStorage.setItem(pageKey, JSON.stringify(notes));
                displayNotes();
            });
            notesList.appendChild(li);
        });
    }

    displayNotes();

    saveBtn.addEventListener("click", () => {
        const text = noteInput.value.trim();
        if (text === "") return;

        const date = new Date().toLocaleString();
        const newNote = { text, date };

        notes.push(newNote);
        localStorage.setItem(pageKey, JSON.stringify(notes));

        noteInput.value = "";
        displayNotes();
    });
});
