// read and set any environment variables with the dotenv package
require("dotenv").config();

// read/write files
var fs = require("fs");
// for debugging console.log
const util = require("util");

// APIs
// axios
var axios = require("axios");
// moment
var moment = require("moment");
// Spotify
var Spotify = require("node-spotify-api");

// import key for spotify
var keys = require("./key.js");

// Get the type of search the user wants
var search = process.argv[2];
// Get the thing they user is searching for
var term = process.argv.slice(3).join(" ");

switch (search) {
    case "concert-this":
        console.log("Searching the Bands in Town Artist Events API");
        var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"

        axios.get(URL).then(function (response) {
            // response.data is an array!
            // console.log(response.data);
            var jsonData = response.data;

            for (var i = 0; i < jsonData.length; i++) {
                // Print venue name
                console.log("Venue", jsonData[i].venue.name);
                // Print venue location
                console.log("Venue location: %s, %s", jsonData[i].venue.city, jsonData[i].venue.country);
                // Use moment to formate the date as MM/DD/YYY and print it)
                console.log("Date:", moment(jsonData[i].datetime).format('L'));
                // A divider
                console.log("------------------------------------");
            }

        });

        break;

    case "spotify-this-song":
        console.log("Searching Spotify");
        // Create spotify obj
        var spotify = new Spotify(keys.spotify);

        if (!term) {
            term = "'The Sign' Ace of Base";
        }

        spotify.search({ type: 'track', query: term }).then(function (response) {
            // console.log(util.inspect(response, false, null, true));
            // items is an array
            var jsonData = response.tracks.items;

            for (var i = 0; i < jsonData.length; i++) {
                // Display the artist
                console.log("Artist(s):", jsonData[i].artists[0].name);
                // Display the track name
                console.log("Track Name:", jsonData[i].name);
                // Preview link
                console.log("Preview:", jsonData[i].preview_url);

                console.log("Album:", jsonData[i].album.name);
                // divider
                console.log("------------------------------------");
            }
        });

        break;

    case "movie-this":
        console.log("Searching OMDB for movie");

        if (!term) {
            term = "Mr. Nobody";
        }

        var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + term;

        axios.get(URL).then(function (response) {

            // console.log(response);
            var jsonData = response.data;


            // Print Movie title
            console.log("Title:", jsonData.Title);
            // Print Year movie was released
            console.log("Year of Release:", jsonData.Year);
            // IMDB Rating
            console.log("IMDB Rating:", jsonData.Ratings[0].Value);
            // Rotten tommato rating
            console.log("Rotten Tomatoes Rating:", jsonData.Ratings[1].Value);
            // Country of origin
            console.log("Country:", jsonData.Country);
            // Language
            console.log("Languages:", jsonData.Language);
            // Movie plot
            console.log("Plot:", jsonData.Plot);
            // Actors
            console.log("Actors:", jsonData.Actors);
            // A divider
            console.log("------------------------------------");


        });

        break;

    case "do-what-it-says":
        console.log("Executing command in random.txt");

        break;

    default:
        console.log("Usage: node liri <concert-this/spotify-this-song/movie-this/do-what-it-says> <search terms>");
}