/* ===========================
   1.  DATA INITIALISATION
=========================== */
// Load from localStorage or fall back to defaults
const quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "Two things are infinite: the universe and human stupidity.", category: "Humor" },
  { text: "So many books, so little time.", category: "Books" }
];

/* ===========================
   2.  STORAGE HELPERS
=========================== */
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

/* ===========================
   3.  CORE FUNCTIONS
=========================== */
// Display a random quote and remember it for this session
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const text = `"${quote.text}" — ${quote.category}`;
  document.getElementById("quoteDisplay").innerText = text;
  sessionStorage.setItem("lastViewedQuote", text);           // Optional session‑storage
}

// Add a new quote, save to storage, update DOM
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const catInput  = document.getElementById("newQuoteCategory");
  const text = textInput.value.trim();
  const category = catInput.value.trim();

  if (!text || !category) return;          // simple validation

  quotes.push({ text, category });
  saveQuotes();                            // persist to localStorage
  document.getElementById("quoteDisplay").innerText = `"${text}" — ${category}`;
  textInput.value = catInput.value = "";   // clear form
}

/* ===========================
   4.  JSON IMPORT / EXPORT
=========================== */
// Download quotes as JSON file
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from selected JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format.");
      }
    } catch {
      alert("Error reading file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

/* ===========================
   5.  EVENT LISTENERS
=========================== */
document.getElementById("newQuote")   .addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
document.getElementById("exportBtn")  .addEventListener("click", exportToJson);
document.getElementById("importFile") .addEventListener("change", importFromJsonFile);

/* ===========================
   6.  INITIAL LOAD STATE
=========================== */
// Restore last viewed quote this session (optional)
const last = sessionStorage.getItem("lastViewedQuote");
if (last) document.getElementById("quoteDisplay").innerText = last;
