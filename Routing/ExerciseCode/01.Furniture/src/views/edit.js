import {html, until} from "../lib.js";
import {createItem, getById} from "../api/data.js";


const editTemplate = (itemPromise) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
        
        ${until(itemPromise, html`<p>Loading...</p>`)}
    </div>

`

const formTemplate = (item, onSubmit) => html`
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control" id="new-make" type="text" name="make" value=${item.make}>
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control is-valid" id="new-model" type="text" name="model" value=${item.model}>
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control is-invalid" id="new-year" type="number" name="year" value=${item.year}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description"
                           value=${item.description}>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price" value=${item.price}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img" value=${item.img}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material" value=${item.material}>
                </div>
                <input type="submit" class="btn btn-info" value="Edit"/>
            </div>
        </div>
    </form>
`




export function editPage(ctx) {
    const id = ctx.params.id
    ctx.render(editTemplate(loadItem(id, onSubmit)))

    async function onSubmit(event){
        event.preventDefault()

        const formData = [...(new FormData(event.target)).entries()]
        const data = formData.reduce((a, [k, v])=> Object.assign(a, {[k]: v}), {})

        const missing = formData.filter(([k, v]) => k != 'material' && v == '')

        if (missing.length > 0){
            return alert('Please fill all mandatory fields!')
        }

        data.year = Number(data.year)
        data.price = Number(data.price)

        const result = await createItem(data)
        ctx.page.redirect('/details/' + result._id)

    }

}


async function loadItem(id, onSubmit){
    const item = await getById(id)

    return formTemplate(item, onSubmit)
}



