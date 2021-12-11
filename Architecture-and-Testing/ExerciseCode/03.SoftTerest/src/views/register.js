import {e} from '../dom.js'
import {register} from '../api/api.js'

const section = document.getElementById('registerPage');
section.remove()

let ctx = null;

const form = section.querySelector('form')

form.addEventListener('submit', onSubmit);

export async function showRegisterPage(ctxTarget) {
    ctx = ctxTarget
    ctx.showSection(section)
}

async function onSubmit(ev) {
    ev.preventDefault()
    const formData = new FormData(ev.target)

    const email = formData.get('email').trim()
    const password = formData.get('password').trim()
    const rePass = formData.get('repeatPassword').trim()

    try {
        if (email === '' || password === '') {
            throw new Error('All fields are required!')
        }

        if (password.length < 6) {
            throw new Error('Password must be 6 or more characters')
        }

        if (password !== rePass) {
            throw new Error('Passwords are not the same!')
        }

        await register(email, password, rePass)
        form.reset()
        ctx.goTo('home')
        ctx.updateNav()
    } catch (e) {
        alert(e.message)
    }

}

