// Import necessary modules for system information
const { text } = require("figlet");
const { loadavg, cpus, totalmem } = require("os");

// Import and configure uptime robot service
const serviceUPTIMEROBOT = require('./managers/uptimerobot');
const app = require('express')();
serviceUPTIMEROBOT(app);
app.listen(process.env.PORT, () => {});

// Handle uncaught exceptions and promise rejections
process.on("unhandledRejection", (e) => { console.error(e); });
process.on("uncaughtException", (e) => { console.error(e); });
process.on("uncaughtExceptionMonitor", (e) => { console.error(e); });

// Calculate number of CPU cores
const cpuCores = cpus().length;

// Render ASCII text using figlet
text('Discord - Selfbot', { font: "Standard" }, function (err, data) {
    if (err) {
        console.log('Bizarre ... une erreur ');
        console.dir(err);
        return;
    }
    const data2 = data;
    text('By : Speeckby', {}, function (err, data) {
        if (err) {
            console.log('Bizarre ... une erreur ');
            console.dir(err);
            return;
        }
        // Display system information and ASCII art
        console.log("===========================================================================================================================" + "\n" +
            data2 + "\n\n" + data + "\n" +
            "===========================================================================================================================" + "\n" +
            `CPU: ${(loadavg()[0] / cpuCores).toFixed(2)}% / 100%` + "\n" +
            `RAM: ${Math.trunc((process.memoryUsage().heapUsed) / 1000 / 1000)} MB / ${Math.trunc(totalmem() / 1000 / 1000)} MB` + "\n" +
            "==========================================================================================================================="
        );
    });
});

/**
 * Main function to start the selfbot
 */

require('dotenv').config({ path: "./.env" });
let message;

async function main() {
    while (message != "stop") {
        
        if (message == "restart") {
            console.log("Restarting...");
        }
        // Load and start the Selfbot
        let Selfbot = require('./class/client.js');
        Selfbot = new Selfbot();
        message = await Selfbot.start();

        delete Selfbot;
        delete require.cache;
    }
}

// Run the main function
main();
