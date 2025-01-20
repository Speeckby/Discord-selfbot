let Client, Selfbot, message;
async function main() {
    Client = require('./class/client.js');
    Selfbot = new Client();
    message = await Selfbot.start();
    process.send(message); 
}
main();