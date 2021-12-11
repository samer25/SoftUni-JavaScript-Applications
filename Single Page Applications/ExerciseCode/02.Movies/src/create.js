import {showView} from "./dom.js";

const form = document.querySelector('#add-movie form')

const section = document.getElementById('add-movie')

section.remove()

form.addEventListener('submit', onCreate)

export function showCreate(){
    showView(section)
}

async function onCreate(event){
    event.preventDefault()

    const userData = JSON.parse(sessionStorage.getItem('userData'))
    const formData = new FormData(event.target)

    const title = formData.get('title')
    const description = formData.get('description')
    const img = formData.get('imageUrl')

    try{
        if (title === '' || description === '' || img === ''){
            throw new Error('All fields are required!')
        }
        const url = 'http://localhost:3030/data/movies'
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify({title, description, img})
        })

        if (response.ok !== true){
            const error = await response.json()
            throw new Error(error.message)
        }

        window.location.reload()


    }catch (e) {
        alert(e.message)
    }


}