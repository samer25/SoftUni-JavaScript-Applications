async function attachEvents() {
    // getting needed element and inputs from html
    const locationInput = document.getElementById('location')
    const btn = document.getElementById('submit')
    let loc = Object.values(await getLocations())
    let url = ''
    // creating static data for icons
    const codesWeather = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601; ',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    }

    // Event listener for getting the weather
    btn.addEventListener('click', getWeather)


    // getting the weather
    async function getWeather() {
        // getting needed element form the html
        const forecastCurr = document.getElementById('current')
        const forecastUp = document.getElementById('upcoming')

        // creating needed elements
        const currDiv = document.createElement('div')
        const upDiv = document.createElement('div')

        // getting the fetched data
        let [currForecast, upForecast] = await Promise.all([
            getCurrentCondition(),
            getUpcomingCondition()
        ])

        // adding classes to the created elements
        currDiv.className = 'forecast'
        upDiv.className = 'forecast-info'

        // clearing the information
        forecastCurr.innerHTML = ''
        forecastUp.innerHTML = ''

        try {
            // adding needed element and data to the created element (Current Weather)
            currDiv.innerHTML = `
                <span class="condition symbol">${codesWeather[currForecast.forecast.condition]}</span>
                <span class="condition">
                    <span class="forecast-data">${currForecast.name}</span>
                    <span class="forecast-data">${currForecast.forecast.low}/${currForecast.forecast.high}</span>
                    <span class="forecast-data">${currForecast.forecast.condition}</span>
                </span>
            `
            // appending to the div element for current weather data
            forecastCurr.appendChild(currDiv)
            // making visible the div
            document.getElementById('forecast').style.display = 'block'

            // adding data upcoming weather to div upcoming
            upForecast.forecast.forEach((f) => {
                const span = document.createElement('span')
                span.className = 'upcoming'
                span.innerHTML = `            
                <span class="symbol">${codesWeather[f.condition]}</span>
                <span class="forecast-data">${f.low}/${f.high}</span>
                <span class="forecast-data">${f.condition}</span>
        `
                upDiv.appendChild(span)
            })
            forecastUp.appendChild(upDiv)

        } catch (e) {
            document.getElementById('forecast').style.display = 'block'
            await Promise.all([
                getCurrentCondition(),
                getUpcomingCondition()
            ])
        }


        async function getCurrentCondition() {

            // loping location to find the data needed
            for (const lElement of loc) {
                if (lElement.name === locationInput.value) {
                    url = `http://localhost:3030/jsonstore/forecaster/today/${lElement.code}`
                    break
                }
            }

            // fetching data for current weather
            try {
                const response = await fetch(url)
                if (response.status !== 200) {
                    throw new Error('Error')
                }
                const data = await response.json()
                return data
            } catch (e) {
                return forecastCurr.textContent = 'Error'

            }


        }

        async function getUpcomingCondition() {

            // loping location to find the data needed
            for (const lElement of loc) {
                if (lElement.name === locationInput.value) {
                    url = `http://localhost:3030/jsonstore/forecaster/upcoming/${lElement.code}`
                    break
                }
            }

            // fetching data for upcoming weather

            try {
                const response = await fetch(url)
                if (response.status !== 200) {
                    throw new Error('Error')
                }
                const data = await response.json()
                return data
            } catch (e) {
                return forecastUp.textContent = 'Error'
            }


        }


    }


}

async function getLocations() {
    // fetching data all location
    const url = 'http://localhost:3030/jsonstore/forecaster/locations'
    const response = await fetch(url)
    const data = await response.json()
    return data
}


attachEvents();