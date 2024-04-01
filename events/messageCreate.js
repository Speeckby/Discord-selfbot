const { Button } = require("discord.js-selfbot-v13");

module.exports = async (client, message) => {
    
    if (message.author.id == 1020053727677263892 || message.author.id == 665551706645594123) {
            if (message.content.indexOf("-") == 0) {
                console.log(client.class.mudae)
            }
    }
    if (message.author.id == 432610292342587392 & message.channel.id == 1099737720026300576) {
        if (message.author.id == 432610292342587392 & message.content.includes(`**${client.user.tag}**`) &  "class" in client)  {
            if (!("mudae" in client.class)) {
                client.class.mudae = message.content
            
            } 
        
        }else if (message.embeds.footer != null){
            if (parseInt(message.embeds[0].footer.text.split("-")[1].split(" ")[1]) > 300 ) {
                message.react("🐀")
            } else {
                console.log(message.embeds[0].footer.text.split("-")[1].split(" ")[1])
            }
        }
    }
}