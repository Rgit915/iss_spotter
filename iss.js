// ISS Spotter I
const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json',(error, response, body) => {
    //handle errors and check the respose status code
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`unexpected status code: ${response.statusCode} when fetching IP:${body}`), null);
      return;
    }
     
    //parse the response body and extract the IP address
    try {
      const data = JSON.parse(body);
      const ip = data.ip;
      callback(null, ip);
    } catch (error) {
      callback(error, null);
    }

  });
};


//ISS Spotter II
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`,(error, response, body) => {
    //handle errors and check the respose status code
    if (error) {
      callback(error, null);
      return;
    }

    //parse the response body as JSON
   
    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    const { latitude, longitude } = parsedBody;

    callback(null, {latitude, longitude});
     
  });

};


//ISS Spotter III
/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,(error, response, body) => {
    //handle errors and check the respose status code
    if (error) {
      callback(error, null);
      return;
    } else {
      try {
        const data = JSON.parse(body);
        callback(null, data.response);
      } catch (parseError) {
        callback(parseError, null);
      }
    }
     
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};