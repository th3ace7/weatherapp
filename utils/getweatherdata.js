const request = require("request");

const owmapi = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY: process.env.SECRET
};

const getweatherdata = (location, callback) => {
    const url = owmapi.BASE_URL + encodeURIComponent(location) + "&APPID=" + owmapi.SECRET_KEY;
    request({url, json:true}, (error, data) => {
        if(error) {
            callback(true, "Unable to fetch the data " + error);
        }
        callback(false, data?.body);
    });
};

module.exports = getweatherdata;