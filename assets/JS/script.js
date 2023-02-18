'use strict';

/* || Form modal */
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

function showModal() {
  modal.classList.remove('hide');
  modal.classList.add('show');
  modal.classList.add('fade-in');
}

//closes modal if clicked outside
function clickOutside(e) {
  if (e.target === modal) {
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
  if (e.key === 'Escape' && !modal.classList.contains('hide')) {
    hideModal();
  }
})
/* ******************************************************************* */


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
  reset.formReset();
})



/* LIBRARY */
// will store all the created books
let myLibrary = [];

// object constructor for the books
function Book(title, author, status, rating) {
  this.title = title;
  this.author = author;
  this.status = status;
  this.rating = rating
}

Book.prototype.toggleRead = function () {
  this.status = this.status === 'reading' ? 'finished' : 'reading';
}
// reseting the form inputs after submit
Book.prototype.formReset = function () {
  titleInput.value = '';
  authorInput.value = '';
  statusInput.value = '';
  ratingInput.value = '';
}

let reset = Object.create(Book.prototype);



function addBookToLibrary() {
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

/* modal to confirm if want to delete the selected book */
const deleteBookModal = document.querySelector('[data-book-delete]');
const deleteButton = document.querySelector('[data-delete-btn]');
const cancelButton = document.querySelector('[data-cancel-btn]')

deleteButton.addEventListener('click', () => {
  const index = deleteButton.getAttribute('data-index');
  deleteBook(index);
  hideDeleteModal();
})

cancelButton.addEventListener('click', () => {
  hideDeleteModal();
})

function hideDeleteModal() {
  deleteBookModal.classList.add('fade-out');
  setTimeout(() => {
    deleteBookModal.classList.remove('fade-out');
    deleteBookModal.classList.add('hide');
    deleteBookModal.classList.remove('show');

  }, 500);

  if (deleteBookModal.classList.contains('fade-in')) {
    deleteBookModal.classList.remove('fade-in');
  }

}

// total number of stars to be used in calculation
const starsTotal = 5

const bookTitle = document.querySelector('.book-title');

// displaying the books
function displayBooks() {
  let bookShelf = document.querySelector('.bookshelf-ctn ');
  bookShelf.textContent = '';

  myLibrary.forEach((book, index) => {
    let bookCover = document.createElement('div');
    bookCover.classList.add('book')
    bookCover.setAttribute('data-index', index); // conecting the DOM elements with the actual book with data-attributes

    // Book form  elements
    let title = document.createElement('h2');
    title.textContent = `${book.title}`;

    // author element
    let authorContainer = document.createElement('div');
    let author = document.createElement('p');
    authorContainer.classList.add('author-container');
    author.classList.add('author');
    author.textContent = `by ${book.author}`;

    let bookDate = document.createElement('p');
    bookDate.classList.add('book-date');
    bookDate.textContent = `${day} ${month} ${year}`;

    let bookStatusCtn = document.createElement('div');
    bookStatusCtn.classList.add('status__group');

    let bookStatus = document.createElement('p');
    bookStatus.classList.add('status__clr');
    bookStatus.textContent = `${book.status}`;

    let changeBookStatus = document.createElement('button');
    changeBookStatus.textContent = `Status`;
    changeBookStatus.type = 'button';
    changeBookStatus.classList.add('btn');
    changeBookStatus.onclick = function () {
      changeReadStatus(index);
    }

    // || Start rating
    let starsContainer = document.createElement('div');
    let starsOuter = document.createElement('div');
    let starsInner = document.createElement('div');
    let numberRating = document.createElement('div');
    starsContainer.classList.add('stars-container');
    starsOuter.classList.add('stars-outer');
    starsInner.classList.add('stars-inner');
    numberRating.classList.add('number-rating');
    numberRating.textContent = book.rating;

    let removeBookBtn = document.createElement('button');
    removeBookBtn.textContent = `Delete`;
    removeBookBtn.type = 'button';
    removeBookBtn.classList.add('btn');
    removeBookBtn.classList.add('btn-delete');
    removeBookBtn.classList.add('delete');
    removeBookBtn.onclick = function showDeleteModal() {
      deleteBookModal.classList.remove('hide');
      deleteBookModal.classList.add('show');
      deleteBookModal.classList.add('fade-in');
      deleteButton.setAttribute('data-index', index);
      bookTitle.textContent = `${book.title}`;
    }

    //appending
    authorContainer.append(author, bookDate)

    starsContainer.append(starsOuter, numberRating)
    starsOuter.appendChild(starsInner);

    bookCover.append(title, authorContainer, bookStatusCtn, starsContainer, removeBookBtn);
    bookStatusCtn.append(bookStatus, changeBookStatus);

    bookShelf.appendChild(bookCover);
    
   

    // calculate star rating percentage for this book
  const starPercentage = (book.rating / starsTotal) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  if(starsInner) {
    starsInner.style.width = starPercentageRounded;
  }

  
  })
}


// delete book
function deleteBook(index) {

  myLibrary.splice(index, 1);
  displayBooks();

}

/* Getting the date of added book */;
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();