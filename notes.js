const movies = JSON.parse(localStorage.getItem("watchlist")) || [];

const movieSelect = document.getElementById("movieSelect");
const movieNote = document.getElementById("movieNote");
const notesList = document.getElementById("notesList");

movies.forEach(movie => {
  const option = document.createElement("option");
  option.value = movie.title;
  option.textContent = movie.title;
  movieSelect.appendChild(option);
});

function saveNote() {
  const title = movieSelect.value;
  const note = movieNote.value.trim();
  if (!title || !note) {
    alert("Please select a movie and write a note.");
    return;
  }

  const notes = JSON.parse(localStorage.getItem("movieNotes")) || {};
  notes[title] = note;
  localStorage.setItem("movieNotes", JSON.stringify(notes));
  alert("Note saved!");

  movieNote.value = "";
  renderNotes();
}

function renderNotes() {
  const notes = JSON.parse(localStorage.getItem("movieNotes")) || {};
  notesList.innerHTML = "";
  for (let title in notes) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${title}:</strong> ${notes[title]}`;
    notesList.appendChild(li);
  }
}

function toggleMenu() {
  document.querySelector("nav").classList.toggle("show");
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  renderNotes();
};

