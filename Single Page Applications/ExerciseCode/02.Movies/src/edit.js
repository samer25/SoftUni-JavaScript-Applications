import {showView} from "./dom.js";
import {showDetails} from "./details.js";

const section = document.getElementById('edit-movie')

const form = document.querySelector('#edit-movie form')
section.remove()




const userData = JSON.parse(sessionStorage.getItem('userData'))


export async function showEdit(movieId){
    showView(section)
    form.addEventListener('submit', onEdit)

    const title = form.querySelector('#edit-movie [name=title]')
    const description = form.querySelector('#edit-movie [name=description]')
    const img = form.querySelector('#edit-movie [name=imageUrl]')
    const movie = await getMovieEdit(movieId)

    title.value = movie.title
    description.value = movie.description
    img.value = movie.img

    console.log(userData.token)
    async function onEdit(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target)

        const title = formData.get('title')
        const description = formData.get('description')
        const img = formData.get('imageUrl')

        await editMovie(movieId, {title, description, img})

    }

}





async function editMovie(id, data) {
    try{
        const url = 'http://localhost:3030/data/movies/' + id
        const response = await fetch(url, {
            method: 'put',
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
        showDetails(id)
        return await response.json()
    }catch (e) {
        console.log(e.message)
    }

}

export async function getMovieEdit(id){
    const url = 'http://localhost:3030/data/movies/' + id
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return await response.json()
}