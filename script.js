const myLib = [];

const libraryGrid = document.querySelector(".book-container");

const addFormContainer = document.querySelector(".add-container");
addFormContainer.addEventListener("click", toggleAddForm);

const addForm = document.querySelector(".add-form");
addForm.addEventListener("click", e => e.stopPropagation());

const showAddFormBtn = document.querySelector("#show-add");
showAddFormBtn.addEventListener("click", toggleAddForm);

const addBookBtn = document.querySelector("#add");
addBookBtn.addEventListener("click", addBookToLib);

//constructor for the book object
function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLib(e) {
    const title = document.querySelector("#in-title").value;
    const author = document.querySelector("#in-author").value;
    const pages = parseInt(document.querySelector("#in-pages").value);

    myLib.push(new Book(title, author, pages, false, randomRange(1000000)));

    toggleAddForm();
    renderLibrary();
    e.preventDefault();
}

function renderLibrary() {
    for (const book of myLib) {
        if(document.querySelector(`[data-book-id="${book.id}"]`) === null) {
            const n_book = document.createElement("div");
            n_book.classList.add("book")
            n_book.dataset.bookId = book.id;
            
            const n_bookTitle = document.createElement("h2");
            n_bookTitle.classList.add("book-title");
            n_bookTitle.textContent = `"${book.title}"`;
            n_book.appendChild(n_bookTitle);

            const n_bookAuthor = document.createElement("h3");
            n_bookAuthor.classList.add("author");
            n_bookAuthor.textContent = book.author;
            n_book.appendChild(n_bookAuthor);

            const n_bookPages = document.createElement("h3")
            n_bookPages.classList.add("pages");
            n_bookPages.textContent = book.pages + " pages";
            n_book.appendChild(n_bookPages);

            const readBtn = document.createElement("button");
            readBtn.classList.add("btn");
            readBtn.id = "read";
            readBtn.dataset.bookId = book.id;
            readBtn.textContent = "Read";
            readBtn.addEventListener("click", setRead);
            n_book.appendChild(readBtn);

            const remBtn = document.createElement("button");
            remBtn.classList.add("btn");
            remBtn.id = "rem";
            remBtn.dataset.bookId = book.id;
            remBtn.textContent = "Remove";
            remBtn.addEventListener("click", removeBook);
            n_book.appendChild(remBtn);

            libraryGrid.appendChild(n_book);
        }
    }
}

function setRead(e) {
    toBeSetReadId = e.target.dataset.bookId;
    toBeSetReadIndex  = myLib.findIndex(e => e.id === parseInt(toBeSetReadId));
    
    //setting book status to read in array 
    if(myLib[toBeSetReadIndex].read)
        myLib[toBeSetReadIndex].read = false
    else
        myLib[toBeSetReadIndex].read = true;

    //setting book status to read on the actual page
    e.target.classList.toggle("has-read");
    
    if(e.target.classList.value.includes("has-read"))
        e.target.textContent = "Not read";
    else
        e.target.textContent = "Read";
}

function removeBook(e) {
    let toBeRemovedId = e.target.dataset.bookId;
    let toBeRemovedIndex = myLib.findIndex(e => e.id === parseInt(toBeRemovedId));
    const bookToRemove = document.querySelector(`[data-book-id="${toBeRemovedId}"]`);

    //remove from array
    myLib.splice(toBeRemovedIndex, 1);

    //remove from DOM
    libraryGrid.removeChild(bookToRemove);
}


function toggleAddForm(e) {
    addFormContainer.classList.toggle("hidden");
}

function randomRange(r) {
    return Math.floor(Math.random() * r);
}