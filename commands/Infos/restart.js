module.exports = {
    name : 'restart',
    desc : 'Redémarre le Selfbot',

    run : async (client) => {
        client.stop("restart")
    }
}