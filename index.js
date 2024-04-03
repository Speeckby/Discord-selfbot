const {loadavg, cpus, totalmem} = require("os");
const {text} = require('figlet');

const cpuCores = cpus().length;
text('Discord - Selfbot', {
    font: "Standard"
}, function(err, data) {
    if (err) {
        console.log('Bizarre ... une erreur ');
        console.dir(err);
        return;
    }
    const data2 = data;
    text('By : Speeckby', {
    }, function(err, data) {
        if (err) {
            console.log('Bizarre ... une erreur ');
            console.dir(err);
            return;
        }
        console.log("================================================================================================================================"+"\n"+
            data2+"\n\n"+ data +"\n"+
            "================================================================================================================================"+ "\n"+
            `CPU: ${(loadavg()[0]/cpuCores).toFixed(2)}% / 100%` + "\n" +
            `RAM: ${Math.trunc((process.memoryUsage().heapUsed) / 1000 / 1000)} MB / ${Math.trunc(totalmem() / 1000 / 1000)} MB` + "\n" +
            "================================================================================================================================"
        );
    });

});

const Discord = require('discord.js-selfbot-v13')
require('dotenv').config()

const loadEvents = require("./loaders/loadEvents.js")

const client = new Discord.Client();

client.login(process.env.TOKEN)
client.color = "#a14ca8"

loadEvents(client)