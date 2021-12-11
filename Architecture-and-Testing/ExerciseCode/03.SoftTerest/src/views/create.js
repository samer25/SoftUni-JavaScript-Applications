import {e} from '../dom.js'
import {createIdea} from "../api/data.js";

const section = document.getElementById('createPage');
section.remove()
const form = section.querySelector('form')
form.addEventListener('submit', onSubmit)

let ctx = null

export async function showCreatePage(ctxTarget){
    ctx = ctxTarget
    ctx.showSection(section)
}

async function onSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target)

    const title = formData.get('title')
    const description = formData.get('description')
    const img = formData.get('imageURL')

    try {
        if (title.length < 6){
            throw new Error('The title field must be at least 6 characters!')
        }

        if (description.length < 10){
            throw new Error('The description field must be at least 10 characters!')
        }
        if (img.length < 5){
            throw new Error('The image field must be at least 5 characters!')
        }

        await createIdea({title, description, img})
        form.reset()
        ctx.goTo('catalog')

    }catch (e) {
        alert(e.message)
    }

}