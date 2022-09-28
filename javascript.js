/*
  TODO: 
  - add 'add song' functionality
  - add button to each song to remove it
  - add button to each song to change its haveHeard status
*/

let myLibrary = [];

function Book(title, author, album, length, haveHeard) {
  this.title = title;
  this.author = author;
  this.album = album;
  this.length = length;
  this.haveHeard = haveHeard;

  this.info = function() {
    return this.title + ' by ' + this.author + ', ' + this.length + ' min long, ' + (haveHeard ? 'have heard' : 'not heard yet')
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
displayBooks(myLibrary)

let addSongButton = document.querySelector('.add-song-button');
addSongButton.addEventListener('click', () => {
  let formElement = document.querySelector('.form-container');
  formElement.style.display = (formElement.style.display === 'initial' ? 'none' : 'initial');
});