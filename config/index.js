var configValues = require('./config');

module.exports = {
    getDbConnectionString: function(){
       return 'mongodb://'+ configValues.uname + ':' +configValues.pwd +'@ds061676.mlab.com:61676/weatherapp';
    }
}