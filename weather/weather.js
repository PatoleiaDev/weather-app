const request = require('request');

// request weather info from forecast.io with google geo information (latitude and longitude).
var getWeather = (lat, lng, callback) => {
request({
    url: `https://api.darksky.net/forecast/e6b0cc0e17eebc7454010d14ef103e55/${lat},${lng}?units=auto`,
    json: true
}, (error, response, body) => {
  if (error) {
    callback('Unable to connect to Forecast.io server.');
  } else if (!error && response.statusCode === 200) {
      callback(undefined, {
        summary: body.currently.summary,
        temperature: body.currently.temperature
      });
    } else {
      callback('Unable to fetch weather.');
    }
});
};

module.exports.getWeather = getWeather;
