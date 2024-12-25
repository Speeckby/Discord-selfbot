require('dotenv').config({ path: "./.env" });
const { text } = require("figlet");
const {loadavg, cpus, totalmem} = require("os");
let message;
const serviceUPTIMEROBOT = require('./managers/uptimerobot');
const app = require('express')();
serviceUPTIMEROBOT(app);
app.listen(process.env.PORT, () => {});




process.on("unhandledRejection", (e) => { console.error(e) });
process.on("uncaughtException", (e) => { console.error(e) });
process.on("uncaughtExceptionMonitor", (e) => { console.error(e) });

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

async function main() {
    while (message != "stop") {
        if (message == "restart") {
            delete require.cache[require.resolve('./index.js')];
            delete require.cache[require.resolve('./managers/uptimerobot')];
            console.log("Restarting...");
        }
        let Selfbot = require('./index.js');
        Selfbot = new Selfbot();
        message = await Selfbot.start()
        delete Selfbot;
    } 
}
main();