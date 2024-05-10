const fn = require('../../fn/config');

module.exports = {
    name : 'rmserv',
    desc : "Enlever un salon sur l'autoclaim de mudae",

    async run(client,message) {

        const config = fn.get()

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
            if (!config.mudae.channel_autoclaim.includes(serv)) {
                message.react('❌')
                message.reply("Ce salon n'est pas concerné par l'autoclaim.")
                return ;
            }

            delete client.class.mudae.claim[serv]
            delete client.class.mudae.claim_reset[serv]

            for (let id = 0; id < client.class.mudae.ordre.length; id++) {
                if (client.class.mudae.ordre[id].serv == serv) {
                    client.class.mudae.ordre.splice(id, 1)
                }
            }
            client.class.mudae.creer_ordre()

            config.mudae.channel_autoclaim.splice(serv,1)

            fn.update(config)
                
            message.react('✅')
        } else {
            message.react('❌')
            message.reply('Veuillez spécifier un salon en second paramètre : ``-addserv <mention ou id du salon à ajouter>``')
        }
        
    }
}