// 3rd party
const yargs = require('yargs');
// mine
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather.js')
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Adress to fetch weather for',
      string: true
    }
})
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, result) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(result.address);
    weather.getWeather(result.latitude, result.longitude, (errorMessage, weatherResult) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log('');
        console.log(`Summary: ${weatherResult.summary}`);
        console.log(`Temperature: ${weatherResult.temperature}`);
      }
    });
  }
});
