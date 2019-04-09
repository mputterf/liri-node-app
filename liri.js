// read and set any environment variables with the dotenv package
require("dotenv").config();

// import keys for spotify
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
