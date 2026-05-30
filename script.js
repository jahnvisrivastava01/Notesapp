const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");
const noteCount = document.getElementById("noteCount");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

displayNotes();

noteForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const noteText = noteInput.value.trim();

    if (noteText === "") {
        return;
    }

    const note = {
        text: noteText,
        date: new Date().toLocaleString()
    };

    notes.unshift(note);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    noteInput.value = "";

    displayNotes();
});

function displayNotes() {

    noteCount.textContent = `Total Notes: ${notes.length}`;

    notesContainer.innerHTML = "";

    if (notes.length === 0) {

        notesContainer.innerHTML = `
            <p class="empty-message">
                📝 No notes yet! Start writing your first note.
            </p>
        `;

        return;
    }

    notes.forEach((note, index) => {

        const noteCard = document.createElement("div");

        noteCard.classList.add("note-card");

        noteCard.innerHTML = `
            <p>${note.text}</p>

            <div class="note-date">
                ${note.date}
            </div>

            <button
                class="delete-btn"
                onclick="deleteNote(${index})"
            >
                Delete
            </button>
        `;

        notesContainer.appendChild(noteCard);
    });
}

function deleteNote(index) {

    notes.splice(index, 1);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    displayNotes();
}