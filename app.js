// express initialization
const { response } = require("express");
const express = require("express");
const app = express();
const port = 3000;
//https initialization
const https = require("https");
//body parser initialization
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const query = req.body.cityName;
  console.log("🚀 ~ file: app.js ~ line 17 ~ query", query);
  const appKey = "c9307f795f5e72b3999976b71673d669";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=metric";
  https.get(url, function (response) {
    console.log("🚀 ~ file: app.js ~ line 14 ~ https.get ~ response", response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log("🚀 ~ file: app.js ~ line 15 ~ weatherData", weatherData);
      const temp = weatherData.main.temp;
      console.log("🚀 ~ file: app.js ~ line 16 ~ temp", temp);
      const disc = weatherData.weather[0].description;
      console.log("🚀 ~ file: app.js ~ line 18 ~ disc", disc);
      const icon = " http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      res.write("<h1>The temperature in " + query + " is " + Math.round(temp) + " degrees Celsius.</h1>");
      res.write("<h3> The Weather is currently " + disc + "</h3>");
      res.write("<img src = " + icon + ">");

      res.send();
    });
  });
});
app.listen(3000, function () {
  console.log("🚀 ~ file: app.js ~ line 13 ~ app.listen ~ The server is working");
});
