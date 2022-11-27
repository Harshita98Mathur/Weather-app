//https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_kEY}&units=metric

const weatherApi = {
    key: "a383a34d2b066a2361039502c8558a01",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const InputBox = document.getElementById('input-box');

// Event Listener Function on keypress
InputBox.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13) {
        console.log(InputBox.value);
        getWeather(InputBox.value);
        
    }

});

// Get Weather Report
function getWeather(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeather);
}

// Show Weather Report
function showWeather(weather){
    console.log(weather);

    var city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    var temp = document.getElementById('temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    var maxMinTemp = document.getElementById('min-max');
    maxMinTemp.innerHTML = `<span>Minimun & Maximun temperature :</span>${Math.round(weather.main.temp_min)}&deg;C (min) / ${Math.round(weather.main.temp_max)}&deg;C (max)`;

    var weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    var hum = document.getElementById('hum');
    hum.innerHTML = `<span>Humidity : </span>${weather.main.humidity}<span>%</span`;

    var press = document.getElementById('press');
    press.innerHTML = `<span>Pressure : </span>${weather.main.pressure}<span> mbar</span>`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = manageDate(todayDate);
}


function manageDate(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}