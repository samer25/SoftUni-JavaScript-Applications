let userData = null

window.addEventListener('DOMContentLoaded', ()=>{
    userData = JSON.parse(sessionStorage.getItem('userData'))

    if (userData != null){
        document.getElementById('guest').style.display = 'none'
        document.querySelector('#addForm .add').disabled = false
        document.querySelector('.email span').textContent = userData.email
    }else{
        document.getElementById('user').style.display = 'none'

    }

})

function catches(){

    const loadBtn = document.querySelector('.load')

    loadBtn.addEventListener('click', loadCatches)

    document.getElementById('addForm').addEventListener('submit', onCreateSubmit)

    const edit = document.querySelector('#catches')
    edit.addEventListener('click', onEdit)

}


async function onCreateSubmit(ev){
    ev.preventDefault()

    const formData = new FormData(ev.target)

    // const angler = formData.get('angler')
    // const weight = formData.get('weight')
    // const species = formData.get('species')
    // const location = formData.get('location')
    // const bait = formData.get('bait')
    // const captureTime = formData.get('captureTime')

    // await createCatches({angler, weight, species, location, bait, captureTime})

    const data = [... formData.entries()].reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {})
    await createCatches(data)
    ev.target.reset()
}


async function loadCatches(){
    const url = 'http://localhost:3030/data/catches/'
    const response = await fetch(url)
    const data = await response.json()

    document.getElementById('catches').replaceChildren(...data.map(createPreview))
}

function createPreview(v){
    const userData = JSON.parse(sessionStorage.getItem('userData'))

    let isOwner = (v._ownerId === userData.id)

    const divElement = document.createElement('div')

    divElement.className = 'catch'

    divElement.innerHTML  = `
            <label>Angler</label>
                <input type="text" class="angler" value="${v.angler}" ${!isOwner ? 'disabled' : ''}>
                <label>Weight</label>
                <input type="text" class="weight" value="${v.weight}" ${!isOwner ? 'disabled' : ''}>
                <label>Species</label>
                <input type="text" class="species" value="${v.species}" ${!isOwner ? 'disabled' : ''}>
                <label>Location</label>
                <input type="text" class="location" value="${v.location}" ${!isOwner ? 'disabled' : ''}>
                <label>Bait</label>
                <input type="text" class="bait" value="${v.bait}" ${!isOwner ? 'disabled' : ''}>
                <label>Capture Time</label>
                <input type="number" class="captureTime" value="${v.captureTime}" ${!isOwner ? 'disabled' : ''}>
                <button class="update" data-id="${v._id}" ${!isOwner ? 'disabled' : ''}>Update</button>
                <button class="delete" data-id="${v._id}" ${!isOwner ? 'disabled' : ''}>Delete</button>
        `


    return divElement
}


async function onEdit(ev) {
    const id = ev.target.dataset.id

    if(ev.target.className === 'update'){
        const angler = ev.target.parentElement.children[2].value
        const weight = ev.target.parentElement.children[4].value
        const species = ev.target.parentElement.children[6].value
        const location = ev.target.parentElement.children[8].value
        const bait = ev.target.parentElement.children[10].value
        const captureTime = ev.target.parentElement.children[12].value


        await editCatch(id,{angler, weight, species, location, bait, captureTime})
    }
    if (ev.target.className === 'delete'){
        await deleteCatch(id)
    }

}

async function createCatches(data) {
    if (!userData){
        window.location = 'login.index'
        return
    }
    try {
        if(Object.values(data).some(x => x === '')){
            throw new Error('All fields are required!')
        }
        const url = 'http://localhost:3030/data/catches '
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        })
        if (response.ok !== true){
            const error = await response.json()
            throw new Error(error.message)
        }
        const result = await response.json()

        return result
    } catch (e){
        alert(e.message)
    }

}


async function editCatch(id, data) {
    try {
        if (Object.values(data).some(x => x === '')) {
            throw new Error('All fields are required!')
        }
        const url = 'http://localhost:3030/data/catches/' + id
        const response = await fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        })
        alert('The Catch Info is Updated')
        return await response.json()
    }catch (e){
        alert(e.message)
    }
}

async function deleteCatch(id) {
    const url = 'http://localhost:3030/data/catches/' + id
    const response = await fetch(url, {
        method: 'delete',
        headers: {
            'X-Authorization': userData.token
        }
    })
    await loadCatches()
    return await response.json()
}
catches()

