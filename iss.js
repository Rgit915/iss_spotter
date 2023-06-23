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



module.exports = { fetchMyIP, fetchCoordsByIP };