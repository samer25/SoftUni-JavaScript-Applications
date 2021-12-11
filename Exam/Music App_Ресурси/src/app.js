import * as api from './api/data.js'
import {page, render} from './lib.js'

import {homePage} from "./views/home.js";
import {catalogPage} from "./views/catalog.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {logout} from "./api/data.js";
import {getUserData} from "./util.js";
import {createPage} from "./views/create.js";
import {detailsPage} from "./views/details.js";
import {editPage} from "./views/edit.js";
import {searchPage} from "./views/search.js";




const root = document.querySelector('main')
document.getElementById('logout').addEventListener('click', async ()=>{
    await logout()
    updateUserNav()
    page.redirect('/')
})

page(decorateContext)
page('/', homePage);
page('/catalog', catalogPage)
page('/login', loginPage)
page('/register', registerPage)
page('/create', createPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)
page('/search', searchPage)

updateUserNav()
page.start()

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root)
    ctx.updateNav = updateUserNav
    next();
}

function updateUserNav(){
    const userData = getUserData()

    if (userData){
        document.querySelectorAll('.user')[0].style.display = 'inline'
        document.querySelectorAll('.user')[1].style.display = 'inline'

        document.querySelectorAll('.guest')[0].style.display = 'none'
        document.querySelectorAll('.guest')[1].style.display = 'none'


    }else{
        document.querySelectorAll('.user')[0].style.display = 'none'
        document.querySelectorAll('.user')[1].style.display = 'none'

        document.querySelectorAll('.guest')[0].style.display = 'inline'
        document.querySelectorAll('.guest')[1].style.display = 'inline'

    }
}