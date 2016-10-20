var City = require('../models/cityModel');
module.exports = function(app){
    app.get('/api/setupCities', function(req, res) {
        //seed db
        var starterCities = [
            {
                name: 'New York',
                interval: 2,
                temps:{
                    temp: 30,
                    date: 12345566
                }

            }
        ];
        City.create(starterCities, function(err, results){
            res.send(results);
        });

    
    });
}