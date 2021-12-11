function attachEvents() {
    const loadBtnPosts = document.getElementById('btnLoadPosts')
    const viewBtnPost = document.getElementById('btnViewPost')

    loadBtnPosts.addEventListener('click', getAllPost)
    viewBtnPost.addEventListener('click', displayPost)

}

attachEvents();

async function displayPost() {
    const selectedId = document.getElementById('posts').value

    let [post, comments] = await Promise.all([
        getPostById(selectedId),
        getCommentByPostId(selectedId)
    ])


    document.getElementById('post-title').textContent = post.title
    document.getElementById('post-body').textContent = post.body

    const ulElement = document.getElementById('post-comments')
    ulElement.innerHTML = ''

    comments.forEach((c) => {
        const liElement = document.createElement('li')
        liElement.textContent = c.text
        ulElement.appendChild(liElement)
    })

}

async function getAllPost() {
    const url = 'http://localhost:3030/jsonstore/blog/posts'

    const res = await fetch(url)
    const data = await res.json()

    const selectElement = document.getElementById('posts')
    selectElement.innerHTML = ''
    Object.values(data).forEach((p) => {
        const optionElement = document.createElement('option')
        optionElement.textContent = p.title
        optionElement.value = p.id

        selectElement.appendChild(optionElement)
    })
}

async function getPostById(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/posts/' + postId

    const res = await fetch(url)
    const data = await res.json()
    return data
}

async function getCommentByPostId(postId) {
    const url = `http://localhost:3030/jsonstore/blog/comments`

    const res = await fetch(url)
    const data = await res.json()

    return Object.values(data).filter(c => c.postId === postId)
}