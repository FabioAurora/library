'use strict';

const openModal = document.querySelector('[data-open-modal]');
const closeModal = document.querySelector('[data-close-modal]');
const modal = document.querySelector('[data-modal-new]');


function modalClose() {
  modal.classList.add('display-none');
}
//listen for a click
openModal.addEventListener('click', () => {
  modal.classList.remove('display-none');
})

closeModal.addEventListener('click', modalClose)

// listnen to outside click
modal.addEventListener('click', clickOutside);


//closes modal if clicked outside
function clickOutside(e) {
  if(e.target === modal) {
    modalClose();
}
}

//closes modal in ESC key
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && !modal.classList.contains('display-none')) {
    modalClose();
  }
})