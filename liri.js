require("dotenv").config();
var keys = require('./keys')
var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var arg1 = process.argv[2]
var arg2 = process.argv.slice(3).join('+')

// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

switch (arg1) {
    case 'spotify-this-song':
        spotifyThis();
        break;
    case 'my-tweets':
        myTweets();
        break;
     
}


function myTweets() {
    var params = { screen_name: 'dtotheowens' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("------------------------");
            }
        }
    });
}

function spotifyThis() {
    spotify.search({ type: 'track', query: arg2 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(JSON.stringify(data, null, 2)); 
      });
}

