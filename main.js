//Functional programming 
const title = document.querySelector('.title');
const nb = document.querySelector('.nb');
const link = document.querySelector('.link');
const addBtn = document.querySelector('.addBtn');
const table = document.querySelector('.table');

//Add New Book
addBtn.addEventListener('click', () => {
    //get inputs value
    let title_value = title.value;
    let nb_value = nb.value;
    let link_value = link.value;    
    //create new book object
    let book = new Book(title_value, nb_value, link_value);
    newBook(book);
            
    title.value = "";
    nb.value = "";
    link.value = "";
});

function newBook(book) {    
    addBook(book);
    let books = getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
}

    class Book {
        constructor(title, nb, link) {
            this.title = title;
            this.nb = nb;
            this.link = link;
        }
    }

    function addBook(book) {
        let tr = document.createElement("tr");        
     
        tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.nb}</td>
        <td>${book.link}</td>    
        <td>
            <button class="btn-sm btn-danger delete">X</button>
        </td>
        `
        table.append(tr);
    }
    
    //Delete a Book        
    table.addEventListener('click', (e) => {
        if(e.target.classList.contains("delete")) {
            e.target.parentElement.parentElement.remove();
            let books = getBooks();
            let title = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
            books.forEach((book, index) => {
                if(book.title === title) {
                    books.splice(index, 1);
                }
            });

            localStorage.setItem("books", JSON.stringify(books));
        }        
    });

    function showBooks() {
        let books = getBooks();

        books.forEach(book => addBook(book));
    }

    function getBooks() {      
        let books;   
        if(localStorage.getItem("books") === null) {
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }                
        
        return books;
    }

    document.addEventListener('DOMContentLoaded', showBooks());
