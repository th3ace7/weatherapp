var weatherapi = "/weather";

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const weathericon = document.querySelector(".weathericon i");
const weathercondition = document.querySelector(".weathercondition");
const tempelement = document.querySelector(".temperature span");
const locationelement = document.querySelector(".place");
const dateelement = document.querySelector(".date");

const currentdate = new Date();
const options = {month: "long"};
const monthname = currentdate.toLocaleString("en-US", options);

dateelement.textContent = currentdate.getDate() + ", " + monthname;

if("geolocation" in navigator){
    locationelement.textContent = "loading";
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
                else{

                }
            }).catch((error) => {
                console.log(error);
            });
        },
        function (error) {
            console.log(error.message);
        }
    );
}
else{

}

weatherform.addEventListener("submit", (e) => {
    e.preventDefault();
    locationelement.textContent = "loading";
    weathericon.className = "";
    tempelement.textContent = "";
    weathercondition.textContent = "";
    showdata(search.value);
})

function showdata(city){
    getweatherdata(city, (result) => {
        if(result.cod == 200){
            console.log(result);
            weathericon.className = "";
            locationelement.textContent = result?.name;
            tempelement.textContent = (result?.main?.temp - 273.15).toFixed(0) + " " + String.fromCharCode(176) + "C";
            weathercondition.textContent = result?.weather[0]?.description;
        }
        else{
            locationelement.textContent = "City not found";
        }
    })
}

function getweatherdata(city, callback){
    const locationapi = weatherapi + "?location=" + city;
    fetch(locationapi).then((response) => {
        response.json().then((response) => {
            callback(response);
        })
    })
}