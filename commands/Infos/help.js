module.exports = {
    name : 'help',
    desc : 'Renvoi la liste des commandes',

    async run(client,message) {
        let description = {}

        for (let commands in client.commands) {
            if(description[client.commands[commands][1]]) {
                description[client.commands[commands][1]] += `\n${'``' + commands + '``'} --> ${client.commands[commands][0].desc}`
            } else {
                description[client.commands[commands][1]] = `${'``' + commands + '``'} --> ${client.commands[commands][0].desc}`
            }
        }
        let msg = '# __Liste des commandes :__ \n \n'
        for (let categorie in description) {
            msg += `## ${categorie} \n \n`
            msg += `${description[categorie]}`
            msg += '\n'
        }
        
        message.channel.send({
            content: msg,
            });
    }
}