var express = require('express');
var app = express();

//this method sucks of course
var config = require('./config');

var mongoose = require('mongoose');  
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');
var weatherController = require('./controllers/weatherController');
var City = require('./models/cityModel');
var intervals = new Array();

var port = process.env.PORT || 3000;  

mongoose.connect(config.getDbConnectionString());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// index page 
app.get('/', function(req, res) {
    City.find({}, function(err, cities) {
        if(err) console.log(error);
        //console.log(cities);
        res.render('index', {cities: cities});
    });
});

//single city page info
app.get('/cities/:name', function(req, res){
    City.find({name: req.params.name }, function(err, city){
       if(err){
            res.render('404');
       }
       else{
            console.log("Get request for city: " + city[0].name);
            console.log(city[0].temps[0].temp);
            res.render('bars', {city: city[0]});
       }
        
    })
});

//form for adding a city
app.get('/addCity', function(req, res){
    res.render('addCity');
});

apiController(app, intervals);
//when the server starts we want to start requesting for api data
weatherController(app, intervals);   

app.listen(port);
console.log('Server is running on port: ' +  port);
