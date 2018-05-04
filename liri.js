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
var command = process.argv[2];

let input = "";
// Capture all the words in the input (ignoring the first two Node arguments)
for (var i = 3; i < process.argv.length; i++) {
    // Build a string with the information
    input = process.argv[i];
};

// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

switch (arg1) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        spotifySong();
        break;  
    case 'movie-this':
    	movieChoice();
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

function spotifySong() {
    spotify.search({ type: 'track', query: arg2 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }			 
		var track = data.tracks.items[0] //get the first song
		console.log("Artist: " + track.artists[0].name);
        console.log("Song: " + track.name);
        console.log("Album: " + track.album.name);
        console.log("Preview Link: " + track.preview_url);
        console.log("------------------------");
		// console.log(JSON.stringify(track, null, 2)) //get a better look at the data you need 
	});   
}

function movieChoice() {
    request("http://www.omdbapi.com/?t=" + input + "&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movie = JSON.parse(body);
            console.log("Title: " + (movie.Title)); 
            console.log("Year: " + (movie.Year)); 
            console.log("IMDB Rating: " + (movie.imdbRating + "/10"));           
            console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value); 
            console.log("Country: " + (movie.Country)); 
            console.log("Language(s): " + (movie.Language));  
            console.log("Plot: " + (movie.Plot)); 
            console.log("Actors: " + (movie.Actors)); 
            console.log("-------------------"); 
        }
    });
};

// fs.readFile("random.txt", "utf8", function(err, data) {
// 	if (err) {
// 		return console.log(err);
// 	}

// 	var output = data.split();

// 	for (var i = 0; i < output.length; i++) {
// 		console.log(output[i]);
// 	}
// })

// function doThing(){
//   fs.readFile('random.txt', "utf8", function(error, data){
//     var txt = data.split(',');

//     spotifySong(txt[1]);
//   });
// }


          















