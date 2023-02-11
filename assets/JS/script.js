'use strict';

/* || modal */
const modal = document.querySelector('[data-modal-new]');

function hideModal() {
  modal.classList.add('fade-out');
  setTimeout(() => {
    modal.classList.remove('fade-out');
    modal.classList.add('hide');
    modal.classList.remove('show');
    
  }, 500);
  
  if (modal.classList.contains('fade-in')) {
    modal.classList.remove('fade-in');
  }
}

function showModal () { 
  modal.classList.remove('hide');
  modal.classList.add('show');
  modal.classList.add('fade-in');
}

//closes modal if clicked outside
function clickOutside(e) {
  if(e.target === modal) {
    hideModal();
}
}

// || Modal event listeners
const openModalBtn = document.querySelector('[data-open-modal]').addEventListener('click', showModal);

const closeModal = document.querySelector('[data-close-modal]').addEventListener('click', hideModal);

// listnen to outside click
modal.addEventListener('click', clickOutside);


//closes modal in ESC key
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && !modal.classList.contains('hide')) {
    hideModal();
  }
})


/* testing */
const bookStatus = document.querySelector('#status');
const booRating = document.querySelector('#rating');

let selectedBook;

//select book status
bookStatus.addEventListener('change', (e) => {
  selectedBook = e.target.value;
  if(selectedBook === 'Need to start') {
    booRating.disabled = true;
  }else {
    booRating.disabled = false;
  }
})

// Book rating
booRating.addEventListener('blur', (e) => {
  const rating = e.target.value;
  if (rating > 5) {
    alert('Please rate from 1 to 5');
    return;
  }
  // to be continued
})

/* ||  book display section*/
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const statusInput = document.querySelector('#status');
const ratingInput = document.querySelector('#rating')
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  hideModal();
})
// will store all the created books
let myLibrary = [];

// object constructor for the books
function Book (title, author, status, rating) {
  this.title = title;
  this.author = author;
  this.status = status;
  this.rating = rating;
}
Book.prototype.toggleRead = function () {
  this.status = this.status === 'reading' ? 'finished' : 'reading';
}


function addBookToLibrary () {
  let title = titleInput.value;
  let author = authorInput.value;
  let status = statusInput.value;
  let rating = ratingInput.value;
  let newBook = new Book(title, author, status, rating);

  myLibrary.push(newBook);
  displayBooks();
}

function changeReadStatus(index) {
  myLibrary[index].toggleRead();
  displayBooks();
}


// displaying the books
function displayBooks() {
  let bookShelf = document.querySelector('.bookshelf-ctn ');
  bookShelf.textContent = '';

  myLibrary.forEach(book => {
    let bookCover = document.createElement('div');
    bookCover.classList.add('book')
    bookCover.setAttribute('data-index', book); // conecting the DOM elements with the actual book with data-attributes

    let title = document.createElement('h2');
    title.textContent = `${book.title}`;
    bookCover.appendChild(title);

    let author = document.createElement('p');
    author.classList.add('author');
    author.textContent = `by ${book.author}`;
    bookCover.appendChild(author);

    let bookStatus = document.createElement('p');
    bookStatus.classList.add('status__clr');
    bookStatus.textContent = `${book.status}`;
    bookCover.appendChild(bookStatus);

    let changeBookStatus = document.createElement('button');
    changeBookStatus.textContent = `Status`;
    changeBookStatus.type = 'button';
    changeBookStatus.classList.add('btn');
    changeBookStatus.onclick = function () {
      changeReadStatus(myLibrary.indexOf(book));
    }
    bookCover.appendChild(changeBookStatus);
    

    bookShelf.appendChild(bookCover);
  })
}

