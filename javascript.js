let myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;

  this.info = function() {
    return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + (haveRead ? 'have read' : 'not read yet')
  }
}

// const theHobbit = new Book('The Hobbit', 'JRR Tolkien', 295, false);
// console.log(theHobbit.info());

//Example strInput: 'The Hobbit, JRR Tolkien, 295, false'
function addBookToLibrary(strInput) {
  let strArray = strInput.split(', ');
  let book = new Book(strArray[0], strArray[1], strArray[2], strArray[3]);
  myLibrary.push(book);
}

let bookContainer = document.querySelector('.book-container');
function displayBooks(myLibrary) {
  for (let book of myLibrary) {
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.textContent = book.info();
    bookContainer.appendChild(bookCard);
  }
}

addBookToLibrary('The Hobbit, JRR Tolkien, 295, false')
addBookToLibrary('The Hobbit2, JRR Tolkien2, 295, false')
addBookToLibrary('The Hobbit3, JRR Tolkien3, 295, false')
addBookToLibrary('The Hobbit, JRR Tolkien, 295, false')
addBookToLibrary('The Hobbit2, JRR Tolkien2, 295, false')
addBookToLibrary('The Hobbit3, JRR Tolkien3, 295, false')
displayBooks(myLibrary)