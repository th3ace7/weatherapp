const weatherapi = "/weather";
const windarray = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const form = document.querySelector("form");
const input = document.querySelector("input");
const temperature = document.querySelector(".temperature");
const icon = document.querySelector(".icon img");
const condition = document.querySelector(".condition");
const place = document.querySelector(".place");
const country = document.querySelector(".country");
const feels = document.querySelector(".feels");
const tmin = document.querySelector(".tmin");
const tmax = document.querySelector(".tmax");
const day = document.querySelector(".day");
const month = document.querySelector(".month");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const visibility = document.querySelector(".visibility");
const wind = document.querySelector(".wind");
const speed = document.querySelector(".speed");
const direction = document.querySelector(".direction");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");

const currentdate = new Date();
const options = {month: "long"};
const monthname = currentdate.toLocaleString("en-US", options);
month.textContent = monthname;
day.textContent = currentdate.getDate();

if("geolocation" in navigator){
    temperature.textContent = "Loading";
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiurl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
            fetch(apiurl).then((response) => response.json()).then((data) => {
                if(data && data.address && data.address.city){
                    const city = data.address.city;
                    showdata(city);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    );
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    temperature.textContent = "Loading";
    icon.src = "";
    condition.textContent = "";
    place.textContent = "-";
    country.textContent = "";
    feels.textContent = "-";
    tmin.textContent = "-";
    tmax.textContent = "-";
    humidity.textContent = "-";
    pressure.textContent = "-";
    visibility.textContent = "-";
    speed.textContent = "-";
    direction.textContent = "";
    sunrise.textContent = "-";
    sunset.textContent = "-";
    showdata(input.value);
});

function showdata(city){
    getweatherdata(city, (result) => {
        if(result.cod == 200){
            console.log(result);
            temperature.textContent = (result?.main?.temp - 273.15).toFixed(0) + String.fromCharCode(176);
            icon.src = `https://openweathermap.org/img/wn/${result?.weather[0]?.icon}@2x.png`;
            condition.textContent = result?.weather[0]?.description;
            place.textContent = result?.name;
            country.textContent = result?.sys?.country;
            feels.textContent = (result?.main?.feels_like - 273.15).toFixed(1) + String.fromCharCode(176);
            tmin.textContent = (result?.main?.temp_min - 273.15).toFixed(1) + String.fromCharCode(176);
            tmax.textContent = (result?.main?.temp_max - 273.15).toFixed(1) + String.fromCharCode(176);
            humidity.textContent = result?.main?.humidity + "%";
            pressure.textContent = result?.main?.pressure + "hPa";
            visibility.textContent = (result?.visibility / 1000).toFixed(1) + "km";
            speed.textContent = result?.wind?.speed;
            direction.textContent = windarray[(((result?.wind?.deg + 22.5) % 360) / 8).toFixed(0)];
            wind.style = `background: conic-gradient(from ${result?.wind?.deg}deg, white, blue);`;
            sunrise.textContent = (new Date(result?.sys?.sunrise * 1000)).toTimeString().substring(0, 5);
            sunset.textContent = (new Date(result?.sys?.sunset * 1000)).toTimeString().substring(0, 5);
        }
        else{
            temperature.textContent = "City not found";
        }
    });
}

function getweatherdata(city, callback){
    const locationapi = weatherapi + "?location=" + city;
    fetch(locationapi).then((response) => {
        response.json().then((response) => {
            callback(response);
        });
    });
}