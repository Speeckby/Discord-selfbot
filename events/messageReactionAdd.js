const config = require("../config.json")
module.exports = async (client, reaction) => {
	if (reaction.message.content == "$rt" & config.mudae.channel_autoclaim.includes(reaction.message.channelId) & reaction._emoji.name == '✅') {

        reaction.fetch()

        if ( reaction.message.author.id == client.user.id) {
            client.class.mudae.claim[reaction.message.channelId] = false
        }
    }
}