var http = require("http");
var City = require('../models/cityModel');

module.exports = {
    getUrl: function(city, key) {
        return "http://api.openweathermap.org/data/2.5/forecast/?q="+city+"&APPID="+key+"&units=metric";
    },
    getApiData: function(url, city) {

            // get is a simple wrapper for request()
            // which sets the http method to GET
            console.log("calling weather api \n");
            var request = http.get(url, function (response) {
                var buffer = "";
                var data ="";

                // data is streamed in chunks from the server
                // so we have to handle the "data" event    
                response.on("data", function (chunk) {
                    buffer += chunk;
                }); 

                response.on("end", function (err) {
                    // finished transferring data
                    // dump the raw data
                    var insertion = [];
                    //console.log(buffer);
                    console.log("\n");
                    data = JSON.parse(buffer);

                    console.log(data.list+"\n");
                    //create entries to be inserted in the database
                    for(var k in data.list) {
                        insertion.push({
                            temp: data.list[k].main.temp,
                            time: data.list[k].dt
                        });
                        console.log(k, data.list[k].main.temp);
                    };
                    //insert data in db
                    City.update({ name: city} ,{temps: insertion} , function(err, results){
                        console.log("Successful write on db /n");
                        console.log(results);
                    });
                }); 
            }); 
    }
}


callWeatherAPI = function(url, city){
    // get is a simple wrapper for request()
    // which sets the http method to GET
    console.log("calling weather api \n");
    var request = http.get(url, function (response) {
        var buffer = "";
        var data ="";

        // data is streamed in chunks from the server
        // so we have to handle the "data" event    
        response.on("data", function (chunk) {
            buffer += chunk;
        }); 

        response.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            var insertion = [];
            //console.log(buffer);
            console.log("\n");
            data = JSON.parse(buffer);

            console.log(data.list+"\n");
            //create entries to be inserted in the database
            for(var k in data.list) {
                insertion.push({
                    temp: data.list[k].main.temp,
                    time: data.list[k].dt
                });
                console.log(k, data.list[k].main.temp);
            };
            //insert data in db
            City.update({ name: city} ,{temps: insertion} , function(err, results){
                console.log("Successful write on db /n");
                console.log(results);
            });
        }); 
    }); 
}