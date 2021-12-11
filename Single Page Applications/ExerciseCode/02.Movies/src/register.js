import {showView} from "./dom.js";
import {updateNav} from "./app.js";
import {showHome} from "./home.js";

const section = document.getElementById('form-sign-up')
section.remove()

const form = section.querySelector('form')

form.addEventListener('submit', onRegistration)

export function showRegister(){
    showView(section)
}

async function onRegistration(event){
    event.preventDefault()
    const formData = new FormData(form)

    const email = formData.get('email').trim()
    const password = formData.get('password').trim()
    const repeatPassword = formData.get('repeatPassword').trim()


    try{
        if (email === '' || password === '' || repeatPassword === ''){
            throw new Error('All field are required')
        }

        if (password !== repeatPassword){
            throw new Error('Passwords are not the same')
        }

        if(password.length < 6){
            throw new Error('Password must be at lest 6 character')
        }

        const url = 'http://localhost:3030/users/register'
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, repeatPassword})
        })

        if (res.ok === false){
            const error = await res.json()
            throw new Error(error.message)
        }

        const data = await res.json()
        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            id: data._id,
            token: data.accessToken
        }))
        form.reset()
        updateNav()
        showHome()
    }catch (e) {
        alert(e.message)
    }
}