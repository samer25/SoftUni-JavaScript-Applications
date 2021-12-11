// In api.js we are handling only the requests to rest server


// main url to the rest server
import {clearUserData, getUserData, setUserData} from "../util.js";

const host = 'http://localhost:3030'

async function request(url, options) {
    try{

        const response = await fetch(host + url, options);

        if (response.ok !== true){
            // for token error 403 removing user session data
            if (response.status === 403){
                clearUserData()
            }
            const error = await response.json()
            throw new Error(error.message)
        }

        // if response is empty
        if (response.status === 204){
            return response
        }else{
            return response.json()
        }

    }catch(err){
        alert(err.message)
        throw err
    }
}

function createOptions(method = 'get', data){
    const options = {
        method,
        headers: {
        }
    }

    // if there data
    if (data !== undefined){
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)

    }

    const userData = getUserData()

    // if there logged user
    if (userData !== null){
        options.headers['X-Authorization'] = userData.token
    }

    return options
}

export function get(url){
    // adding path exp: (data/catalog)
    // and adding createOption() without parameters default method is get and data will be undefined
    return request(url, createOptions())
}

export async function post(url, data){
    // adding path exp: (data/create) and  createOption with first parameter post and
    // second data that will send for create
    return request(url, createOptions('post', data))
}

export async function put(url, data){
    // adding path exp: (data/bookCreate/:id) and createOption with first parameter post and
    // second data that will send for update
    return request(url, createOptions('put', data))

}

export async function del(url){
    // adding path exp: (data/book/:id) and createOptions with parameter delete the second will be undefined
    return request(url, createOptions('delete'));
}

export async function login(email, password){
    // getting function post from above adding url for login and data
    // all error checking is happening in request function above
    const result = await post('/users/login', {email, password})

    // creating object with needed information where will be stored in session storage
    // user email
    // id user to checking if the user is an author of content that can manipulation
    // and token for authorization
    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };
    setUserData(userData)
}

export async function logout(){
    // getting get function from above
    await get('/users/logout')
    clearUserData()
}


export async function register(email, password, rePassword){

    // getting function post from above adding url for register and data
    // all error checking is happening in request function above
    const result = await post('/users/register', {email, password, rePassword})

    // creating object with needed information where will be stored in session storage
    // user email
    // id user to checking if the user is an author of content that can manipulation
    // and token for authorization
    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };
    setUserData(userData)
}