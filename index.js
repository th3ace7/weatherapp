const express = require("express");
const hbs = require("hbs");
const path = require("path");
const getweatherdata = require("./utils/getweatherdata");

const app = express();
const port = process.env.PORT || 3000;

const publicpath = path.join(__dirname, "./public");
const viewspath = path.join(__dirname, "./templates/views");
const componentspath = path.join(__dirname, "./templates/components");

app.set("views", viewspath);
hbs.registerPartials(componentspath);
app.use(express.static(publicpath));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index", {title: "WeatherApp"});
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
    res.render("notfound", {title: "Page not found"});
})

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});