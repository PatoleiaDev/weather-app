// 3rd party
const yargs = require('yargs');
const axios = require('axios')
// mine
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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(encodedAddress)}`;

axios.get(geocodeURL).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that adress.');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherURL = `https://api.darksky.net/forecast/e6b0cc0e17eebc7454010d14ef103e55/${lat},${lng}?units=auto`;
  console.log(response.data.results[0].formatted_address);
  axios.get(weatherURL).then((response) => {
    console.log(response.data);
  }).catch((e) => {
    console.log(e);
  })

}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API server.');
  } else {
    console.log(e.message);
  }
});
