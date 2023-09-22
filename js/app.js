function loadData(keyword) {  
    const unread = document.querySelector('.uncomplete .data');
    const read = document.querySelector('.complete .data');

    unread.innerHTML = "";
    read.innerHTML = "";

    if (keyword) {
        for (const book of keyword){
            const template = createTemplate(book);

            if(book.isComplete){
                read.appendChild(template);
            }else{
                unread.appendChild(template);
            }
        }
    }else{
        for (const book of list) {
            const template = createTemplate(book);

            if(book.isComplete){
                read.appendChild(template);
            }else{
                unread.appendChild(template);
            }
        }
    }

    const uncompleteBtn = document.querySelectorAll('.uncomplete button.change');
    uncompleteBtn.forEach((button)=>{
        button.addEventListener("click", (event)=>{
            const id = event.target.dataset.id;
            changeStatus(id, true);
        });
    });

    const completeBtn = document.querySelectorAll('.complete button.change');
    completeBtn.forEach((button)=>{
        button.addEventListener("click",(event)=>{
            const id = event.target.dataset.id;
            changeStatus(id,false);
        });
    });

    const deleteBtn = document.querySelectorAll('button.delete');
    deleteBtn.forEach((button)=>{
        button.addEventListener("click", (event)=>{
            const id = event.target.dataset.id;
            removeBook(id);
        })
    });

    storeBook();
}

function createTemplate(book){
    const wrap = document.createElement('div');
    wrap.classList.add("buku");

    const list = document.createElement('div');
    list.classList.add("list");
    
    const listTitle = document.createElement('h4');
    listTitle.textContent = `${book.title} (${book.year})`;

    const listAuthor = document.createElement('p');
    listAuthor.textContent = `Oleh ${book.author}`;

    const options = document.createElement('div');
    options.classList.add('option');

    const statusBtn = document.createElement('button');
    statusBtn.classList.add('change');
    statusBtn.setAttribute("data-id",book.id);
    statusBtn.textContent = book.isComplete ? "Belum Selesai Dibaca 📚" : "Sudah Baca 📖";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add('delete');
    deleteBtn.setAttribute("data-id",book.id);
    deleteBtn.textContent = "Hapus 🗑";

    list.appendChild(listTitle);
    list.appendChild(listAuthor);
    options.appendChild(statusBtn);
    options.appendChild(deleteBtn);

    wrap.appendChild(list);
    wrap.appendChild(options);

    return wrap;
}

function searchBook(keyword) {  
    const result = list.filter((book)=>{
        const title = book.title.toLowerCase().includes(keyword.toLowerCase());
        const author = book.author.toLowerCase().includes(keyword.toLowerCase());
        return title || author;
    });

    loadData(result);
}

window.addEventListener("load", () => {
    getBook();
    loadData();
  });

const form = document.getElementById('insert');
const search = document.getElementById('search');

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    saveBook();
});

search.addEventListener('input', (event)=>{
    searchBook(search.value);
})