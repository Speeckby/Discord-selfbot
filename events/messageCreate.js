
module.exports = async (client, message) => {
    
     if (message.author.id == 1020053727677263892 || message.author.id == 665551706645594123) {
            if (message.content.indexOf("-") == 0) {
            msg = message.content.split("-")
            }
    }
    if (message.author.id == 432610292342587392 &  message.content.includes(`**${client.user.tag}**`) &  "class" in client)  {
        if (!("mudae" in client.class)) {
            client.class.mudae = message.content
        }
    }   
}