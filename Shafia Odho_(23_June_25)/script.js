const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; //api key

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.cod === 200){
            locationElement.textContent = `Location: ${data.name}` ;
           temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
           descriptionElement.textContent = `Condition: ${data.weather[0].description}`;
        }else{
            locationElement.textContent = `Location not found`;
            temperatureElement.textContent = `Temperature: -`;
            descriptionElement.textContent = `Condition: -`;
        }
    });
}


searchBtn.addEventListener('click', ()=>{
    const city = cityInput.value.trim();
    if(city){
        getWeather(city);
    }else{
        alert('Please enter a city name.');
    }
});