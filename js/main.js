// js/main.js
const booksKey = "books";

// Save books
function saveBooks(books) {
  localStorage.setItem(booksKey, JSON.stringify(books));
}

// Get books
function getBooks() {
  return JSON.parse(localStorage.getItem(booksKey)) || [];
}

// Delete a book
function deleteBook(id) {
  const books = getBooks().filter(b => b.id !== id);
  saveBooks(books);
}



