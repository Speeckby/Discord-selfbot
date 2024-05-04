const config = require('../../config.json');

async function send_tu(channel) {
    try {
        return await channel.sendSlash('432610292342587392', 'tu');
    } catch (e) {
        console.log(e)
        return send_tu();
    }
}

module.exports = {
    name : 'addserv',
    desc : "Ajouter un serveur sur l'autoclaim de mudae",

    async run(client,message) {

        if (!config.mudae.autoclaim) {
            message.react('❌')
            message.reply("L'autoclaim n'est pas activé sur mudae.")
            return ; 
        }

        let serv = message.content.split('-')[1].split(' ')[1] 

        if (serv == undefined) {
            message.react('❌')
            message.reply('Veuillez préciser un salon : ``-addserv <mention ou id du salon à ajouter>``')
            return ; 
        } 

        if (serv[1] == '#'){
            serv = serv.split('#')[1].split('>')[0]
        }

        if (!isNaN(serv) && !isNaN(parseFloat(serv))) {
            if (config.mudae.channel_autoclaim.includes(serv)) {
                message.react('❌')
                message.reply("Ce salon est déjà concerné par l'autoclaim.")
                return ; 
            }

            const channel = await client.channels.cache.get(serv)

            if (!channel) {
                message.react('❌')
                message.reply("Le salon fournit n'existe pas ou est inaccessible.")
                return ; 
            }


            message = await send_tu(channel)
            let info = client.class.mudae.ajouter_serv(serv, message.content)
            client.class.mudae.ordre.push({ name : "roll", value: info - (Date.now() - client.class.mudae.time), function : (client) =>  client.class.mudae.roll(client), serv : serv})
            client.class.mudae.creer_ordre()
        } else {
            message.react('❌')
            message.reply('Veuillez spécifier un salon en second paramètre : ``-addserv <mention ou id du salon à ajouter>``')
        }
        
    }
}