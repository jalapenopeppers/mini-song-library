/*
  TODO: 
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

function toggleHaveHeard(song) {
  if (song.haveHeard === true) {
    song.haveHeard = false;
  } else {
    song.haveHeard = true;
  }
  console.log(song.haveHeard);
}

function displaySongs() {
  let songContainer = document.querySelector('.song-container');
  songContainer.innerHTML = ''; // Removes all song cards to redraw them
  for (let song of myLibrary) {
    let songCard = document.createElement('div');
    songCard.classList.add('song-card');
    songCard.setAttribute('mylibraryindex', `${song.myLibraryIndex}`);

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
    songHeardElem.textContent = 'Heard: ';
    let labelSwitchElem = document.createElement('label')
    labelSwitchElem.classList.add('switch');

    let inputElem = document.createElement('input');
    inputElem.setAttribute('type', 'checkbox');
    if (song.haveHeard === true) {
      inputElem.checked = true;
    }
    let spanElem = document.createElement('span');
    spanElem.classList.add('slider', 'round');
    labelSwitchElem.appendChild(inputElem);
    labelSwitchElem.appendChild(spanElem);
    inputElem.addEventListener('click', (e) => {
      console.log(e.currentTarget.parentNode.parentNode.parentNode.getAttribute('mylibraryindex'));
      let selectedSongIndex = Number(e.currentTarget.parentNode.parentNode.parentNode.getAttribute('mylibraryindex'));
      if (myLibrary[selectedSongIndex].haveHeard === true) {
        myLibrary[selectedSongIndex].haveHeard = false;
      } else {
        myLibrary[selectedSongIndex].haveHeard = true;
      }
    }, false);
    songHeardElem.appendChild(labelSwitchElem);
    songCard.appendChild(songHeardElem);

    let songRemoveElem = document.createElement('img');
    songRemoveElem.setAttribute('class', 'remove-song-button');
    songRemoveElem.setAttribute('src', './icons/music-note-minus.svg');
    songRemoveElem.setAttribute('alt', 'Remove song button');
    songRemoveElem.addEventListener('click', (e) => {
      removeSongFromLibrary(Number(e.currentTarget.parentNode.getAttribute('mylibraryindex')));
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
  if (!validateAddSongForm()) {
    // Don't save any input if the form does not pass validation
    return;
  }
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
  hideForm();
}

// Returns true if everything is valid, false if not
function validateAddSongForm() {
  const songNameInput = document.querySelector('input#song-name');
  const songNameErrorMsg = document.querySelector('span.song-name');
  const songAuthorInput = document.querySelector('input#author');
  const songAuthorErrorMsg = document.querySelector('span.author');
  const songLengthInput = document.querySelector('input#length');
  const songLengthErrorMsg = document.querySelector('span.length');
  let passedValidation = true;

  if (songNameInput.validity.valueMissing) {
    songNameErrorMsg.textContent = 'Please enter a title';
    songNameInput.style.border = '2px solid rgb(214, 85, 85)';
    songNameInput.addEventListener('input', (e) => {
      if (!songNameInput.validity.valueMissing) {
        songNameErrorMsg.textContent = '';
        songNameInput.style.border = '';
      } else {
        songNameErrorMsg.textContent = 'Please enter a title';
        songNameInput.style.border = '2px solid rgb(214, 85, 85)';
      }
    });
    passedValidation = false;
  } else {
    songNameErrorMsg.textContent = '';
    songNameInput.style.border = '';
    // Remove event listener here
  }
  if (songAuthorInput.validity.valueMissing) {
    songAuthorErrorMsg.textContent = 'Please enter an author';
    passedValidation = false;
    songAuthorInput.style.border = '2px solid rgb(214, 85, 85)';
    songAuthorInput.addEventListener('input', (e) => {
      if (!songAuthorInput.validity.valueMissing) {
        songAuthorErrorMsg.textContent = '';
        songAuthorInput.style.border = '';
      } else {
        songAuthorErrorMsg.textContent = 'Please enter an author';
        songAuthorInput.style.border = '2px solid rgb(214, 85, 85)';
      }
    });
  } else {
    songAuthorErrorMsg.textContent = '';
    songAuthorInput.style.border = '';
    // Remove event listener here
  }
  if (songLengthInput.validity.valueMissing) {
    songLengthErrorMsg.textContent = 'Please enter a song length';
    songLengthInput.style.border = '2px solid rgb(214, 85, 85)';
    songLengthInput.addEventListener('input', (e) => {
      if (songLengthInput.validity.valueMissing) {
        songLengthErrorMsg.textContent = 'Please enter a song length';
        songLengthInput.style.border = '2px solid rgb(214, 85, 85)';
      } else if (songLengthInput.validity.patternMismatch) {
        songLengthErrorMsg.textContent = 'Use this format: 3:50';
        songLengthInput.style.border = '2px solid rgb(214, 85, 85)';
      } else {
        songLengthErrorMsg.textContent = '';
        songLengthInput.style.border = '';
      }
    });
    passedValidation = false;
  } else if (songLengthInput.validity.patternMismatch) {
    songLengthErrorMsg.textContent = 'Use this format: 3:50';
    songLengthInput.style.border = '2px solid rgb(214, 85, 85)';
    songLengthInput.addEventListener('input', (e) => {
      if (songLengthInput.validity.valueMissing) {
        songLengthErrorMsg.textContent = 'Please enter a song length';
        songLengthInput.style.border = '2px solid rgb(214, 85, 85)';
      } else if (songLengthInput.validity.patternMismatch) {
        songLengthErrorMsg.textContent = 'Use this format: 3:50';
        songLengthInput.style.border = '2px solid rgb(214, 85, 85)';
      } else {
        songLengthErrorMsg.textContent = '';
        songLengthInput.style.border = '';
      }
    });
    passedValidation = false;
  } else {
    songLengthErrorMsg.textContent = '';
    songLengthInput.style.border = '';
    // Remove event listener here
  }
  return passedValidation;
}