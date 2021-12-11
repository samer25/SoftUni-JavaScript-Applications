import {html, render} from './node_modules/lit-html/lit-html.js'
import {cats as catData} from './catSeeder.js'

const catCard = (cat) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn">Show status code</button>
            <div class="status" style="display: none" id="${cat.id}">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
`

const root = document.getElementById('allCats')
render(html`
    <ul>${catData.map(catCard)}</ul>`, root)

root.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.tagName === 'BUTTON') {
        const element = event.target.parentNode.querySelector('.status')
        if (element.style.display === 'none') {
            element.style.display = 'block'
            event.target.textContent = 'Hide status code'
        } else {
            element.style.display = 'none'
            event.target.textContent = 'Show status code'

        }
    }
})