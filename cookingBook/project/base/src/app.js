window.addEventListener('DOMContentLoaded', start)

async function start() {
    const main = document.querySelector('main')
    const recipes = await getMenu();
    main.innerHTML = ''
    recipes.map(createPreview).forEach(e => main.appendChild(e))

}

function createPreview(recipe) {

    const token = sessionStorage.getItem('token')

    if (token === null){
        document.getElementById('guest').style.display = 'inline-block'
    }else{
        document.getElementById('user').style.display = 'inline-block'
    }

    const element = document.createElement('article')
    element.className = 'preview'

    element.innerHTML = `
         <div class="title">
                <h2>${recipe.name}</h2>
            </div>
            <div class="small">
                <img src="${recipe.img}">
            </div>
    `
    element.addEventListener('click', () => {
        element.querySelector('h2').textContent = 'Loading'
        return togglePreview(recipe._id, element)
    })
    return element

}

async function togglePreview(id, preview) {
    const recipe = await getDetail(id)

    const element = document.createElement('article')
    element.innerHTML = `
        <h2>${recipe.name}</h2>
            <div class="band">
                <div class="thumb">
                    <img src="${recipe.img}">
                </div>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                        ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
                        
                    </ul>
                </div>
            </div>
            <div class="description">
                <h3>Preparation:</h3>
                ${recipe.steps.map(s => `<p>${s}</p>`).join('')}
                
            </div>
    `
    preview.replaceWith(element)
}

async function getMenu() {
    const url = 'http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg'

    const token = sessionStorage.getItem('token')
    const response = await fetch(url, {
        headers: {
            'X-Authorization': token
        }
    })
    const data = await response.json()
    return Object.values(data)
}


async function getDetail(id) {
    const url = `http://localhost:3030/data/recipes/${id}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function logout(){
    sessionStorage.clear()
    window.location = 'login.html'
    
}
