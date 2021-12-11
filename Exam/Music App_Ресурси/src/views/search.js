import {html} from '../lib.js'
import {getAlbumByName} from "../api/data.js";
import {getUserData} from "../util.js";

const searchTemplate = (albums, onClick, userData, msg) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click=${onClick} class="button-list">Search</button>
        </div>

        <h2>Results:</h2>
        <div class="search-result">
            ${albums.length === 0
                    ? html`<p class="no-result">${msg}</p>`
                    : albums.map((album) => html`
                        <div class="card-box">
                            <img src=${album.imgUrl}>
                            <div>
                                <div class="text-center">
                                    <p class="name">Name: ${album.name}</p>
                                    <p class="artist">Artist: ${album.artist}</p>
                                    <p class="genre">Genre: ${album.genre}</p>
                                    <p class="price">Price: $${album.price}</p>
                                    <p class="date">Release Date: ${album.releaseDate}</p>
                                </div>
                                ${userData
                                        ? html`
                                            <div class="btn-group">
                                                <a href="/details/${album._id}" id="details">Details</a>
                                            </div>
                                        `
                                        : null}

                            </div>
                        </div>
                    `)}
        </div>
    </section>


`


export async function searchPage(ctx) {

    ctx.render(searchTemplate([], onClick))

    async function onClick(ev) {
        const input = ev.target.previousElementSibling.value.trim()
        const userData = getUserData() !== null
        let msg = ''
        if (input === ''){
            return alert('Field is required!')
        }
        const items = await getAlbumByName(input)
        if (items.length === 0){
            msg = 'No result.'
        }
        ctx.render(searchTemplate(items, onClick, userData, msg))
    }
}