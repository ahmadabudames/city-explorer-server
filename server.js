const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const axios = require('axios')
const weatherData = require('./data/weather.json');
const { response } = require('express');
app.use(cors()) // after you initialize your express app instance
require('dotenv').config();
const PORT = process.env.PORT
// const WEATHER_API_KEY = process.env.WEATHER_API_KEY
// a server endpoint 
app.get('/', // our endpoint name
  function (req, res) { // callback function of what we should do with our request
    res.send('Hello World') // our endpoint function response


  })

app.get('/weather', (req, res) => {

  const lon = req.query.lon
  const lat = req.query.lat

  if (lon && lat) {

    const weatherBit = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    axios.get(weatherBit).then(response => {
      const resData = response.data.data.map(obj => new Weather(obj));
      res.json(resData)
    }).catch(error => {
      res.send('an error in weatherbit api')
    })
    // res.json(resData);

  } else {
    res.send('please enter the lon and lat')
  }


})
class Weather {
  constructor(weatherData) {
    this.description = weatherData.weather.description;
    this.date = weatherData.valid_date;
  }

}
app.get('/movies', (req, res) => {

  const moviesName = req.query.query;
  const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
  const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${moviesName}`;
  axios.get(moviesUrl).then(mov => {
    const movieArray = mov.data.results.map(item => {
      return new Movie(item);
    })
    res.send(movieArray);
  })
    .catch(error => {
      res.send(`there is an error in getting the data => ${error}`);
    })
}
)

class Movie {
  constructor(elements) {
    this.title = elements.title;
    this.overview = elements.overview;
    this.averageVotes = elements.vote_average;
    this.totalVotes = elements.total_votes;
    this.popularity = elements.popularity;
    this.releasedOn = elements.release_date;
  }
}
app.listen(PORT) // kick start the express server to work