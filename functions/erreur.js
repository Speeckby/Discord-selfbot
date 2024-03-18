const Discord = require('discord.js-selfbot-v13')

module.exports = async (interaction, msg) => {
    
    let client = interaction.client

    client.fn.log(client, "FUNCTION", `error (in command)`)
    
    let errEmbed = new Discord.EmbedBuilder()
    .setTitle(":x: Oups, petit problème")
    .setColor('#ff0000')
    .setFooter({
        text: 'SpeeckBot',
        iconURL: interaction.client.user.displayAvatarURL()
    })
    .setDescription(msg)

    let reponse = {
        embeds: [errEmbed],
        ephemeral: true
    }

    interaction.reply(reponse)
}