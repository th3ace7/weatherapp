const express = require("express");
const hbs = require("hbs");
const path = require("path");
const getweatherdata = require("./utils/getweatherdata");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("foo");
});

app.get("/weather", (req, res) => {
    if(!req.query.location){
        return res.send("Location required");
    }
    getweatherdata(req.query.location, (error, result) => {
        if(error) {
            return res.send(error);
        }
        res.send(result);
    });
});

app.get("*", (req, res) => {
    res.send("Route doesn't exist");
})

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});