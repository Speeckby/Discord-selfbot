module.exports = {
    name : 'log',
    desc : 'Log les infos du selfbot',

    async run(client,message) {
        console.log(client.class)
        console.log(client.commands)

    }
}