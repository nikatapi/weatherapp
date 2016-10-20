var City = require('../models/cityModel');
var bodyParser = require('body-parser');

module.exports = function(app){

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
        var newCity = City({
            name: req.body.name,
            interval: req.body.interval
        });
        newCity.save(function(err){
            if (err) throw err;
            res.redirect('/');
        });
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
        });
    });
}