// read and set any environment variables with the dotenv package
require("dotenv").config();

// import keys for spotify
var keys = require("./keys.js");

// Get the type of search the user wants
var search = process.argv[2];
// Get the thing they user is searching for
var term = process.argv.slice(3).join(" ");

switch (search){
    case "concert-this":
        console.log("Searching the Bands in Town Artist Events API");

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