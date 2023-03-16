const content = document.querySelector("content");

let myLibrary = [];

// The focus of this project is to make a working add/remove book library, the css and code cleanup will be done later
// The aim was the working code
// TODO: Styling, add return button for the "add new book" screen
// Text is overflowing if there is too much of it, have to contain it. Maybe change size dynamically?
// For the purposes of the project, I used divs instead of an actual form. Need to change the submit book screen to a form.
// Input validation, you shouldn't be able to add a book with no title. Maybe without author? Or add checkboxes that say "this book has no author"

function Book() {
  this.author;
  this.title;
  this.totalPages;
  this.currentPage;
  this.isRead;
}

for (let i = 0; i < 4; i++) {
  const book = new Book();
  book.title = "title goes here";
  book.author = "author goes here";
  book.totalPages = 500;
  book.currentPage = 15;
  book.isRead = false;
  myLibrary.push(book);
}

function displayCollection() {
  clearContent();

  for (let i = 0; i < myLibrary.length; i++) {
    createHtmlCard(myLibrary[i]);
  }

  // add book button that looks like other cards
  const newBookHtmlCard = document.createElement("div");
  newBookHtmlCard.innerText = "+";
  newBookHtmlCard.classList.add("card", "new-book-html-card");
  content.appendChild(newBookHtmlCard);
  newBookHtmlCard.addEventListener("click", function () {
    addBookToMyLibrary();
  });
}
displayCollection();

function addBookToMyLibrary() {
  // switch to actual forms
  clearContent();

  const formWrapper = document.createElement("div");
  formWrapper.classList.add("form-wrapper");
  content.appendChild(formWrapper);

  const form = document.createElement("div");
  form.classList.add("form");
  formWrapper.appendChild(form);

  const authorInput = document.createElement("input");
  authorInput.setAttribute("type", "text");
  authorInput.placeholder = "Author";
  form.appendChild(authorInput);

  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.placeholder = "Title";
  form.appendChild(titleInput);

  const totalPagesInput = document.createElement("input");
  totalPagesInput.setAttribute("type", "number");
  totalPagesInput.placeholder = "Total pages";
  form.appendChild(totalPagesInput);

  const currentPageInput = document.createElement("input");
  currentPageInput.setAttribute("type", "number");
  currentPageInput.placeholder = "Current page";
  form.appendChild(currentPageInput);

  let isRead = false;
  const isReadButton = document.createElement("div");
  form.appendChild(isReadButton);

  const submitButton = document.createElement("div");
  submitButton.id = "submit-button";
  submitButton.innerText = "submit";
  form.appendChild(submitButton);

  submitButton.addEventListener("click", function () {
    const newBook = new Book();
    newBook.author = authorInput.value;
    newBook.title = titleInput.value;
    newBook.totalPages = totalPagesInput.value;
    newBook.currentPage = currentPageInput.value;
    newBook.isRead = isRead;
    myLibrary.push(newBook);
    displayCollection();
  });
}

// receives a book object, creates a card and displays it on the DOM
function createHtmlCard(book) {
  const index = myLibrary.indexOf(book);
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-index", index);
  content.appendChild(card);

  const author = document.createElement("div");
  author.innerText = book.author;
  author.classList.add("author");
  card.appendChild(author);

  const title = document.createElement("div");
  title.innerText = book.title;
  title.classList.add("title");
  card.appendChild(title);

  const totalPages = document.createElement("div");
  totalPages.innerText = book.totalPages;
  totalPages.classList.add("total-pages");
  card.appendChild(totalPages);

  const currentPage = document.createElement("div");
  currentPage.innerText = book.currentPage;
  currentPage.classList.add("current-page");
  card.appendChild(currentPage);

  const cardButtonWrapper = document.createElement("div");
  cardButtonWrapper.id = "card-button-wrapper";
  card.appendChild(cardButtonWrapper);

  const isReadButton = document.createElement("div");
  isReadButton.classList.add("is-read-button");
  cardButtonWrapper.appendChild(isReadButton);

  const checkIfRead = function () {
    if (book.isRead) {
      isReadButton.innerText = "READ";
      isReadButton.classList.add("is-read-button-true");
    } else if (!book.isRead) {
      isReadButton.innerText = "NOT READ";
      isReadButton.classList.remove("is-read-button-true");
    }
  };
  checkIfRead();

  isReadButton.addEventListener("click", function () {
    book.isRead = !book.isRead;
    checkIfRead();
  });

  const removeButton = document.createElement("div");
  removeButton.innerText = "remove";
  removeButton.classList.add("remove-button");
  cardButtonWrapper.appendChild(removeButton);

  removeButton.addEventListener("click", function () {
    myLibrary.splice(index, 1);
    displayCollection();
    console.log(`removed ${index}`);
  });
}

function clearContent() {
  while (content.lastChild) {
    content.removeChild(content.lastChild);
  }
}

function validateInputs() {}
