import {e} from '../dom.js'
import {login} from '../api/api.js'

const section = document.getElementById('loginPage');
section.remove()

const form = section.querySelector('form')

form.addEventListener('submit', onSubmit)

let ctx = null

export async function showLoginPage(ctxTarget){
    ctx = ctxTarget
    ctx.showSection(section)
}

async function onSubmit(ev){
    ev.preventDefault()
    const formData = new FormData(ev.target);

    const email = formData.get('email').trim()
    const password = formData.get('password').trim()

    try{
        if (email === '' || password === ''){
            throw new Error('Enter valid email!')
        }

        await login(email, password)
        form.reset()
        ctx.goTo('home')
        ctx.updateNav()

    }catch (e){
        alert(e.message)
    }



}