const API = "http://localhost:3000/books";

async function loadBooks() {
  const res = await fetch(API);
  const data = await res.json();

  document.getElementById("book-list").innerHTML =
    data.map(b => `
      <div class="book-card">
        <span class="title">${b.title}</span> — ${b.author}
        <div class="meta">${b.category} | Copies: ${b.availableCopies}</div>
      </div>
    `).join("");
}
