var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var http = require("http");
var fs = require("fs");
var key = fs.readFileSync("weatherapi.key");


// create a schema
var citySchema = new Schema({
  name: String,
  interval: Number,
  temps: [
      {
        temp: Number,
        time: Number
      }
  ]
});

var City = mongoose.model('City', citySchema);
// make this available

module.exports = City;
