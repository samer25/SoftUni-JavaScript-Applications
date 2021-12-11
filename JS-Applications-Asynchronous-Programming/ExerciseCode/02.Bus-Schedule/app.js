function solve() {
    // getting needed elements from the html
    const info = document.querySelector('#info span')
    const departBtn = document.getElementById('depart')
    const arriveBtn = document.getElementById('arrive')

    // creating an object for saving the current depart and next depart
    // adding the first depart for start
    let nextDepart = {
        next: 'depot'
    }

    async function depart() {

        try {
            // getting information
            const url = `http://localhost:3030/jsonstore/bus/schedule/${nextDepart.next}`
            const response = await fetch(url)

            if (response.status !== 200){
                departBtn.disabled = false
                arriveBtn.disabled = false
                throw new Error('Error!!!')
            }

            // changing the buttons attribute disabled
            departBtn.disabled = true
            arriveBtn.disabled = false

            const data = await response.json()

            // adding information in span element
            info.textContent ='Next stop ' + data.name

            //changing object with new data
            nextDepart = data

        }catch (e){
            info.textContent = 'Error'
        }



    }

    function arrive() {

        // changing the buttons attribute disabled
        departBtn.disabled = false
        arriveBtn.disabled = true

        // adding data to div element
        info.textContent = 'Arriving at ' + nextDepart.name

    }

    return {
        depart,
        arrive
    };
}

let result = solve();