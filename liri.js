// read and set any environment variables with the dotenv package
require("dotenv").config();

// axios
var axios = require("axios");
// moment
var moment = require("moment");

// import key for spotify
var keys = require("./key.js");

// Get the type of search the user wants
var search = process.argv[2];
// Get the thing they user is searching for
var term = process.argv.slice(3).join(" ");

switch (search){
    case "concert-this":
        console.log("Searching the Bands in Town Artist Events API");
        var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"

        axios.get(URL).then(function(response){
            // response.data is an array!
            // console.log(response.data);
            var jsonData = response.data;

            for (var i = 0; i < jsonData.length; i++){
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

        break;

    case "movie-this":
        console.log("Searching OMDB for movie");

        break;

    case "do-what-it-says":
        console.log("Executing command in random.txt");

        break;

    default:
        console.log("Usage: node liri <concert-this/spotify-this-song/movie-this/do-what-it-says> <search terms>");
}