const appId = 'fa19585e62ed3b8595ff01cd2670cfd2';
const units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
        if (searchTerm.length === 5 && `${Number.parseInt(searchTerm)}` === searchTerm) searchMethod = 'zip';
        else searchMethod = 'q';
}

function setPositionForWeatherInfo() {
        const weatherContainer = document.getElementById('weatherContainer');
        const weatherContainerHeight = weatherContainer.clientHeight;
        const weatherContainerWidth = weatherContainer.clientWidth;

        weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
        weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
        weatherContainer.style.visibility = 'visible';
}

function init(resultFromServer) {
        switch (resultFromServer.weather[0].main) {
                case 'Clear':
                        document.body.style.backgroundImage = 'url("clear.jpg")';
                        break;

                case 'Clouds':
                        document.body.style.backgroundImage = 'url("cloudy.jpg")';
                        break;

                case 'Rain':
                case 'Drizzle':
                case 'Mist':
                        document.body.style.backgroundImage = 'url("rain.jpg")';
                        break;

                case 'Thunderstorm':
                        document.body.style.backgroundImage = 'url("storm.jpg")';
                        break;

                case 'Snow':
                        document.body.style.backgroundImage = 'url("snow.jpg")';
                        break;

                default:
                        break;
        }

        const weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
        const temperatureElement = document.getElementById('temperature');
        const humidityElement = document.getElementById('humidity');
        const windSpeedElement = document.getElementById('windSpeed');
        const cityHeader = document.getElementById('cityHeader');
        const weatherIcon = document.getElementById('documentIconImg');

        weatherIcon.src = `https://openweathermap.org/img/w/${resultFromServer.weather[0].icon}.png`;

        const resultDescription = resultFromServer.weather[0].description;
        weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

        temperatureElement.innerHTML = `${Math.floor(resultFromServer.main.temp)}&#176 `;
        windSpeedElement.innerHTML = `Wind at ${Math.floor(resultFromServer.wind.speed)} m/s`;
        cityHeader.innerHTML = resultFromServer.name;
        humidityElement.innerHTML = `Humidity levels at: ${resultFromServer.main.humidity}%`;

        setPositionForWeatherInfo();
}

function searchWeather(searchTerm) {
        getSearchMethod(searchTerm);
        fetch(
                `https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
        )
                .then(result => result.json())
                .then(result => {
                        init(result);
                });
}

document.getElementById('searchBtn').addEventListener('click', () => {
        const searchTerm = document.getElementById('searchInput').value;
        if (searchTerm) searchWeather(searchTerm);
});
