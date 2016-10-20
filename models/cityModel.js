var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
