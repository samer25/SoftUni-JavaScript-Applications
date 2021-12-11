async function attachEvents() {
    const submitBtn = document.getElementById('submit')
    const loadBtn = document.getElementById('refresh')
    await loadMessage()
    loadBtn.addEventListener('click', loadMessage)
    submitBtn.addEventListener('click', sendMessage)

}


async function loadMessage(){
    const textArea = document.getElementById('messages')
    textArea.value = ''
    const url = 'http://localhost:3030/jsonstore/messenger'
    const response = await fetch(url)
    const data = await response.json()
    Object.values(data).map((m) => {
        textArea.value += `${m.author}: ${m.content}\n`
    })
}


async function createMessage(data){
    const url = 'http://localhost:3030/jsonstore/messenger'
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

async function sendMessage(){
    const author = document.querySelector('[name=author]').value
    const content = document.querySelector('[name=content]').value
    await createMessage({author, content})
    await loadMessage()

}

attachEvents();