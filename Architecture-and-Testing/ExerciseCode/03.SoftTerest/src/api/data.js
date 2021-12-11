// In data.js we are getting data form the rest server by passing the request
// to api.js that handles the request
// then will take the data to views.js

import * as api from './api.js';


export const login = api.login
export const register = api.register
export const logout = api.logout


export async function getAllIdeas() {
    // getting all items
    return api.get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc')
}

export async function getById(id) {
    // getting item by id
    return api.get('/data/ideas/' + id)
}

export async function createIdea(idea){
    // creating an idea
    return api.post('/data/ideas', idea)
}

export async function deleteById(id){
    // deleting an idea by id
    return api.del('/data/ideas/' + id)
}