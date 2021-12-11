async function attachEvents() {

    const loadBtn = document.getElementById('btnLoad')
    const createBtn = document.getElementById('btnCreate')

    await loadPhoneBooks()
    loadBtn.addEventListener('click', loadPhoneBooks)
    createBtn.addEventListener('click', onCreate)



}

async function onCreate(){
    const person = document.getElementById('person').value
    const phone = document.getElementById('phone').value

    await createPhoneBook({person, phone})
    await loadPhoneBooks()
}


async function createPhoneBook(data){
    const url = 'http://localhost:3030/jsonstore/phonebook'
    const response = await fetch(url, {
        method: 'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    })
    return await response.json()
}


async function loadPhoneBooks() {
    const ul = document.getElementById('phonebook')
    const phonebook = await getPhoneBook()

    ul.replaceChildren()
    phonebook.map(m => {
        const liElement = document.createElement('li')
        liElement.innerHTML = `
           ${m[1].person}: ${m[1].phone} <button class="delete" data-id="${m[0]}">Delete</button>
        `
        ul.appendChild(liElement)
    })

    const deleteBtn = ul.querySelectorAll('.delete')
    deleteBtn.forEach(btn => {
        btn.addEventListener('click', deleteInfo)
    })
}

async function deleteInfo(ev){
    const idPhone = ev.target.dataset.id
    await deletePhone(idPhone)
    ev.target.parentElement.remove()
}

async function getPhoneBook() {
    const url = 'http://localhost:3030/jsonstore/phonebook'
    const response = await fetch(url)
    const data = await response.json()

    return Object.entries(data)

}

async function deletePhone(id){
    const url = 'http://localhost:3030/jsonstore/phonebook/'+ id
    const response = await fetch(url,{
        method: 'delete',

    })

    const result = await response.json()
    return result
}



attachEvents();