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
        
        }else if (message.embeds.length == 1){

            // Si wish ou perso à + 200 kakeras

            if (parseInt(message.embeds[0].description.split("\n")[3].split("**")[1]) > 200 || message.content != "") {
                console.log('gg')
                message.clickButton({ Y : 0, X : 0})
            
            } else if (message.embeds[0].footer) {
                if (message.embeds[0].footer.iconURL) { // si react kakera 
                    console.log('kakera')
                    message.clickButton({ Y : 0, X : 0})
                }
            }
        }
        
    }
}