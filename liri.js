require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require('moment');



if (process.argv[2] === "concert-this") {

    var artist = "";

    if (process.argv.length >= 4) {

        var musicArray = [];

        for (i = 3; i < process.argv.length; i++) {
            musicArray.push(process.argv[i]);
        };

        artistArray = musicArray.join();
        console.log("Artist array: ", artistArray);

        artist = artistArray.replace(/,/g, "+");
        console.log("Artist: ", artist);
    }

    queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {
            console.log(response.data[0]);
            for (i = 0; i < response.data.length; i++) {
                console.log("Venue: ", response.data[i].venue.name);
                console.log("City: ", response.data[i].venue.city);
                // console.log("Date: ", response.data[i].datetime);

                var concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY");

                console.log("moment date: ", concertDate);
                

                // console.log("moment: ", moment(concertDate, "MM/DD/YYYY"));

            }
        }
    );
}

if (process.argv[2] === "movie-this") {

    var title = "mr+nobody";

    if (process.argv.length >= 4) {
        var queryArray = [];

        for (i = 3; i < process.argv.length; i++) {

            queryArray.push(process.argv[i]);
        }
        titleArray = queryArray.join();
        console.log("Title array: ", titleArray);
        title = titleArray.replace(/,/g, "+");
        console.log("Title: ", title);
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
            console.log(response.data.Title + " came out in " + response.data.Year);
            console.log(response.data.Plot);
            console.log(response.data.Title + " stars " + response.data.Actors)
        }
    );
}

if (process.argv[2] === "spotify-this-song") {

    // spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    //     if (err) {
    //       return console.log('Error occurred: ' + err);
    //     }

    //   console.log(data); 
    //   });


    var title = "mr+nobody";

    if (process.argv.length >= 4) {
        var queryArray = [];

        for (i = 3; i < process.argv.length; i++) {

            queryArray.push(process.argv[i]);
            titleArray = queryArray.join();
            console.log("Title array: ", titleArray);
            title = titleArray.replace(/,/g, "+");
            console.log("Title: ", title);
        }

    }


}