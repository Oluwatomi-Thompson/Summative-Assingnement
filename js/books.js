document.addEventListener("DOMContentLoaded", () => {
  const booksKey = "books";
  const booksList = document.querySelector(".books-list");
  const searchInput = document.getElementById("searchInput");

  // Utility — Save and Get Books
  function getBooks() {
    return JSON.parse(localStorage.getItem(booksKey)) || [];
  }
  function saveBooks(books) {
    localStorage.setItem(booksKey, JSON.stringify(books));
  }

  // Toast Message
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast-message ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  // Custom Confirm Box
  function showConfirm(message, onConfirm) {
    const confirmBox = document.createElement("div");
    confirmBox.className = "confirm-box";
    confirmBox.innerHTML = `
      <div class="confirm-content">
        <p>${message}</p>
        <div class="confirm-actions">
          <button class="yes-btn">Yes</button>
          <button class="no-btn">No</button>
        </div>
      </div>
    `;
    document.body.appendChild(confirmBox);

    confirmBox.querySelector(".yes-btn").addEventListener("click", () => {
      onConfirm();
      confirmBox.remove();
    });
    confirmBox.querySelector(".no-btn").addEventListener("click", () => confirmBox.remove());
  }

  // Render Books
  function displayBooks(filteredBooks) {
    const books = filteredBooks || getBooks();
    booksList.innerHTML = "";

    if (books.length === 0) {
      booksList.innerHTML = `<p style="text-align:center; color:gray;">No books found.</p>`;
      return;
    }

    books.forEach((book) => {
      const card = document.createElement("div");
      card.classList.add("book-card");

      card.innerHTML = `
        <div class="book-details">
          <h3 contenteditable="false">${book.title}</h3>
          <p><strong>Author:</strong> <span contenteditable="false">${book.author}</span></p>
          <p><strong>Genre:</strong> <span contenteditable="false">${book.genre}</span></p>
          <p><strong>Date Added:</strong> ${book.addedDate}</p>
        </div>
        <div class="book-actions">
          <button class="edit-btn">Edit</button>
          <button class="save-btn" style="display:none;">Save</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;

      booksList.appendChild(card);

      // Edit Button
      const editBtn = card.querySelector(".edit-btn");
      const saveBtn = card.querySelector(".save-btn");
      const titleEl = card.querySelector("h3");
      const authorEl = card.querySelector("p:nth-of-type(1) span");
      const genreEl = card.querySelector("p:nth-of-type(2) span");

      editBtn.addEventListener("click", () => {
        [titleEl, authorEl, genreEl].forEach((el) => el.setAttribute("contenteditable", "true"));
        card.classList.add("editing");
        editBtn.style.display = "none";
        saveBtn.style.display = "inline-block";
      });

      // Save Button 
      saveBtn.addEventListener("click", () => {
        [titleEl, authorEl, genreEl].forEach((el) => el.setAttribute("contenteditable", "false"));
        card.classList.remove("editing");
        editBtn.style.display = "inline-block";
        saveBtn.style.display = "none";

        const allBooks = getBooks();
        const idx = allBooks.findIndex((b) => b.id === book.id);
        allBooks[idx] = {
          ...allBooks[idx],
          title: titleEl.textContent.trim(),
          author: authorEl.textContent.trim(),
          genre: genreEl.textContent.trim(),
        };
        saveBooks(allBooks);
        showToast("Book updated!");
      });

      // Delete Button
      const deleteBtn = card.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        showConfirm(`Delete "<strong>${book.title}</strong>"?`, () => {
          const updatedBooks = getBooks().filter((b) => b.id !== book.id);
          saveBooks(updatedBooks);
          displayBooks();
          showToast("Book deleted!");
        });
      });
    });
  }

  // Search Functionality
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const term = searchInput.value.trim();
      const regex = new RegExp(term, "i");
      const books = getBooks();
      const filtered = books.filter(
        (b) => regex.test(b.title) || regex.test(b.author) || regex.test(b.genre)
      );
      displayBooks(filtered);
    });
  }

  displayBooks();
});
