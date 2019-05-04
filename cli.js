var concertFinder = require("./liri.js");

// Create a new TV object
var concertInTown = new concertFinder();

var firstTerm = process.argv[2];

var secondTerm = process.argv.slice(3).join(" ");

     // Print whether searching for a show or actor, print the term as well
     if (firstTerm === "concert-this") {
        console.log("concert-this");
        concertInTown.findConcert(secondTerm);
    } else if (firstTerm === "spotify-this-song") {
        console.log("spotify-this-song");
        //   tv.findActor(term);
    } else if (firstTerm === "movie-this") {
        console.log("movie-this");
        //   tv.findActor(term);
    } else if (firstTerm === "do-what-it-says") {
        console.log("do-what-it-says");
        //   tv.findActor(term);
    }