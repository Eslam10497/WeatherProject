// express initialization
const { response } = require("express");
const express = require("express");
const app = express();
const port = 3000;
//https initialization
const https = require("https");

app.get("/", function (req, res) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Giza&appid=c9307f795f5e72b3999976b71673d669&units=metric";
  https.get(url, function (response) {
    console.log("🚀 ~ file: app.js ~ line 14 ~ https.get ~ response", response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log("🚀 ~ file: app.js ~ line 15 ~ weatherData", weatherData);
    });
  });
  res.send("Server is Ready");
});
app.listen(3000, function () {
  console.log("🚀 ~ file: app.js ~ line 13 ~ app.listen ~ The server is working");
});
