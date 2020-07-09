window.onload=ready;
var searchbox;

const api = {
    key: "f8182768d574052d4b9cce7ba7a3ac6d",
    base: "https://api.openweathermap.org/data/2.5/",
}

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function ready(){
    searchbox = document.querySelector('.search-box');
    searchbox.addEventListener('keypress', setQuery);
    getResults("Ottawa");
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let DateElement = document.querySelector('.location .date');
    DateElement.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span> &#176; </Span> `

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}c / ${Math.round(weather.main.temp_max)}c`;
}

function dateBuilder(d) {
    let months = ["January", "Februray", "March", "April", "May", "June", "July", "August", "Septmeber", "October", "November", "December"];
    let days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

}