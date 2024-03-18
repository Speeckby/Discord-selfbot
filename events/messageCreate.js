const interactionCreate = require('./interactionCreate');

module.exports = async (client, message) => {
    
    if (message.author.id == 1020053727677263892 || message.author.id == 665551706645594123) {
            if (message.content.indexOf("-") == 0) {
            msg = message.content.split("-")
            interactionCreate(client,msg[1],message)
        }
    }
}