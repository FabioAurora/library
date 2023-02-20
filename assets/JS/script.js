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
  titleInput.focus();
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
// DOM Elements
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const statusInput = document.querySelector('#status');
const ratingInput = document.querySelector('#rating')
const form = document.querySelector('form');

// adding form data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  hideModal();
  displayBooks();
  reset.formReset();
})

/* ****************************************************************** */

/* LIBRARY */
// will store the book objects
let myLibrary = [];

if (localStorage.getItem('myLibrary')) {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
} else {
  myLibrary = [];
}

// object constructor for the books
function Book(title, author, status, rating) {
  this.title = title;
  this.author = author;
  this.status = status;
  this.rating = rating
}

// reseting the form inputs after submit
Book.prototype.formReset = function (title) {
  titleInput.value = '';
  authorInput.value = '';
  statusInput.value = '';
  ratingInput.value = '';
}

let reset = Object.create(Book.prototype);

let livro = new Book()

function addBookToLibrary() {
  let title = titleInput.value;
  let author = authorInput.value;
  let status = statusInput.value;
  let rating = ratingInput.value;
  let newBook = new Book(title, author, status, rating);

  myLibrary.push(newBook);
  updateLocalStorage();
  displayBooks();
}


/* ******************************************************************* */

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

/* ******************************************************************* */

// displaying the books
// total number of stars to be used in calculation
const starsTotal = 5;

const bookTitle = document.querySelector('.book-title');

function displayBooks() {
  checkLocalStorage();
  let bookShelf = document.querySelector('.bookshelf-ctn ');
  bookShelf.textContent = '';


  myLibrary.forEach((book, index) => {
    let bookCover = document.createElement('div');
    bookCover.classList.add('book')
    bookCover.setAttribute('data-index', index); // conecting the DOM elements with the actual book with data-attributes

    // Book form  elements
    // title
    let title = document.createElement('h2');
    title.textContent = `${book.title}`;

    // author 
    let authorContainer = document.createElement('div');
    let author = document.createElement('p');
    authorContainer.classList.add('author-container');
    author.classList.add('author');
    author.textContent = `by ${book.author}`;

    // date  
    let bookDate = document.createElement('p');
    bookDate.classList.add('book-date');
    bookDate.textContent = `${day} ${month} ${year}`;

    // book reading status
    let bookStatusCtn = document.createElement('div');
    bookStatusCtn.classList.add('status__group');
    let bookStatus = document.createElement('p');
    bookStatus.classList.add('status__clr');
    bookStatus.textContent = `${book.status}`;

    // button to change reading status
    let changeBookStatus = document.createElement('button');
    changeBookStatus.textContent = `Status`;
    changeBookStatus.type = 'button';
    changeBookStatus.classList.add('btn');
    changeBookStatus.onclick = function () {
      myLibrary[index].status = myLibrary[index].status === 'reading' ? 'finished' : 'reading';
      updateLocalStorage()
      displayBooks()
    }

    // || Star rating
    let starsContainer = document.createElement('div');
    let starsOuter = document.createElement('div');
    let starsInner = document.createElement('div');
    let numberRating = document.createElement('div');
    starsContainer.classList.add('stars-container');
    starsOuter.classList.add('stars-outer');
    starsInner.classList.add('stars-inner');
    numberRating.classList.add('number-rating');
    numberRating.textContent = book.rating;

    // delete button
    let deleteBookBtn = document.createElement('button');
    deleteBookBtn.textContent = `Delete`;
    deleteBookBtn.type = 'button';
    deleteBookBtn.classList.add('btn');
    deleteBookBtn.classList.add('btn-delete');
    deleteBookBtn.classList.add('delete');
    deleteBookBtn.onclick = function showDeleteModal() {
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

    bookCover.append(title, authorContainer, bookStatusCtn, starsContainer, deleteBookBtn);
    bookStatusCtn.append(bookStatus, changeBookStatus);

    bookShelf.appendChild(bookCover);



    // calculate star rating percentage for this book
    const starPercentage = (book.rating / starsTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    if (starsInner) {
      starsInner.style.width = starPercentageRounded;
    }

  })// myLibrary.forEach()
}// displayBooks()


// storing data at localStorage
function updateLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function checkLocalStorage() {
  if(localStorage.getItem('myLibrary')) {
    return myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  }
}

// delete book
function deleteBook(index) {
  myLibrary.splice(index, 1);
  updateLocalStorage();
  displayBooks();
}

/* Getting the date of added book */;
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();


 /* get date for footer */
 const footerDate = document.querySelector('#date');
 footerDate.textContent = date.getFullYear();

 displayBooks()