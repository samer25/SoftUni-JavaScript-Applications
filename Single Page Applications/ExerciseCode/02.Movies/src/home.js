import {showView} from "./dom.js";
import {showCreate} from "./create.js";
import {e} from './dom.js'
import {showDetails} from "./details.js";

let moviesCache = null
let lastLoaded = null
const maxAge = 60000

const section = document.getElementById('home-page')
const catalog = section.querySelector('.card-deck.d-flex.justify-content-center')

section.querySelector('#createLink').addEventListener('click', (event) => {
    event.preventDefault()
    showCreate()
})

catalog.addEventListener('click', (event)=>{
    let target = event.target
    if (target.tagName === 'BUTTON'){
        target = target.parentElement
    }
    if (target.tagName === 'A'){
        const id = target.dataset.id
        showDetails(id)
    }
})

section.remove()

export function showHome() {
    showView(section)
    getMovies()
}

async function getMovies() {
    const url = 'http://localhost:3030/data/movies'

    catalog.replaceChildren('p', {}, 'Loading...')

    const now = Date.now()

    if (moviesCache === null || (now - lastLoaded) > maxAge){
        const res = await fetch(url)
        const data = await res.json()
        moviesCache = data
    }



    catalog.replaceChildren(...moviesCache.map(createMovieCart))
}

function createMovieCart(movie) {
    const element = e('div', {className: 'card mb-4'})

    element.innerHTML = `
        <img class="card-img-top" src="${movie.img}"
             alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
            <a data-id="${movie._id}" href="#">
                <button type="button" class="btn btn-info">Details</button>
            </a>
        </div>
    `

    return element

}
