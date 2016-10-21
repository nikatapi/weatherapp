var http = require("http");
var City = require('../models/cityModel');
var bodyParser = require('body-parser');
var fs = require("fs");
var key = fs.readFileSync("weatherapi.key");
var api = require('../modules/apiCall');

module.exports = function(app, intervals){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //get list of temperatures for a city
    app.get('/api/city/:name', function(req, res){ 

        City.find({ city: req.params.name }, function(err, city){
            if (err) {
                console.log('City wasnt found');
                res.redirect('/404');
            }
            
            res.send(city.temps);
        });

    });

    //add a city
    app.post('/api/city', function(req, res){
        console.log('Request received for adding a city');
        var name = req.body.name;
        var interval = req.body.interval;
        var newCity = City({
            name: name,
            interval: interval
        });
        newCity.save(function(err){
            if (err) throw err;
            //finally go back to list page, we'll get the data later so the page loads faster
            res.redirect('/');
        });
        //we need to get the weather data
        var url = api.getUrl(name, key);
        api.getApiData(url, name);
        intervals[name] = setInterval(function(){
                    api.getApiData(url, name);
                    }, interval * 3600000 );
        console.log("Setting interval for "+ name);

        
    });

    //delete a city
    app.get('/destroy/:name', function(req, res){
        console.log('request received for deleting '+ req.params.name);
        City.remove({"name": req.params.name}, function(err){
            if (err){
                console.log("Could not delete city! Redirecting");
                res.redirect('/404');
            }
            console.log("Removed" + req.params.name + "from database");
            res.redirect('/');
            clearInterval(intervals[req.params.name]);
            console.log("------clearing interval for "+ req.params.name + "---------");
            intervals[req.params.name] = undefined;

        });
    });
}