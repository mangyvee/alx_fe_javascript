// quotes array with text and category
const quotes = [
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "Two things are infinite: the universe and human stupidity.", category: "Humor" },
  { text: "So many books, so little time.", category: "Books" }
];

// REQUIRED: function to display a random quote and update the DOM
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerText = `"${quote.text}" — ${quote.category}`;
}

// REQUIRED: function to add a new quote to the array and update the DOM
function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  if (text && category) {
    quotes.push({ text, category });

    // Update DOM with new quote immediately
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerText = `"${text}" — ${category}`;

    // Clear form
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }
}

// REQUIRED: event listener for the “Show New Quote” button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Also hook Add Quote button
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
