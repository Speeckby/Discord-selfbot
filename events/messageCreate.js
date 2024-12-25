module.exports = async (client, message) => {
    
    if (message.author.id == 1020053727677263892 || message.author.id == client.user.id) {
        if (message.content.indexOf(client.prefix) == 0) {
            command = message.content.split('-')[1].split(' ')[0]
            if (client.commands[command] != undefined) {
                client.commands[command][0].run(client, message)
            }
        }
    }
    
}