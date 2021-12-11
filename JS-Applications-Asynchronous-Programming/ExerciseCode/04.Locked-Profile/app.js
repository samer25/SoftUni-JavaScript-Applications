function lockedProfile() {

    async function profiles() {
        // getting needed element for appending information
        const main = document.getElementById('main')

        // removing the existing element that is static in html
        main.firstElementChild.remove()

        // fetching the data
        const url = `http://localhost:3030/jsonstore/advanced/profiles`
        const response = await fetch(url)
        const data = await response.json()

        // adding number for attributes name in input to not be duplicated
        let userLocked = 0

        // adding information
        Object.values(data).forEach((user) => {
            // creating div element for profile data
            const divProfiles = document.createElement('div')
            // adding class to the element
            divProfiles.className = 'profile'

            divProfiles.innerHTML = `
                <img src="./iconProfile2.png" class="userIcon" />
                <label>Lock</label>
                <input type="radio" name="user${userLocked}Locked" value="lock" checked>
                <label>Unlock</label>
                <input type="radio" name="user${userLocked}Locked" value="unlock"><br>
                <hr>
                <label>Username</label>
                <input type="text" name="user${userLocked}Username" value="${user.username}" disabled readonly />
                <div id="user1HiddenFields">
                <hr>
                <label>Email:</label>
                <input type="email" name="user${userLocked}Email" value="${user.email}" disabled readonly />
                <label>Age:</label>
                <input type="email" name="user${userLocked}Age" value="${user.age}" disabled readonly />
                </div>
                <button>Show more</button>
        `
            main.appendChild(divProfiles)

            // increasing the number for next user
            userLocked += 1
        })


        let btn = main.getElementsByTagName('button')

        // lopping the buttons to add each button event listener
        for (const btnElement of btn) {
            btnElement.addEventListener('click', show)
        }


        function show(ev) {
            // showing and hide information if is not locked
            if (ev.target.parentElement.children[4].checked) {
                if (ev.target.textContent === 'Show more') {
                    ev.target.previousElementSibling.style.display = 'block'
                    ev.target.textContent = 'Hide it'
                } else {
                    ev.target.previousElementSibling.style.display = 'none'
                    ev.target.textContent = 'Show more'
                }
            }

        }
    }

    profiles()
}
