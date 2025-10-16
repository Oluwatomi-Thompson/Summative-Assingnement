document.addEventListener("DOMContentLoaded", () => {
  const importBtn = document.querySelector(".import-btn");
  const exportBtn = document.querySelector(".export-btn");
  const resetBtn = document.querySelector(".reset-btn");
  const booksKey = "books";

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

  // Confirm Box
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

  //  Export
  exportBtn?.addEventListener("click", () => {
    const dataStr = JSON.stringify(getBooks(), null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookvault-data.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Data exported!");
  });

  // Import
  importBtn?.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const data = JSON.parse(evt.target.result);
          saveBooks(data);
          showToast("Data imported!");
        } catch {
          showToast("Invalid file format", "error");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  });

  // Reset
  resetBtn?.addEventListener("click", () => {
    showConfirm("Reset all data?", () => {
      localStorage.clear();
      showToast("All data reset!");
    });
  });
});
