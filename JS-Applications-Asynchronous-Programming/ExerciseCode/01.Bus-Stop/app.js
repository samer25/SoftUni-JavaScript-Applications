async function getInfo() {
    // Getting elements and value form html
    const busId = document.getElementById('stopId').value
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');

    try {
        // Loading and emptying Text
        stopName.textContent = 'Loading';
        buses.innerHTML = '';

        // Getting api data from the server
        const url = `http://localhost:3030/jsonstore/bus/businfo/${busId}`;

        const response = await fetch(url);

        if (response.status !== 200) {
            throw new Error('There was an Error');
        }

        const data = await response.json();

        // Adding the name of the stop
        stopName.textContent = data.name;

        // Adding the additional information
        Object.entries(data.buses).forEach((b) => {
            let liElement = document.createElement('li');
            liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            buses.appendChild(liElement);
        });

    } catch (e) {
        // Displaying an error if there some
        stopName.textContent = 'Error'
    }

}