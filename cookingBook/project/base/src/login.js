function login(){
    const form = document.querySelector('form')

    form.addEventListener('submit', onLogin)
}

async function onLogin(ev){
    ev.preventDefault()

    const url = 'http://localhost:3030/users/login'

    const dataForm = new FormData(ev.target)

    const email = dataForm.get('email').trim()
    const password = dataForm.get('password').trim()

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                // 'X-Authentication': '',
            },
            body: JSON.stringify({email, password})
        })

        if (response.status !== 200){
            const error = await response.json()
            throw new Error(`There was an error! ${error.message}`)
        }

        const result = await response.json()
        const token = result.accessToken

        sessionStorage.setItem('token', token)
        window.location = 'index.html'

    }catch (error){
        alert(error.message)
    }


}

login()