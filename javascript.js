/*
  TODO: 
  - add 'add song' functionality
  - add button to each song to remove it
  - add button to each song to change its haveHeard status
*/

let myLibrary = [];

function Song(title, author, album, length, haveHeard) {
  this.title = title;
  this.author = author;
  this.album = album;
  this.length = length;
  this.haveHeard = haveHeard;
  this.myLibraryIndex = undefined;

  this.info = function() {
    return this.title + ' by ' + this.author + ', ' + this.length + ' min long, ' + (haveHeard ? 'have heard' : 'not heard yet')
  }
}

function addSongToLibrary(song) {
  song.myLibraryIndex = myLibrary.length;
  myLibrary.push(song);
  displaySongs();
}

function removeSongFromLibrary(myLibraryIndex) {
  console.log(myLibraryIndex);
  myLibrary.splice(myLibraryIndex, 1); // Adjust myLibrary to remove deleted song
  // Reassign correct indexes to songs since they are now mislabeled
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].myLibraryIndex = i;
  }
  displaySongs(); //Refresh displayed songs
}

function displaySongs() {
  let songContainer = document.querySelector('.song-container');
  songContainer.innerHTML = ''; // Removes all song cards to redraw them
  for (let song of myLibrary) {
    let songCard = document.createElement('div');
    songCard.classList.add('song-card');

    let songNameElem = document.createElement('div');
    songNameElem.classList.add('song-name');
    songNameElem.textContent = `Song: ${song.title}`;
    songCard.appendChild(songNameElem);

    let songAuthorElem = document.createElement('div');
    songAuthorElem.classList.add('song-author');
    songAuthorElem.textContent = `Author: ${song.author}`;
    songCard.appendChild(songAuthorElem);

    let songAlbumElem = document.createElement('div');
    songAlbumElem.classList.add('song-album');
    songAlbumElem.textContent = `Album: ${song.album}`;
    songCard.appendChild(songAlbumElem);

    let songLengthElem = document.createElement('div');
    songLengthElem.classList.add('song-length');
    songLengthElem.textContent = `Length: ${song.length}`;
    songCard.appendChild(songLengthElem);

    let songHeardElem = document.createElement('div');
    songHeardElem.classList.add('song-heard-switch');
    songHeardElem.innerHTML = `
      Heard: 
      <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
      </label>
    `;
    songCard.appendChild(songHeardElem);

    let songRemoveElem = document.createElement('img');
    songRemoveElem.setAttribute('class', 'remove-song-button');
    songRemoveElem.setAttribute('src', './icons/music-note-minus.svg');
    songRemoveElem.setAttribute('alt', 'Remove song button');
    songRemoveElem.setAttribute('mylibraryindex', `${song.myLibraryIndex}`);
    songRemoveElem.addEventListener('click', (e) => {
      removeSongFromLibrary(Number(e.target.getAttribute('mylibraryindex')));
    });
    songCard.appendChild(songRemoveElem);

    songContainer.appendChild(songCard);
  }
}

function hideForm() {
  let formElement = document.querySelector('.form-container');
  formElement.style.display = (formElement.style.display === 'initial' ? 'none' : 'initial');
}

let addSongButton = document.querySelector('.add-song-button');
addSongButton.addEventListener('click', hideForm);

function saveInput() {
  let elements = document.querySelectorAll('.add-song-form input');
  console.log(elements);
  console.log(elements.length);
  let inputsArray = [];
  if (elements[0].value !== '') {
    for (let element of elements) {
      if (element.type === 'checkbox') {
        inputsArray.push(element.checked);
      } else if (element.id === 'album' && element.value === '') {
        inputsArray.push('N/A');
      } else {
        inputsArray.push(element.value);
      }
    }
    let song = new Song(...inputsArray);
    addSongToLibrary(song);
  }
}