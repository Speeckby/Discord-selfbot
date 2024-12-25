module.exports = {
    name : 'stop',
    desc : 'Arrête le Selfbot',

    async run(client) {
        client.stop("stop");
    }
}