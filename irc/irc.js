var irc = require("tmi.js");
var config = require("../config/irc.json")

var global_count = 0;
var timer_clear = true;

var options={
    options:{
        debug:false
    },
    connection:{
        cluster:"aws",
        reconnect:true
    },
    identity:{
        username:config.username,
        password:config.password
    },
    channels:config.channels
};

var client = new irc.client(options);

client.connect();

client.on("chat", function(channel, user, message, self){
    if(user.username != "derpbotte"){
        console.log("%s: %s", user.username, message);
        console.log();
    }
});

client.on("join", function(channel, username){
    console.log("%s has joined the channel %s", username, channel);
});

setTimeout(function(){
    timer_clear = true;
}, 30000);

//Increase global_count by one. 
//If greater than 15 set timer_clear to false
function gcpp(count, timer){
    count += 1;
    if(count >= 15){
        timer = false
    }
}

module.exports = client;