import {createBook, html, updateBook} from './utility.js'


const updateTemplate =(book, onSuccess) => html`

    <form @submit=${ev => onSubmit(ev, onSuccess) } id="edit-form">
        <input type="hidden" name="id" .value=${book._id}>
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." .value=${book.title}>
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." .value=${book.author}>
        <input type="submit" value="Save">
    </form>
`

export function showUpdate(ctx){
    if (ctx.book === undefined){
        return null
    } else {
        return updateTemplate(ctx.book, ctx.update)

    }
}

async function onSubmit(event, onSuccess){
    event.preventDefault()
    const formData = new FormData(event.target)

    const id = formData.get('id')
    const title = formData.get('title').trim()
    const author = formData.get('author').trim()

    if (title !== '' && author !== ''){
        await updateBook(id, {title, author})
    }else {
        alert('All fields are required!')
        throw new Error('All fields are required!')
    }

    event.target.reset()
    onSuccess()
}