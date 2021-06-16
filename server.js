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
  app.get('/movies', getMoviesHandler)
  function  getMoviesHandler(req, res) {
    let userInput = req.query.query;
    let moviekey = process.env.MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${moviekey}&query=${userInput}`;
    axios.get(url).then(result =>{
        const movieArray = result.data.results.map(item=>{
        return new Movie (item);
        })
    res.send(movieArray);
    })
    .catch(error =>{
      res.send(`there is an error in getting the data => ${error}`);
    })
  }
class Movie {
    constructor(item) {
        this.title=item.title;
        this.overview=item.overview;
        this.averageVotes=item.vote_average;
        this.totalVotes=item.total_votes;
        this.imagel=`https://image.tmdb.org/t/p/original${item.poster_path}`;
        this.popularity=item.popularity;
        this.releasedOn=item.release_date;
    }
    }

})
class Weather {
  constructor(weatherData) {
    this.description = weatherData.weather.description;
    this.date = weatherData.valid_date;
  }

}

app.listen(PORT) // kick start the express server to work