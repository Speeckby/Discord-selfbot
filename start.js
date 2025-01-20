require('dotenv').config({ path: "./.env" });

// Import necessary modules for system information
const { text } = require("figlet");
const { loadavg, cpus, totalmem } = require("os");

// Import and configure uptime robot service
const serviceUPTIMEROBOT = require('./managers/uptimerobot');
const app = require('express')();
serviceUPTIMEROBOT(app);
let server = app.listen(process.env.PORT, () => {});

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

// Run the main function
const { spawn } = require('child_process');

let child;


function restartOtherFile() {
  // Lancer le processus du fichier `otherFile.js`
  child = spawn('node', ['index.js'], {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'], // Partager les flux d'entrée/sortie avec le parent
  });
}

async function main() {
    while (true) {
        restartOtherFile();
        let Promesse = new Promise((resolve, reject) => {
            child.on('message', (message) => {
                if(message == 'restart') {
                    console.log('Restarting...')
                    child.kill();
                    resolve('restart');
                } else if (message == 'stop') {
                    console.log('Stopping...')
                    child.kill();
                    server.close();
                    resolve('stop');
                }
              });
        })
        let message = await Promesse;
        if (message == 'stop') {
            break;
        }
    }
}
main();