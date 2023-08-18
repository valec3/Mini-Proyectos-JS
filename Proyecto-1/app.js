// const API_KEY = "0109e8beddd51945b4d7d7cef80d8c6e";
const API_KEY = "863242cfb2b1d357e6093d9a4df19a4b";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

const titleCity = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humedad = document.querySelector(".humedad");
const viento = document.querySelector(".viento");
const btnSearch = document.querySelector("#btnSearch");
const search = document.querySelector("#searchCity");
const btnError = document.querySelector(".error a");

btnError.addEventListener("click", () =>document.querySelector(".error").classList.remove("active"));
btnSearch.addEventListener("click", getValueSearch);
search.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        getValueSearch();    }
});

function getValueSearch() {
    const ciudad = search.value;
    changeCityWeather(ciudad);
}
function changeImgWeather(weather) {
    const imgClima = document.querySelector("#state-clima");
    imgClima.src = `./img/${weather}.png`;
}
async function changeCityWeather(city="lima") {
        const data = await getWeatherData(city);
        console.log(data);
        if (data === null) return;
        titleCity.textContent = data.name;
        temp.textContent = Math.round(data.main.temp)+"°C";
        humedad.textContent = data.main.humidity+"%";
        viento.textContent = data.wind.speed+"Km/h";
        changeImgWeather(data.weather[0].main);
}

async function getWeatherData(city="lima") {
        try{
            const response = await fetch(API_URL+`&q=${city}`);
            const data = await response.json();
            if (!response.ok) {
                document.querySelector(".error").classList.add("active");
                return null;
            }
            return data;
        }catch(error){
            console.log(error);
            return null;
        }
}
