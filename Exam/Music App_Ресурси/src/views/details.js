import {html} from '../lib.js'
import {getUserData} from "../util.js";
import {deleteAlbum, getAlbumById} from "../api/data.js";

const detailsTemplate = (album, isOwner, onDelete) => html`

    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src=${album.imgUrl}>
            </div>
            <div class="albumInfo">
                <div class="albumText">

                    <h1>Name: ${album.name}</h1>
                    <h3>Artist: ${album.artist}</h3>
                    <h4>Genre: ${album.genre}</h4>
                    <h4>Price: $${album.price}</h4>
                    <h4>Date: ${album.releaseDate}</h4>
                    <p>Description: ${album.description}</p>
                </div>
                ${isOwner
                        ? html`
                        <div class="actionBtn">
                            <a href="/edit/${album._id}" class="edit">Edit</a>
                            <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                        </div>
                        `
                        : null}
            </div>
        </div>
    </section>
                
                
    
`

export async function detailsPage(ctx) {
    const album = await getAlbumById(ctx.params.id)
    const userData = getUserData()
    const isOwner = userData && album._ownerId === userData.id
    ctx.render(detailsTemplate(album, isOwner, onDelete));

    async function onDelete(){
        const confirmDel = confirm('Are you sure want to delete this Album?')
        if (confirmDel){
            await deleteAlbum(album._id)
            ctx.page.redirect('/catalog')
        }
    }
}