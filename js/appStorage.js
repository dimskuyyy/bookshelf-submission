const KEY = 'BOOKS';
let list = [];


function storeBook(){
    if (typeof Storage === undefined) {
        alert("Your Browser Don't Support Web Storage");
    }else{
        localStorage.setItem(KEY,JSON.stringify(list));
    }
}

function getBook() {  
    const books = localStorage.getItem(KEY);
    if (books) {
        list = JSON.parse(books);
        loadData();
    }
}

function saveBook(){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;
    const isComplete = document.querySelector('#isComplete').checked;
        
    if (!title || !author || isNaN(year)) {
        alert("please fill in the inputs below! ");
        return;
    }

    const id = +new Date();

    const book = {
        id,
        title,
        author,
        year,
        isComplete
    }

    list.push(book);
    loadData();
}

function removeBook(id){
    id = parseInt(id);
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1) {
        list.splice(index,1);
        loadData();
    }
}

function changeStatus(id, isComplete) {
    id = parseInt(id);
    const index = list.findIndex((item) => item.id === id);
    if(index !== -1){
        list[index].isComplete = isComplete;
        loadData();
    }
}