const config = require("../config.json")
module.exports = async (client, reaction) => {
	if (reaction.message.content == "$rt" & reaction.message.channelId == config.channel & reaction._emoji.name == '✅') {

        reaction.fetch()

        if ( reaction.message.author.id == client.user.id) {
            client.class.mudae.claim = false
        }
    }
}