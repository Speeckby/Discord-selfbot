const config = require("../config.json")
module.exports = async (client, reaction) => {

	if (reaction.message.content == "$rt" & reaction.message.channelId == config.channel & reaction._emoji.name == '✅') {
        client.class.mudae.claim = false
    }
}