import {html, render} from './node_modules/lit-html/lit-html.js'
import {towns as townNames} from './towns.js'


const root = document.getElementById('towns')
const input = document.getElementById('searchText')
const output = document.getElementById('result')

document.querySelector('button').addEventListener('click', onSearch)

const towns = townNames.map(t => ({name: t, match: false}));

const listTemplate = (towns) => html`
    <ul>
        ${towns.map(t => html`<li class=${t.match ? 'active': ''}>${t.name}</li>`)}
    </ul>
`

function update() {
    render(listTemplate(towns), root)

}

update()


function onSearch() {
    const match = input.value.trim().toLowerCase();
    let matches = 0;
    for (let town of towns){

        if (match && town.name.toLowerCase().includes(match)){
            town.match = true;
            matches += 1
        }else{
            town.match = false
        }
    }

    output.textContent = `${matches} matches found`
    update()
}