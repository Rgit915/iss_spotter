const request = require('request');
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');
const {printPassTimes} = require('./index')
//call function fetchMyIP returns a promise
//call .then on its return value and take in a callback whcih accepts response body
// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => {
//     console.log('Response Body:', body); //to handle the resolved promise
//   })
  
  
// Call 
nextISSTimesForMyLocation()
.then((passTimes) => {
  printPassTimes(passTimes);
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
});
  