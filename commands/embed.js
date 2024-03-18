const {WebEmbed} = require('discord.js-selfbot-v13');
module.exports = {
    name: "emnbed",
    desc: "Obtenir le ping 🏓 du bot",
    category: "Information",

    run: async(client, interaction, args) => {
        const embed = new WebEmbed()
            .setAuthor({ name: 'hello', url: 'https://google.com' })
            .setColor('RED')
            .setDescription('description uh')
            .setProvider({ name: 'provider', url: 'https://google.com' })
            .setTitle('This is Title')
            .setURL('https://google.com')
            .setImage('https://i.ytimg.com/vi/iBP8HambzpY/maxresdefault.jpg')
            .setRedirect('https://www.youtube.com/watch?v=iBP8HambzpY')
            .setVideo('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
        console.log(interaction.delete())
        interaction.channel.send({
            content: `Hello world ${WebEmbed.hiddenEmbed}${embed}`,
            ephemeral: true
        });
}};