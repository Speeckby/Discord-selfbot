const {WebEmbed} = require('discord.js-selfbot-v13');
module.exports = {
    name: "timer",
    desc: "Obtenir le ping 🏓 du bot",
    category: "Information",

    run: async(client, interaction, args) => {
        let str = ""
        for (let i=0;i < client.var.timers.length; i++) {
            console.log(client.var.timers.length)
            client.var.timers[i].then(function(valeur) {
                console.log("nh")
                str += "```" 
            }).catch(function(erreur) {
                console.error("Une erreur s'est produite :", erreur);
            });
        }

        const embed = new WebEmbed()
            .setColor('BLUE')
            .setTitle('Liste des timers et leur statut :')
            .setDescription(str)

        console.log(interaction.delete())
        interaction.channel.send({
            content: `${WebEmbed.hiddenEmbed}${embed}`,
            ephemeral: true
        });
}};