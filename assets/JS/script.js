'use strict';

const submitForm = document.querySelector('[name="submitBook"]');

let myLibrary = [];

// Constructor function
function Book (title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}




function addBookToLibrary() {
  const newBook = Object.create(Book.prototype);
  newBook.title = document.querySelector('[name="title"]').value;
  newBook.author = document.querySelector('[name="author"]').value;
  newBook.pages = document.querySelector('[name="pages"]').value;;
  /* newBook.status = document.querySelector('[name="status"]').value;; */
  
  return myLibrary.push(newBook)
}

submitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addBookToLibrary();
})

console.log(myLibrary)