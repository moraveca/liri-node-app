require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require('moment');

var fs = require('fs');



var randomCommand = "";
var song = "The Sign";
var title = "mr+nobody";
var artist = "";
var now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");


if (process.argv[2] === "do-what-it-says") {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;
        // console.log(data);

        var spliced = data.split(",");
        // console.log(spliced);

        randomCommand = spliced[0];

        if (randomCommand === "concert-this") {
            artist = spliced[1].replace(/"/g, "");
            // console.log("artist: ", artist);
            runCommand();
        } else if (randomCommand === "movie-this") {
            title = spliced[1].replace(/ /g, "+").replace(/"/g, "");
            // console.log("title: ", title);
            runCommand();
        } else if (randomCommand === "spotify-this-song") {
            song = spliced[1].replace(/"/g, "");
            // console.log("song: ", song);
            runCommand();
        }
    });
}

function runCommand() {
    // console.log("randomCommand: ", randomCommand)

    if (process.argv[2] === "concert-this" || randomCommand === "concert-this") {

        if (process.argv.length >= 4) {

            var musicArray = [];

            for (i = 3; i < process.argv.length; i++) {
                musicArray.push(process.argv[i]);
            };

            artistArray = musicArray.join();
            // console.log("Artist array: ", artistArray);

            // var logArtist = artistArray.replace(/,/g, " ");
            // // console.log("logArtist: ", logArtist)

            // fs.appendFile('log.txt', "  (" + now + ")  Artist: " + logArtist, function (err) {
            //     if (err) throw err;
            // });


            artist = artistArray.replace(/,/g, " ");
            // console.log("Artist: ", artist);
        } else if (process.argv.length < 4 && randomCommand === "") {
            return console.log("Sorry, you need to pick a band...");
        }

        fs.appendFile('log.txt', "  (" + now + ")  Artist: " + artist, function (err) {
            if (err) throw err;
        });

        artist.replace(/ /g, "+");

        queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        // console.log("artist query: ", queryURL)
        axios.get(queryURL).then(
            function (response) {
                // console.log(response.data[0]);
                for (i = 0; i < response.data.length; i++) {
                    console.log("Venue: ", response.data[i].venue.name);
                    console.log("City: ", response.data[i].venue.city);

                    var concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY");
                    console.log("Date: ", concertDate);
                    console.log("");


                    fs.appendFile('log.txt', "; Concert venue: " + response.data[i].venue.name +
                        "; City: " + response.data[i].venue.city + "; Date: " + concertDate
                        , function (err) {
                            if (err) throw err;
                        });

                }
            }
        );
    }

    if (process.argv[2] === "movie-this" || randomCommand === "movie-this") {

        if (process.argv.length >= 4) {
            var queryArray = [];

            for (i = 3; i < process.argv.length; i++) {

                queryArray.push(process.argv[i]);
            }
            titleArray = queryArray.join();
            // console.log("Title array: ", titleArray);
            title = titleArray.replace(/,/g, "+");
            // console.log("Title: ", title);
        }

        axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                // console.log(response.data);
                console.log(response.data.Title);
                console.log(response.data.Title + " came out in " + response.data.Year);
                console.log("The IMDB rating is " + response.data.imdbRating);
                console.log("The Rotten Tomatoes rating is " + response.data.Ratings[1].Value);
                console.log(response.data.Title + " was produced in " + response.data.Country);
                console.log(response.data.Title + " is in the language of " + response.data.Language);
                console.log(response.data.Plot);
                console.log(response.data.Title + " stars " + response.data.Actors);

                fs.appendFile('log.txt', "  (" + now + ")  Movie: " + response.data.Title + "; Year: " +
                    response.data.Year + "; IMDB rating: " + response.data.imdbRating +
                    "; Rotten Tomatoes rating: " + response.data.Ratings[1].Value +
                    "; Country: " + response.data.Country + "; Language: " + response.data.Language +
                    "; Plot: " + response.data.Plot + "; Stars: " + response.data.Actors, function (err) {
                        if (err) throw err;
                    });
            }
        );
    }

    if (process.argv[2] === "spotify-this-song" || randomCommand === "spotify-this-song") {

        if (process.argv.length >= 4) {
            var searchArray = [];

            for (i = 3; i < process.argv.length; i++) {

                searchArray.push(process.argv[i]);
                var songArray = searchArray.join();
                song = songArray.replace(/,/g, " ");
            }

        }
        // console.log("song: ", song)

        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var artistOptions = data.tracks.items;

            if (randomCommand === "spotify-this-song") {
                console.log("Artist: ", artistOptions[0].artists[0].name);
                console.log("Song: ", artistOptions[0].name);
                console.log("Preview link: ", artistOptions[0].external_urls.spotify);
                console.log("Album: ", artistOptions[0].album.name);

                fs.appendFile('log.txt', "  (" + now + ")   Artist: " +
                    artistOptions[0].artists[0].name + "; Song: " + artistOptions[0].name +
                    "; Preview link: " + artistOptions[0].external_urls.spotify + "; Album: "
                    + artistOptions[0].album.name, function (err) {
                        if (err) throw err;
                    });
            }

            if (process.argv.length <= 3) {
                for (j = 0; j < artistOptions.length; j++) {
                    if (artistOptions[j].artists[0].name === "Ace of Base") {
                        console.log("Artist: ", artistOptions[j].artists[0].name);
                        console.log("Song: ", artistOptions[j].name);
                        console.log("Preview link: ", artistOptions[j].external_urls.spotify);
                        console.log("Album: ", artistOptions[j].album.name);

                        fs.appendFile('log.txt', "  (" + now + ")   Artist: " +
                            artistOptions[j].artists[0].name + "; Song: " + artistOptions[j].name +
                            "; Preview link: " + artistOptions[j].external_urls.spotify + "; Album: "
                            + artistOptions[j].album.name, function (err) {
                                if (err) throw err;
                            });
                        return;

                    }
                }
            } else {
                console.log("Artist: ", artistOptions[0].artists[0].name);
                console.log("Song: ", artistOptions[0].name);
                console.log("Preview link: ", artistOptions[0].external_urls.spotify);
                console.log("Album: ", artistOptions[0].album.name);

                fs.appendFile('log.txt', "  (" + now + ")   Artist: " +
                artistOptions[0].artists[0].name + "; Song: " + artistOptions[0].name +
                "; Preview link: " + artistOptions[0].external_urls.spotify + "; Album: "
                + artistOptions[0].album.name, function (err) {
                    if (err) throw err;
                });

            }
        });
    };

}

runCommand();

if (process.argv[2] === "clear-log") {
    fs.writeFile('log.txt', "", function (err) {
        if (err) throw err;
        console.log("The log has been cleared!");
      });
}