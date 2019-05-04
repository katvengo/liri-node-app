require("dotenv").config();
var axios = require("axios");
var fs = require("fs");

var fs = require("fs");

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var moment = require('moment');

var liri = function () {
    var divider = "\n------------------------------------------------------------\n\n";
    this.findConcert = function (artist) {
        axios
            .get(
                'https://rest.bandsintown.com/artists/' +
                artist +
                '/events?app_id=codingbootcamp'
            )
            .then(function (response) {

                var jsonDataOne = response.data;
                var time = jsonDataOne[1].datetime
                time = moment(time).format("MM/DD/YYYY");
                var showArtistData = [
                    "Venue: " + jsonDataOne[1].venue.name,
                    "City: " + jsonDataOne[1].venue.city,
                    "State: " + jsonDataOne[1].venue.region,
                    "When: " + time

                ].join("\n\n");

                fs.appendFile("log.txt", showArtistData + divider, function (err) {
                    if (err) throw err;
                    console.log(showArtistData);
                });
            })

    }
    this.findSong = function (secondTerm) {
        spotify
            .search({
                type: 'track',
                query: secondTerm
            }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                } else {
                    // console.log(data);
                    var dataArray = data.tracks.items[0]
                    // console.log(dataArray)
                    var showSongData = [
                        "Artist: " + dataArray.album.artists[0].name,
                        "Song: " + dataArray.name,
                        // // A preview link of the song from spotify
                        "Preview: " + dataArray.album.artists[0].external_urls.spotify,
                        "Album: " + dataArray.album.name

                    ].join("\n\n");

                    fs.appendFile("log.txt", showSongData + divider, function (err) {
                        if (err) throw err;
                        console.log(showSongData);
                    })
                }
            });

    }
    this.findMovie = function (movie) {
        axios
            .get(
                'http://www.omdbapi.com/?t=' + movie + "&y=&plot=short&apikey=trilogy"
            )
            .then(function (response) {
                var jsonData = response.data;

                var showMovieData = [
                    "Title of Movie: " + jsonData.Title,
                    "Year: " + jsonData.Year,
                    "IMBD rating: " + jsonData.imdbRating,
                    "Rotten Tomatoes Rating of the movie: " + response.ratings,
                    "Language: " + jsonData.Language,
                    "Plot: " + jsonData.Plot,
                    "Actors: " + jsonData.Actors


                ].join("\n\n");

                fs.appendFile("log.txt", showMovieData + divider, function (err) {
                    if (err) throw err;
                    console.log(showMovieData);
                });
            })

    }
    this.fsPackage = function (track) {
        fs.readFile("./random.txt", "utf8", function (err, data) {
            if (err) throw err;
            // console.log(data);
            var dataArr = data.split(",");
            // console.log(dataArr)
             if (firstTerm === "concert-this") {
                // console.log("concert-this");
                this.findConcert(secondTerm);
            } else if (firstTerm === "movie-this") {
                // console.log("movie-this");
                this.findMovie(secondTerm);
            } else if (firstTerm === "do-what-it-says") {
                // console.log("do-what-it-says");
                this.fsPackage(secondTerm)
               
            } else if (firstTerm === "spotify-this-song") {
                // console.log("spotify-this-song");
                this.findSong(dataArr)
            }



            app.findSong(dataArr)
        });
    }

}
if (firstTerm === "movie-this" && !secondTerm) {
    app.findMovie("Mr.Nobody");
}

// If no song is provided then your program will default to "The Sign" by Ace of Base.
// if (firstTerm === "spotify-this-song" && !secondTerm) {
//     app.findSong("The Sign");
// }

const app = new liri();

var firstTerm = process.argv[2];

var secondTerm = process.argv.slice(3).join(" ");


if (firstTerm === "concert-this") {
    // console.log("concert-this");
    app.findConcert(secondTerm);
} else if (firstTerm === "movie-this") {
    // console.log("movie-this");
    app.findMovie(secondTerm);
} else if (firstTerm === "do-what-it-says") {
    // console.log("do-what-it-says");
    app.fsPackage(secondTerm)
   
} else if (firstTerm === "spotify-this-song") {
    // console.log("spotify-this-song");
    app.findSong(secondTerm)
}