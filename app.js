// BOOK CONSTRUCTOR
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//  UI CONSTRUCTOR
function UI() {}

// ADD BOOK TO LIST
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  // CREATE TR ELEMENT
  const row = document.createElement("tr");

  // INSERT COLS
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">x</a></td>
  `;

  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement("div");
  // Add class name
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// DELETE BOOK
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// CLEAR FIELDS
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// EVENT LISTENERS FOR ADD BOOK
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // INSTANTIATE UI
  const ui = new UI();

  // VALIDATE
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // ADD BOOK TO LIST
    ui.addBookToList(book);

    // Show success
    ui.showAlert("Book Added!", "success");

    // CLEAR FIELDS
    ui.clearFields();
  }

  e.preventDefault();
});

// EVENT LISTENER FOR DELETE
document.getElementById("book-list").addEventListener("click", function (e) {
  // INSTANTIATE UI
  const ui = new UI();

  //  DELETE BOOK
  ui.deleteBook(e.target);

  //  SHOW MESSAGE
  ui.showAlert("Book Removed!", "success");

  e.preventDefault();
});
