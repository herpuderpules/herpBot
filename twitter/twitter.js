var twitter = require("twitter");
var twitter_config = require('../config/twitter');

var irc = require('../irc/irc');

var options = {
    consumer_key:config.consumer_key,
    consumer_secret:config.consumer_secret,
    access_token_key:config.access_token_key,
    access_token_secret:config.access_token_secret
};

var client = new twitter(options)

client.stream('statuses/filter', {track: 'twitch'}, function(stream){
    stream.on('data', function(tweet){
        console.log("%s tweeted: %s", tweet.user.screen_name, tweet.text);
        var tweet_message = tweet.user.screen_name + " tweeted: " + tweet.text;
        irc.say("#herpuderpules", tweet_message);
    });
    stream.on('error', function(error){
        console.log(error);
    })
});
