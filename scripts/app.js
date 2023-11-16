const library = [];

const dialog = {
  inputTitle: document.getElementById('bookTitle'),
  inputAuthor: document.getElementById('bookAuthor'),
  inputPages: document.getElementById('bookPages')

}
const menu = {
  addBook: document.querySelector('.add_book'),
  dialog: document.getElementById('newBook'),
  books: document.querySelector('#booksQuantity'),
  books_readed: document.querySelector('#booksReaded')
}
const card = {
  title: document.getElementById('title'),
  author: document.getElementById('author'),
  pages: document.getElementById('pages'),
  readed: document.getElementById('readed'),
  delete: document.getElementById('delete'),  
}

function book(title, author, pages, readed) {
  this.title = title
  this.author = author
  this.pages = pages
  this.readed = readed
}
function addBook(){
  let bookTitle = dialog.inputTitle.value;
  let bookAuthor = dialog.inputAuthor.value;
  let bookPages = dialog.inputPages.value;
  
  library.push(new book(bookTitle, bookAuthor, bookPages, false))
  
}

menu.addBook.addEventListener('click', () => {
  menu.dialog.showModal();
})
menu.dialog.addEventListener('close', () => {
  addBook();  
})