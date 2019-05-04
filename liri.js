require("dotenv").config();
var axios = require("axios");
// var fs = require("fs");

// var Spotify = require('node-spotify-api');

// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);


var concertFinder = function () {
    // divider will be used as a spacer between the tv data we print in log.txt
    // var divider = "\n------------------------------------------------------------\n\n";
    
    // findConcert takes in the name of an artist show and searches the Bandsintown API
    this.findConcert = function (artist) {
        axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // Place the response.data into a variable, jsonData.
            var jsonData = response.data;
            console.log(jsonData.name)
            // showData ends up being the string containing the show data we will print to the console
            // var showData = [
                //     "Artist " + jsonData.name,
                //     "Venue: " + jsonData.venues.city.join(", "),
                //     "Date of Event: " + jsonData.datetime,
                
                // ].join("\n\n");
                
                // // Append showData and the divider to log.txt, print showData to the console
                // fs.appendFile("random.txt", showData + divider, function (err) {
                    //     if (err) throw err;
                    //     console.log(showData);
                    // });
                })
                .catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an object that comes back with details pertaining to the error that occurred.
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                    console.log(error.config);
                })
            }


}
concertFinder.findConcert()