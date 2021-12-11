function solution() {
    let btnMore = ''
    // getting needed element from html
    const main = document.getElementById('main')

    async function titles() {

        // fetching data from api titles
        const url = `http://localhost:3030/jsonstore/advanced/articles/list`
        const response = await fetch(url)
        const data = await response.json()

        // adding the titles to html for displaying
        data.forEach((el) => {
            const div = document.createElement('div')
            div.className = 'accordion'
            div.innerHTML = `
            <div class="head">
                <span>${el.title}</span>
                <button class="button" id="${el._id}">More</button>
            </div>
            <div class="extra">
            </div>
            `
            main.append(div)
        })


        btnMore = main.querySelectorAll('button')

        // looping all buttons to add event lisiner
        for (const btn of btnMore) {
            btn.addEventListener('click', showMore)
        }
    }

    titles()

    function showMore(e) {
        // getting button attribute id value
        let idBtn = e.target.attributes.getNamedItem('id').value
        // creating p element
        let p = document.createElement('p')

        // getting div element with class name extra
        let extraContent = e.target.parentElement.nextElementSibling

        async function details() {
            // fetching the details data
            const url = `http://localhost:3030/jsonstore/advanced/articles/details/${idBtn}`
            const response = await fetch(url)
            const data = await response.json()


            if (e.target.textContent === 'More') {
                extraContent.style.display = 'block'
                p.textContent = data.content
                extraContent.appendChild(p)
                e.target.textContent = 'Less'
            } else {
                extraContent.style.display = 'none'
                extraContent.lastElementChild.remove()
                e.target.textContent = 'More'
            }


        }

        details()
    }


}

solution()