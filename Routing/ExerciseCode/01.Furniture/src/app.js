import {page, render} from './lib.js'
import {catalogPage} from "./views/catalog.js";
import {detailsPage} from "./views/details.js";
import {createPage} from "./views/create.js";
import {editPage} from "./views/edit.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";

import * as api from './api/data.js'
import {logout} from "./api/api.js";
import {getUserData} from "./util.js";

window.api= api

const root = document.querySelector('.container')

document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext)
page('/', catalogPage)
page('/details/:id', detailsPage)
page('/create', createPage)
page('/edit/:id', editPage)
page('/login', loginPage)
page('/register', registerPage)
page('/my-furniture', catalogPage)
updateNav()
page.start()
function decorateContext(ctx, next){
    ctx.render = (content) =>  render(content, root)
    ctx.updateNav = updateNav
    next()
}

function updateNav(){
    const userData = getUserData();
    if (userData){
        document.getElementById('user').style.display = 'inline-block'
        document.getElementById('guest').style.display = 'none'

    }else{
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'inline-block'
    }
}

async function onLogout(){
    // in html on the button we call javascript:void(0) its the same as preventDefault
    await logout()
    updateNav()
    page.redirect('/')
}