const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const weatherData=require('./data/weather.json');
app.use(cors()) // after you initialize your express app instance
require('dotenv').config();
const PORT=process.env.PORT 
// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response


})

app.get('/weather' ,(req,res)=>{
  const  resData=weatherData.data.map(obj => new Weather(obj));
    res.json(resData);


   
})
class Weather{
  constructor(weatherData){
    this.description=weatherData.weather.description;
    this.date=weatherData.valid_date;
  }
  
}
 
app.listen(PORT) // kick start the express server to work