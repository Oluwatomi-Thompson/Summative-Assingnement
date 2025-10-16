# Book Notes and  Vault

**Book Vault** is a simple, accessible, and responsive microsite for organizing books and notes.  
It was created with a focus on **semantic HTML**, **clean CSS**, **keyboard accessibility**, and **regex-based data validation**.

---

## Theme
**Book & Notes Vault** — A platform to organize, search and store notes and books.

---

## Features
- Add, edit, and delete books and notes  
- Import and export data  
- Reset data to start fresh  
- Regex-based input validation  
- Full keyboard navigation  
- Accessible and screen-reader friendly (ARIA included)  
- Works fully offline (data stored locally)

---

## Regex Catalog

| Field | Regex Pattern | Example | Description |
|-------|----------------|----------|--------------|
| **Book Title** | `^[A-Za-z0-9\\s,.'-]{2,50}$` | `The Great Gatsby` | Allows letters, numbers, and punctuation, 2–50 characters |
| **Author Name** | `^[A-Za-z\\s.'-]{2,40}$` | `F. Scott Fitzgerald` | Accepts alphabets and periods, 2–40 characters |
| **ISBN** | `^(97(8|9))?\\d{9}(\\d|X)$` | `9783161484100` | Validates 10 or 13-digit ISBN |
| **Notes Search** | `/book/i` | `Book`, `books`, `BOOK` | Case-insensitive search for notes |

---

## Keyboard Map

| Key | Action |
|-----|--------|
| `Tab` | Move between interactive elements |
| `Enter` | Activate selected button or link |

---

## Accessibility Notes (A11y)
- All images include descriptive `alt` text.  
- ARIA roles (`role="navigation"`, `aria-label`, `aria-live`, etc.) provide context for assistive technologies.  
- Interactive elements use semantic HTML (`<button>`, `<a>`, `<form>`).  
- High color contrast for legibility.  
- Keyboard focus states clearly visible.

---

## Running and Testing the App

### Run the app
Open `index.html` in your browser or visit the GitHub Pages link below.

### Import seed data
To test the app with demo books:
- Click **“Import Data”** on the settings page.
- Select the file `seed.json` (included in the project folder).

### Check data functionality
You can now test:
- Adding / Editing / Deleting books
- Exporting and Resetting data
- Accessibility features

---

## Live Demo
**GitHub Pages:** [https://oluwatomi-thompson.github.io/Summative-Assingnement/]  
**Demo Video:** [https://youtu.be/8upIS5jlGz8]

---

## Credits
Designed and developed by **Thompson Oluwatomi**  
© 2025 BookVault | All Rights Reserved
