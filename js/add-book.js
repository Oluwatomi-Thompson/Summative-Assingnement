// js/add-book.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const date = document.getElementById("date").value;

    if (!title || !author || !genre || !date) {
      alert("Please fill in all fields.");
      return;
    }

    const books = getBooks();
    books.push({
      id: Date.now(),
      title,
      author,
      genre,
      addedDate: date
    });

    saveBooks(books);
    window.location.href = "books.html";
  });
});
