// js/dashboard.js
document.addEventListener("DOMContentLoaded", () => {
  const totalBooksEl = document.getElementById("total-books");
  const recentBookEl = document.getElementById("recent-book");
  const genreStatEl = document.getElementById("genre-count");
  const chartCanvas = document.getElementById("booksChart");

  if (!totalBooksEl) return;

  const books = getBooks();

  // Stats
  totalBooksEl.textContent = books.length;
  recentBookEl.textContent = books.length ? books[books.length - 1].title : "No books yet";
  genreStatEl.textContent = new Set(books.map(b => b.genre)).size;

  // Chart
  if (chartCanvas && typeof Chart !== "undefined") {
    const monthlyCounts = {};
    books.forEach(book => {
      const month = new Date(book.addedDate).toLocaleString("default", { month: "short" });
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });

    const labels = Object.keys(monthlyCounts);
    const values = Object.values(monthlyCounts);

    new Chart(chartCanvas, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Books Added Over Time",
          data: values,
          borderColor: "#3B82F6",
          borderWidth: 2,
          fill: false,
          tension: 0.3
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }
});
