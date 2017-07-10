// TODO: attach keys file to this file
// TODO: figure out Twitter and spotify
// TODO: test movie and doSays functions

var fs = require("fs");
var keys = require("./keys.js");
var tweet = require("twitter");
var client = new tweet(keys.twitterKeys);
var song = require("node-spotify-api");
var spotify = new song(keys.spotifyKeys);
var request = require("request");
var userInput = process.argv[2];

// set the conditions for inputs that trigger functions
if (userInput === "my-tweets"){
  viewTweets();
};
if (userInput === "spotify-this-song") {
  spotifySong();
};
if (userInput === "movie-this") {
  movies();
};
if (userInput === "do-what-it-says") {
  doSays();
};

// functions that retrieve and display data from Twitter, Spotify, OMDB, and Random.txt.
function viewTweets() {
  var params = {screen_name: "krista_codes"};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i=0; i < tweets.length; i++) {
        console.log(tweets[i].text);
      };
    };
  });
};

function spotifySong() {
  var songName = process.argv.slice(3).join(" ");
  if (songName === "") {
    songName = "The Sign";
  }
  spotify.search({
    type: 'track',
    query: songName},
    function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data);
  });
  // * This will show the following information about the song in your terminal/bash window
  //   * Artist(s)
  //   * The song's name
  //   * A preview link of the song from Spotify
  //   * The album that the song is from
  // * If no song is provided then your program will default to "The Sign" by Ace of Base.

};

// function movies() {
//   var movieName = process.argv.slice(3).join(" ");
//   var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
//
//   request(queryUrl, function(error, response, body){
//
//     if (!error && response.statusCode === 200) {
//       console.log("* Title: " + JSON.parse(body, title) +
//       "* Year: " + JSON.parse(body, Year) +
//       "* IMDB Rating: " + JSON.parse(body, Rating) +
//       "* Rotten Tomatoes Rating: " + JSON.parse(body, Rotten) +
//       "* Country produced: " + JSON.parse(body, Country) +
//       "* Language: " + JSON.parse(body, Language) +
//       "* Plot:" + JSON.parse(body, Plot) +
//       "* Actors:" + JSON.parse(body, Actors));
//     };
//     console.log("* If you haven't watched 'Mr. Nobody,' you should: <http://www.imdb.com/title/tt0485947/>
//     * It's on Netflix!");
//   };
// };

function doSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
  });
};
