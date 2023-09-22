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
    const confirm = document.querySelector(".confirmation button.confirm");
    const unconfirm = document.querySelector(".confirmation button.unconfirm");
    const modal = document.querySelector('.modal');
    const text = document.querySelector('.modal-content .information');
    const icon = document.querySelector('.icon svg');
    deleteBtn.forEach((button)=>{
        button.addEventListener("click", (event)=>{
            confirm.setAttribute('data-id',event.target.dataset.id);
            text.innerHTML = `Apakah anda yakin ingin menghapus buku <span>${event.target.dataset.title} (${event.target.dataset.year})</span> Oleh ${event.target.dataset.author} dari Rak Buku 📚?`;
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />';
            icon.classList.remove('success');

            modal.classList.add('active');
        })
    });

    confirm.addEventListener('click',(event)=>{
        const id = event.target.dataset.id;
        text.innerHTML = 'Buku Berhasil di Hapus 🗑';

        icon.classList.add('success');
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>';
        setTimeout(()=> {
            modal.classList.remove('active');
            removeBook(id);
        }, 800);
        
    })

    unconfirm.addEventListener('click', (event)=>{
        modal.classList.remove('active');
    })

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
    statusBtn.textContent = book.isComplete ? "Belum Baca 📚" : "Sudah Baca 📖";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add('delete');
    deleteBtn.setAttribute("data-id",book.id);
    deleteBtn.setAttribute("data-title",book.title);
    deleteBtn.setAttribute("data-author",book.author);
    deleteBtn.setAttribute("data-year",book.year);
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