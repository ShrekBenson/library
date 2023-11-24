const library = [];

const dialog = {
  inputTitle: document.getElementById('bookTitle'),
  inputAuthor: document.getElementById('bookAuthor'),
  inputPages: document.getElementById('bookPages'),
  buttonCancel: document.getElementById('cancel'),
  buttonAdd: document.getElementById('add')
}
const menu = {
  addBook: document.querySelector('.add_book'),
  dialog: document.getElementById('newBook'),
  books: document.querySelector('#booksQuantity'),
  books_readed: document.querySelector('#booksReaded')
}
function book(index, title, author, pages, readed) {  
  this.index = index
  this.title = title
  this.author = author
  this.pages = pages
  this.readed = readed
}

function createAdvertise(){
  if (document.querySelector('.library__books').childElementCount === 0) {
    const advertise = document.createElement('div');
    advertise.classList.add('advertise');
    advertise.innerHTML = `
      <img src="src/leer.png" alt="Read">
      <h2>Don't you read anything? Add a book</h2>
    `;
    document.querySelector('.library').appendChild(advertise);
  } else{
    advertise.remove();
  }
}

function addBook(){
  const library_books = document.querySelector('.library__books');
  let bookTitle = dialog.inputTitle.value;
  let bookAuthor = dialog.inputAuthor.value;
  let bookPages = dialog.inputPages.value;
  
  library.push(new book(library.length, bookTitle, bookAuthor, bookPages, false));
  menu.books.value = library.length;
  let {index, title, author, pages, readed} = library[library.length - 1];

  const newCard = document.createElement('li');
  newCard.setAttribute('data-index', index);
  newCard.classList.add('library__book');
  newCard.innerHTML = ` 
    <h2 title="" class="title">${title}</h2>
    <label>Author</label>
    <input type="text" class="author" value="${author}" readonly>
    <label>Total pages</label>
    <input type="text" class="pages" value="${pages}" readonly>
    <label>
      Readed
      <input type="checkbox" class="readed">
    </label>
    <button type="button" class="delete">Delete</button>
  `;
  library_books.appendChild(newCard);
  newCard.querySelector('.delete').addEventListener('click', (e) => {
    deleteBook(library, newCard);
    const booksReaded = library.filter((libraryBook) => libraryBook.readed === true)
    menu.books_readed.value = booksReaded.length;
    menu.books.value = library.length;
    for(let i = 0; i < library.length; i++){
      library[i].index = i;      
    }
    const cards = library_books.querySelectorAll('li');
    for(let j = 0; j < cards.length; j++){
      cards[j].dataset.index = library[j].index;
    }
  })
  const checkReaded = newCard.querySelector('.readed');  
  checkReaded.addEventListener('input', (e) => {  
    if (checkReaded.checked) {
      library[Number(e.target.parentNode.parentNode.dataset.index)].readed = true;
      const booksReaded = library.filter((libraryBook) => libraryBook.readed === true)
      menu.books_readed.value = booksReaded.length;
    } else{      
      library[Number(e.target.parentNode.parentNode.dataset.index)].readed = false;
      const booksReaded = library.filter((libraryBook) => libraryBook.readed === true)
      menu.books_readed.value = booksReaded.length;
    }
  })

}
function deleteBook(array, card){
  array.splice(card.dataset.index, 1)
  card.remove();
}

menu.addBook.addEventListener('click', () => {
  menu.dialog.showModal();
})
dialog.buttonCancel.addEventListener('click', (e) => {
  e.preventDefault();
  menu.dialog.close();
})
dialog.buttonAdd.addEventListener('click', (e) => {
  e.preventDefault();
  const properties = Object.values(dialog).filter(propertie => propertie.tagName === "INPUT");
  if (properties.every(input => input.value !== "")){
    addBook();    
    dialog.inputTitle.value = "";
    dialog.inputAuthor.value = "";
    dialog.inputPages.value = "";
    menu.dialog.close();
  } else{
    alert("Please, don't let any field empty");
  }
})
