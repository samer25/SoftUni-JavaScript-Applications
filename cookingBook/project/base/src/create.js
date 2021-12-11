window.addEventListener('load', async () =>{
    const form = document.querySelector('form')
    form.addEventListener('submit', onCreate)
})

async function onCreate(event){
    const url = 'http://localhost:3030/data/recipes'
    event.preventDefault()

    const form = event.target
    const formDate = new FormData(form)

    const name = formDate.get('name').trim()
    const img = formDate.get('img').trim()
    const ingredients = formDate.get('ingredients').trim().split('\n')
    const steps = formDate.get('steps').trim().split('\n')

    const recipe = {
        name,
        img,
        ingredients,
        steps,
    }

    const token = sessionStorage.getItem('token')

    if (token === null){
        window.location = 'login.html'
        return;
    }



    try{
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(recipe)
        })
        if (response.ok === false){
            const error = await response.json()
            throw new Error(error.message)
        }

        await response.json()
        window.location = 'index.html'

    }catch (error){
        alert(error)
    }
}