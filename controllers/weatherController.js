var http = require("http");
var fs = require("fs");
var key = fs.readFileSync("weatherapi.key");
var City = require('../models/cityModel');
var api = require('../modules/apiCall');

module.exports = function(app, intervals){
    City.find({},function(err, city){
        if (err) throw err
        console.log("In weather module \n \n");
        console.log("Checking DB results\n");
        
        //for each city call the api on set interval
        city.forEach(function(city){
            var url = api.getUrl(city.name);
            console.log(city.temps);
                console.log("Calling API for city: " + city.name);
                //add to the interval list and set
                 intervals[city.name] = setInterval(function(){
                    api.getApiData(url, city.name);
                }, city.interval * 3600000 );
        });
    });
    
    
}

