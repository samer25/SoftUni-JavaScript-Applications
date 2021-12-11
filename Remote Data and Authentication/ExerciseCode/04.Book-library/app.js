const formCreate = document.getElementById('create')
const editSubmit = document.getElementById('edit')
async function bookLibrary() {
    const loadBtn = document.getElementById('loadBooks')

    const cancelBtn = document.getElementById('cancel')

    await getBooks()

    loadBtn.addEventListener('click', getBooks)
    formCreate.addEventListener('submit', onCreate)
    editSubmit.addEventListener('submit', onEdit)
    cancelBtn.addEventListener('click', ()=>{
        editSubmit.style.display = 'none'
        formCreate.style.display = 'block'
    })

}

async function functionality(ev) {
    const id = ev.target.dataset.id
    if (ev.target.className === 'edit') {

        const titleInputs = document.querySelector('#edit [name=title]')
        const authorInputs = document.querySelector('#edit [name=author]')
        const idInput = document.querySelector('#edit [name=id]')

        const title = ev.target.parentElement.previousElementSibling.previousElementSibling.textContent
        const author = ev.target.parentElement.previousElementSibling.textContent

        editSubmit.style.display = 'block'
        formCreate.style.display = 'none'

        titleInputs.value = title
        authorInputs.value = author
        idInput.value = id


    }
    if (ev.target.className === 'delete') {
        await deleteBook(id)
        ev.target.parentElement.parentElement.remove()
    }

}

async function onEdit(ev) {
    ev.preventDefault()
    const formData = new FormData(ev.target)
    const title = formData.get('title')
    const author = formData.get('author')
    const id = formData.get('id')

    await editBook(id, {title, author})
    await getBooks()
}

async function onCreate(ev) {
    const formData = new FormData(ev.target)

    const title = formData.get('title')
    const author = formData.get('author')

    await createBook({title, author})
}


async function getBooks() {
    let tbody = document.querySelector('tbody');

    const url = 'http://localhost:3030/jsonstore/collections/books/'

    const response = await fetch(url)
    const data = await response.json()

    tbody.replaceChildren()
    Object.entries(data).forEach(b => {
        let tr = document.createElement('tr')

        tr.innerHTML = `
            <td>${b[1].title}</td>
            <td>${b[1].author}</td>
            <td><button class="edit" data-id="${b[0]}">Edit</button></td>
            <td><button class="delete" data-id="${b[0]}">Delete</button></td>

        `
        tbody.appendChild(tr)

    })

    const Btns = tbody.querySelectorAll('button')

    Btns.forEach(btn => {
        btn.addEventListener('click', functionality)
    })
    return data

}


async function createBook(data) {

    const url = 'http://localhost:3030/jsonstore/collections/books'
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()

    return result
}


async function editBook(id, data) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id
    const response = await fetch(url, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

async function deleteBook(id) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id
    const response = await fetch(url, {
        method: 'delete'
    })
    return await response.json()
}

bookLibrary()