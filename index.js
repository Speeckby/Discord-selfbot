const Discord = require('discord.js-selfbot-v13')
require('dotenv').config()

const loadFunctions = require("./loaders/loadFunctions.js")
const loadEvents = require("./loaders/loadEvents.js")
const loadTimers = require("./loaders/loadTimers.js")

const client = new Discord.Client();

client.login(process.env.TOKEN)
client.commands = new Discord.Collection()
client.color = "#a14ca8"

loadFunctions(client)
loadEvents(client)
loadTimers(client)

//process.on("unhandledRejection", (e) => { client.fn.crash(client,e) })
//process.on("uncaughtException", (e) => { client.fn.crash(client,e) })
//process.on("uncaughtExceptionMonitor", (e) => { client.fn.crash(client,e) })
