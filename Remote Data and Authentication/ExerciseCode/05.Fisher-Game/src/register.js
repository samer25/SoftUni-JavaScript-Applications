function register(){
    const form = document.querySelector('main form')
    form.addEventListener('submit', onRegister)


}

async function onRegister(ev){
    ev.preventDefault()
    const url = 'http://localhost:3030/users/register'

    const formData = new FormData(ev.target)

    const email = formData.get('email').trim()
    const password = formData.get('password').trim()
    const rePass = formData.get('rePass').trim()



    try {
        if (password !== rePass){
            throw new Error('Password does not match!')
        }
        const re = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        if (re.status !== 200){
            const error = await re.json()
            throw new Error(`There was an error! ${error.message}`)
        }
        const data = await re.json()

        const token = data.accessToken
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('userId', data._ownerId)
        window.location = 'login.html'

    }catch (error){
        alert(error.message)
    }

}
register()