var fs = require("fs");
var keys = require("./keys.js");
var tweet = require("twitter");
var client = new tweet(keys.twitterKeys);
var song = require("node-spotify-api");
var spotify = new song(keys.spotifyKeys);
var request = require("request");
var command = process.argv[2];

// set the conditions for inputs that trigger functions
if (command === "my-tweets"){
  viewTweets();
};
if (command === "spotify-this-song") {
  spotifySong();
};
if (command === "movie-this") {
  movies();
};
if (command === "do-what-it-says") {
  doSays();
};

// functions that retrieve and display data from Twitter, Spotify, OMDB, and Random.txt.
function viewTweets() {
  var params = {screen_name: "krista_codes"};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i=0; i < tweets.length; i++) {
        console.log(tweets[i].created_at + ": " + tweets[i].text);
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
    query: songName,
    limit: 3},
    function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    // first item
      data.tracks.items.forEach(function(item) {
        console.log(
          "\n* Artist(s): " + item.artists[0].name
          + "\n* Title: " + item.name
          + "\n* Preview Link: " + item.preview_url
          + "\n* Album: " + item.album.name);
      });
  });
}

function movies() {
  var movieName = process.argv.slice(3).join(" ");
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=40e9cece";

  request(queryUrl, function(error, response, body){
    var dataBody = JSON.parse(body);
    if (movieName === "") {
      return console.log(
        "\n* If you haven't watched 'Mr. Nobody,' you should: "
        + "http://www.imdb.com/title/tt0485947/"
        + "\n* It's on Netflix!");
    };
    if (!error && response.statusCode === 200) {
      console.log("\n* Title: " + dataBody.Title
      + "\n* Year: " + dataBody.Year
      + "\n* IMDB Rating: " + dataBody.Ratings[0].Value
      + "\n* Rotten Tomatoes Rating: " + dataBody.Ratings[1].Value
      + "\n* Country produced: " + dataBody.Country
      + "\n* Language: " + dataBody.Language
      + "\n* Plot:" + dataBody.Plot
      + "\n* Actors:" + dataBody.Actors);
    };
  });
};

function doSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
  });
};

// bonus: logging our commands
fs.appendFile("./log.txt", command, function(err) {

  if (err) {
    return console.log(err);
  }
  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
  else {
    console.log("Command Logged!");
  }
});
